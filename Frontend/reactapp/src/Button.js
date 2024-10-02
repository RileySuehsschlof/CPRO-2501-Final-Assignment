function CreateButton({ text, functionName }) {
  return (
    <div>
      <button type="button" onClick={functionName}>
        {text}
      </button>
    </div>
  );
}
export default CreateButton;
