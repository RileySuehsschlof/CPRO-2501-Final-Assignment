import CreateField from "../Components/Field";
import CreateButton from "../Components/Button";
import "./CreateAccCSS.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function validate(value, name) {
  //helper function to check if any fields are empty then display message
  if (value === "" || value === null) {
    const error = `${name} is required.`;
    return error;
  }
  return false;
}

function passMatch(pass1, pass2) {
  //helper function to compare two passwords then return a boolean
  return pass1 === pass2;
}

function formFilled() {
  //checks if fields are empty then sets display message
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("passwordAgainError").innerHTML = "";

  const nameInput = document.getElementById("nameInput").value.trim();
  const emailInput = document.getElementById("emailInput").value.trim();
  const passwordInput = document.getElementById("passwordInput").value.trim();
  const confirmPassword = document
    .getElementById("passwordAgainInput")
    .value.trim();

  // checks validation foreach field then writes an error
  //for all inputs, uses validate function to get boolean, then if boolean is true,
  //writes an error message in corresponding error field
  const nameError = validate(nameInput, "Name");
  let validLogin = true;
  if (nameError) {
    document.getElementById("nameError").innerHTML = nameError;
    validLogin = false;
  }

  const emailError = validate(emailInput, "Email");
  if (emailError) {
    document.getElementById("emailError").innerHTML = emailError;
    validLogin = false;
  }

  const passwordError = validate(passwordInput, "Password");
  if (passwordError) {
    document.getElementById("passwordError").innerHTML = passwordError;
    validLogin = false;
  }

  const passwordMatch = passMatch(passwordInput, confirmPassword);
  if (!passwordMatch) {
    document.getElementById("passwordAgainError").innerHTML =
      "Passwords Dont Match";
    validLogin = false;
  }
  //if all fields are filled, return true
  if (validLogin) {
    return true;
  } else return false;
}

function passwordValid() {
  //get the values from the page
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("passwordAgainError").innerHTML = "";
  const passwordInput = document.getElementById("passwordInput").value.trim();
  const confirmPassword = document
    .getElementById("passwordAgainInput")
    .value.trim();

  let validLogin = true;
  //checks if the password is long enough
  if (passwordInput.length < 6) {
    validLogin = false;
    document.getElementById("passwordError").innerHTML =
      "Password must be atleast 6 characters long.";
    return validLogin;
  }
  //checks that both password field are the same
  const passwordMatch = passMatch(passwordInput, confirmPassword);
  if (!passwordMatch) {
    document.getElementById("passwordAgainError").innerHTML =
      "Passwords Dont Match";
    validLogin = false;
    return validLogin;
  }
  return validLogin;
}
//defines what an acceptable email pattern looks like
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
//makes sure email is in correct format
function isValidEmail() {
  const emailInput = document.getElementById("emailInput").value.trim();
  let validEmail = true;
  //resets email error message to blank
  document.getElementById("emailError").innerHTML = "";

  //validateEmail() returns a false if it doesnt match the regex, invert it to enter the if
  if (!validateEmail(emailInput)) {
    let emailError = "Invalid Email Format";
    document.getElementById("emailError").innerHTML = emailError;
    validEmail = false;
  }
  return validEmail;
}
//Checks if all conditions to make an account are satisfied
async function checkCreation(navigate) {
  if (formFilled() && passwordValid() && isValidEmail()) {
    let email = document.getElementById("emailInput").value.trim();
    //userExists() check the database to see if a user with that email already exists
    let emailExists = await userExists(email, (errorMessage) => {
      document.getElementById("emailError").innerHTML = errorMessage;
    });
    //returns false if  user exists, returns true if it doesnt
    if (emailExists) {
      //prepare object with details
      let userData = {
        name: document.getElementById("nameInput").value.trim(),
        email: document.getElementById("emailInput").value.trim(),
        password: document.getElementById("passwordInput").value.trim(),
      };
      //store the userdata object in sessionStorage before navigating to the next page to get details
      sessionStorage.setItem("myData", JSON.stringify(userData));
      navigate("/register2");
    }
  }
}
async function userExists(newEmail, setEmailError) {
  try {
    //send request to backend to check if email already exists
    const response = await axios.get("http://localhost:8881/checkEmail", {
      params: { email: newEmail },
    });
    //if it sends a response back, sets error message to show
    if (response.data) {
      setEmailError("User with that email already exists.");
      return false; // Email exists
    }
    //if no response, return true for it being a new email
    return true; // Email does not exist
  } catch (error) {
    //any errors, return message saying theres an error
    setEmailError("Error checking email.");
    return false;
  }
}

function CreateAccount() {
  const navigate = useNavigate();
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    //wait for page to load
    setTimeout(() => {
      setIsFormReady(true);
    }, 100);
  }, []);

  //page displayed from this component
  return (
    <div>
      {isFormReady ? (
        <div className="formContainer">
          <h1>Generic Website Name</h1>
          <form className="myForm">
            <h2>Create Account</h2>
            {/* Templated element for a <p>, <input>, and <p> for error message */}
            {/* Accepts title for the text to display, placeholderTxt for placeholder text, id for the elements id and errorId which is defined in the field.js */}
            {/* Also accepts type for the type of input you want */}
            <CreateField
              title="Name"
              placeholderTxt="First and Last Name"
              id="name"
            />
            <CreateField
              title="Email"
              placeholderTxt="example@email.com"
              id="email"
              type="email"
            />
            <CreateField
              title="Password"
              placeholderTxt="At least 6 characters"
              id="password"
              type="password"
            />
            <CreateField
              title="Password Again"
              id="passwordAgain"
              type="password"
            />
            <CreateButton
              text="Continue"
              functionName={() => checkCreation(navigate)}
            />
          </form>
        </div>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}

export default CreateAccount;
