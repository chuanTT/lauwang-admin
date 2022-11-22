const InputField = (prop) => {
  const { field, form, placeholder, ...rest } = prop;
  const { name } = field;
  const {errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{title}</label> */}
      <input
        type="text"
        className="form-control"
        id={name}
        {...field}
        placeholder={placeholder}
        {...rest}
      />
      {showError && <small className="form-text text-danger text-left">{errors[name]}</small>}
    </div>
  );
};

export default InputField;
