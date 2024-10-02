import CreateField from "./Field";
import CreateButton from "./Button";
import "./CreateAccCSS.css";

function validate(value, name) {
  //general function to check if any fields are empty then display message
  if (value === "" || value === null) {
    const error = `${name} is required.`;
    return error;
  }
  return false;
}

function passMatch(pass1, pass2) {
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

let userEmaildB = ["test@email.com", "test1@email.com"];

function userExists(newEmail) {
  //check if user is in the list, otherwise adds it
  for (let email of userEmaildB) {
    if (email === newEmail) {
      document.getElementById("emailError").innerHTML =
        "User with that email already exists.";
      return false;
    }
  }
  userEmaildB.push(newEmail);
  //temporary confirmation of account creation
  window.confirm(`User created with email: ${newEmail}`);
}

function passwordValid() {
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
  document.getElementById("emailError").innerHTML = "";
  if (!validateEmail(emailInput)) {
    console.log(!validateEmail(emailInput));
    let emailError = "Invalid Email Format";
    document.getElementById("emailError").innerHTML = emailError;
    validEmail = false;
  }
  return validEmail;
}
//Checks if all conditions to make an account are satisfied
function checkCreation() {
  if (formFilled() && passwordValid() && isValidEmail()) {
    userExists(document.getElementById("emailInput").value.trim());
  }
}

function CreateAccount() {
  return (
    <div className="formContainer">
      <h1>Generic Website Name</h1>
      <form className="myForm">
        <h2>Create Account</h2>
        {/* Templated element for a <p>, <input>, and <p> for error message */}
        {/* Accepts title for the text to display, placeholderTxt for placeholder text, id for the elements id and errorId which is defined in the field.js */}
        {/* also accepts type for the type of input you want */}
        <CreateField
          title="Name"
          placeholderTxt="First and Last Name"
          id="name"
        ></CreateField>
        <CreateField
          title="Email"
          placeholderTxt="example@email.com"
          id="email"
          type="email"
        ></CreateField>
        <CreateField
          title="Password"
          placeholderTxt="At least 6 characters"
          id="password"
          type="password"
        ></CreateField>
        <CreateField
          title="Password Again"
          id="passwordAgain"
          type="password"
        ></CreateField>
        <CreateButton
          text="Create Account"
          functionName={checkCreation}
        ></CreateButton>
      </form>
    </div>
  );
}
export default CreateAccount;
