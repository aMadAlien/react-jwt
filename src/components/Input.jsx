
const Input = ({ label, setValue, id, required=true, type="text", ...props }) => {
  id = id ?? label.replace(" ", "_");

  return (
    <div className="form-floating">
      <input
        id={id}
        type={type}
        required={required}
        className="form-control"
        onChange={e => setValue(e.target.value)}
        {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input