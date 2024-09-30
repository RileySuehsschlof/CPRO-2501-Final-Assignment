function CreateField({ title, placeholderTxt = "", id, type = "" }) {
  return (
    <div className={id}>
      <p>{title}</p>
      <input
        type={`${type}`}
        id={`${id}Input`}
        placeholder={placeholderTxt}
      ></input>
      <p id={`${id}Error`}></p>
      <br />
    </div>
  );
}
export default CreateField;
