import CreateField from "./Field";
import CreateButton from "./Button";
import "./CreateAccount.css";

function validate(value, name) {
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
  if (validLogin) {
    return true;
  } else return false;
}

let userEmaildB = ["test@email.com", "test1@email.com"];

function userExists(newEmail) {
  for (let email of userEmaildB) {
    if (email === newEmail) {
      document.getElementById("emailError").innerHTML =
        "User with that email already exists.";
      return false;
    }
  }
  userEmaildB.push(newEmail);
  window.confirm(`User created with email: ${newEmail}`);
}

function passwordValid() {
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("passwordAgainError").innerHTML = "";
  const passwordInput = document.getElementById("passwordInput").value.trim();
  const confirmPassword = document
    .getElementById("passwordAgainInput")
    .value.trim();
  const passwordMatch = passMatch(passwordInput, confirmPassword);
  let validLogin = true;

  if (passwordInput.length < 6) {
    validLogin = false;
    document.getElementById("passwordError").innerHTML =
      "Password must be atleast 6 characters long.";
    return validLogin;
  }

  if (!passwordMatch) {
    document.getElementById("passwordAgainError").innerHTML =
      "Passwords Dont Match";
    validLogin = false;
    return validLogin;
  }
  return validLogin;
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
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
