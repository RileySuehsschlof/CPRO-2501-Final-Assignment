// React component for a button in the account creation page
function CreateButton({ text, functionName }) {
  return (
    <div>
      <button className="fieldBtn" type="button" onClick={functionName}>
        {text}
      </button>
    </div>
  );
}
export default CreateButton;
