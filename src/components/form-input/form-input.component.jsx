import "./form-input.styles.scss";

// We explicitly define label, for value, required
// etc we just pass additional props that are defined
const FormInput = ({ label, ...otherProps }) => {
  const labelClassName = `${
    otherProps.value.length ? "shrink" : ""
  } form-input-label`;
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && <label className={labelClassName}>{label}</label>}
    </div>
  );
};

export default FormInput;
