import CreateField from "../Components/Field";
import CreateButton from "../Components/Button";
import "./CreateAccCSS.css";
import { useLocation } from "react-router-dom";

function redirectToMainPage() {
  console.log("Redirect to main page");
}

function SecondaryInfo() {
  const location = useLocation();
  const userData = location.state;
  console.log(userData);
  return (
    <div className="formContainer">
      <h1>Generic Website Name</h1>
      <form className="myForm">
        <h2>Billing Details</h2>
        {/* Templated element for a <p>, <input>, and <p> for error message */}
        {/* Accepts title for the text to display, placeholderTxt for placeholder text, id for the elements id and errorId which is defined in the field.js */}
        {/* also accepts type for the type of input you want */}
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
          functionName={redirectToMainPage}
        ></CreateButton>
      </form>
    </div>
  );
}
export default SecondaryInfo;
