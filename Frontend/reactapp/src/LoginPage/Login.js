import CreateField from "../Components/Field";
import CreateButton from "../Components/Button";
import "./Login.css";
function checkLogIn() {
  console.log("Checking log in status...");
}
function Login() {
  return (
    <div className="formContainer">
      <h1>Generic Website Name</h1>
      <form className="myForm">
        <h2>Login</h2>
        {/* Templated element for a <p>, <input>, and <p> for error message */}
        {/* Accepts title for the text to display, placeholderTxt for placeholder text, id for the elements id and errorId which is defined in the field.js */}
        {/* also accepts type for the type of input you want */}
        <CreateField
          title="Email"
          placeholderTxt="Email Address"
          id="email"
        ></CreateField>

        <CreateField
          title="Password"
          id="password"
          placeholderTxt="Password"
          type="password"
        ></CreateField>

        <CreateButton text="Login" functionName={checkLogIn}></CreateButton>
      </form>
    </div>
  );
}
export default Login;
