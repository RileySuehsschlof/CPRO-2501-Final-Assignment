// component that makes up the create account form. COnsists of div with a p,input,p inside it
function CreateField({ title, placeholderTxt = "", id, type = "" }) {
  return (
    <div className={id}>
      <p>{title}</p>
      <input
        className="errorClass"
        type={`${type}`}
        id={`${id}Input`}
        placeholder={placeholderTxt}
        required
      ></input>
      <p id={`${id}Error`}></p>
      <br />
    </div>
  );
}
export default CreateField;
