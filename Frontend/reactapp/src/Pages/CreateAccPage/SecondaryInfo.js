import CreateField from "../../Components/Field";
import CreateButton from "../../Components/Button";
import "./CreateAccCSS.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function validate(value, name) {
  //helper function to check if any fields are empty then display message
  if (value === "" || value === null) {
    const error = `${name} is required.`;
    return error;
  }
  return "";
}
function checkInputs() {
  //resets errors to blank
  document.getElementById("shippingAddressError").innerHTML = "";
  document.getElementById("billingAddressError").innerHTML = "";
  document.getElementById("cardNumberError").innerHTML = "";

  //gets values from form
  const shippingInput = document
    .getElementById("shippingAddressInput")
    .value.trim();
  const billingInput = document
    .getElementById("billingAddressInput")
    .value.trim();
  const cardInput = document.getElementById("cardNumberInput").value.trim();

  let validInputs = true;

  //checks validation of form
  //checks for each field being empty
  //if empty, set error in ui
  const shippingError = validate(shippingInput, "Shipping Address");
  if (shippingError) {
    document.getElementById("shippingAddressError").innerHTML = shippingError;
    validInputs = false;
  }
  const billingError = validate(billingInput, "Billing Address");
  if (billingError) {
    document.getElementById("billingAddressError").innerHTML = billingError;
    validInputs = false;
  }
  const cardError = validate(cardInput, "Card Number");
  if (cardError) {
    document.getElementById("cardNumberError").innerHTML = cardError;
    validInputs = false;
  }
  if (!isCardNumber(cardInput)) {
    document.getElementById("cardNumberError").innerHTML =
      "Invalid card number.";
    validInputs = false;
  }
  return validInputs;
}
//function to compare input to the regex
function isCardNumber(input) {
  const cardRegex = /^[0-9]{16}$/;
  return cardRegex.test(input);
}
function RedirectToMainPage(navigate) {
  if (checkInputs()) {
    //createUserData returns a user object from all the input fields
    let user = createUserData();

    //send a post to /createaccount with the user object.
    axios
      .post("http://localhost:8881/createaccount", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        //remove myData from sessionStorage
        sessionStorage.removeItem("myData");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  }
}
function createUserData() {
  //get data from initial sign up page
  let pastData = JSON.parse(sessionStorage.getItem("myData"));
  //construct user object with old data and new data
  let userData = {
    email: pastData.email,
    password: pastData.password,
    name: pastData.name,
    shippingAddress: document.getElementById("shippingAddressInput").value,
    billingAddress: document.getElementById("billingAddressInput").value,
    cardNumber: document.getElementById("cardNumberInput").value,
  };
  return userData;
}

function SecondaryInfo() {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  localStorage.setItem("userData", JSON.stringify(userData));
  return (
    <div className="formContainer">
      <h1>Generic Website Name</h1>
      <form className="myForm">
        <h2>Payment Details</h2>
        <CreateField
          title="Shipping Address"
          placeholderTxt="Enter shipping address"
          id="shippingAddress"
        ></CreateField>
        <CreateField
          title="Billing Address"
          placeholderTxt="Enter billing address"
          id="billingAddress"
        ></CreateField>
        <CreateField
          title="Card Number"
          placeholderTxt="Enter card number"
          id="cardNumber"
        ></CreateField>
        <CreateButton
          text="Create"
          functionName={() => RedirectToMainPage(navigate)}
        ></CreateButton>
      </form>
    </div>
  );
}
export default SecondaryInfo;
