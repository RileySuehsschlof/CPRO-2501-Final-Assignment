import "./AccDetailsPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function logout() {
  sessionStorage.removeItem("authToken");
  window.location.href = "/login";
  //remove authtoken and redirect to main page
}

function isCardNumber(input) {
  //helper function to check card number format
  const cardRegex = /^[0-9]{16}$/;
  return cardRegex.test(input);
}

async function userExists(newEmail) {
  try {
    //check if email is in the database already
    const response = await axios.get("http://localhost:8881/checkEmail", {
      params: { email: newEmail },
    });

    if (response.data) {
      return false; // Email exists
    }
    return true; // Email does not exist
  } catch (error) {
    return false;
  }
}

async function validNewInfo(accountData, setErrors) {
  let { email, shippingAddress, billingAddress, cardNumber, name, password } =
    accountData;
  setErrors({
    nameError: "",
    shippingError: "",
    billingError: "",
    emailError: "",
    cardNumberError: "",
    newPasswordError: "",
    generalError: "",
  });

  //check if fields have an input otherwise display corresponding error
  if (!shippingAddress || !billingAddress || !email || !cardNumber || !name) {
    setErrors((prev) => ({
      ...prev,
      shippingError: !shippingAddress ? "Missing shipping address" : "",
      billingError: !billingAddress ? "Missing billing address" : "",
      emailError: !email ? "Missing email" : "",
      cardNumberError: !cardNumber ? "Missing card number" : "",
      nameError: !name ? "Missing name" : "",
    }));
    return false;
  }

  if (!isCardNumber(cardNumber)) {
    //checks format of card number and display message
    setErrors((prev) => ({
      ...prev,
      cardNumberError: "Invalid card number. Must be 16 consecutive numbers.",
    }));
    return false;
  }

  if (password && password.length < 6) {
    //checks if new password is logn enough
    setErrors((prev) => ({
      ...prev,
      newPasswordError: "New password must be at least 6 characters long",
    }));
    return false;
  }

  if (!userExists(email)) {
    //checks if email already in use
    setErrors((prev) => ({ ...prev, generalError: "Email already in use" }));
    return false;
  }
  const isEmailAvailable = await userExists(email);
  if (isEmailAvailable) {
    setErrors((prev) => ({
      ...prev,
      emailError: "Invalid email address",
    }));
  }

  return true;
}
function validateEmail(email) {
  //helper function to validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
async function checkPassword(email) {
  try {
    //get password corresponding to email
    const response = await axios.get("http://localhost:8881/checkPassword", {
      params: { email: email },
    });

    if (response.data) {
      return response.data; // returns password
    }
    return false;
  } catch (error) {
    return false;
  }
}

function AccDetailsPage() {
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    shippingAddress: "",
    billingAddress: "",
    cardNumber: "",
    password: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    shippingError: "",
    billingError: "",
    emailError: "",
    cardNumberError: "",
    newPasswordError: "",
    generalError: "",
  });

  const [loading, setLoading] = useState(true);
  const [initialEmail, setInitialEmail] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        //check for token
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));

        const axiosInstance = axios.create({
          baseURL: "http://localhost:8881",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        //get account matching the token
        const response = await axiosInstance.get(
          `/account/${decodedPayload.sub}`
        );
        //update states corresponding to email and store old email incase the want to update email
        setAccountData(response.data);
        setInitialEmail(response.data.email);
      } catch (err) {
        setErrors({ generalError: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setErrors({ generalError: "" });

    e.preventDefault();
    const password = await checkPassword(initialEmail);
    //check if user entered password matches db password
    if (accountData.oldPassword === password) {
      //if input password matches db password
      if (validNewInfo(accountData, setErrors)) {
        try {
          if (accountData.newPassword != null) {
            //if theres a new password, update accoutn objects password
            accountData.password = accountData.newPassword;
          }
          const axiosInstance = axios.create({
            baseURL: "http://localhost:8881",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          });
          //edit database for new information
          const response = await axiosInstance.put(
            `/editaccount/${initialEmail}`,
            accountData
          );
          const newToken = response.data.token;
          //update token after email is changed
          sessionStorage.setItem("authToken", newToken);
          setErrors({ generalError: "Account updated successfully" });
          navigate("/");
        } catch (err) { }
      }
    } else {
      setErrors({ generalError: "Old password is invalid" });
    }
  };
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accountData) {
    return <div>Error: Account details not found</div>;
  }
  return (
    <div>
      <div className="formContainer">
        <h1>Account Details</h1>
        <form className="myForm">
          <div className="container">
            <div className="myFields">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={accountData.name}
                onChange={handleChange}
              />
            </div>
            <p>{errors.nameError}</p>

            <div className="myFields">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={accountData.email}
                onChange={handleChange}
              />
            </div>
            <p>{errors.emailError}</p>

            <div className="myFields">
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input
                id="shippingAddress"
                type="text"
                value={accountData.shippingAddress}
                onChange={handleChange}
              />
            </div>
            <p>{errors.shippingError}</p>

            <div className="myFields">
              <label htmlFor="billingAddress">Billing Address:</label>
              <input
                id="billingAddress"
                type="text"
                value={accountData.billingAddress}
                onChange={handleChange}
              />
            </div>
            <p>{errors.billingError}</p>

            <div className="myFields">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                id="cardNumber"
                type="text"
                value={accountData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <p>{errors.cardNumberError}</p>

            <div className="myFields">
              <label htmlFor="oldPassword">Old Password:</label>
              <input
                id="oldPassword"
                type="password"
                value={accountData.oldPassword}
                onChange={handleChange}
              />
            </div>
            <p>{errors.oldPasswordError}</p>

            <div className="myFields">
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                value={accountData.newPassword}
                onChange={handleChange}
              />
            </div>
            <p>{errors.newPasswordError}</p>

            <p>{errors.generalError}</p>
            <button onClick={handleSubmit}>Click to Update</button>
          </div>
        </form>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default AccDetailsPage;
