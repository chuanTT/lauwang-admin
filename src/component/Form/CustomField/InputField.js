const InputField = (prop) => {
  const { field, form, placeholder, isLabel = false, title, idLable, isLabelPostion=true,styleFormGroup={}, ...rest } = prop;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="form-group" style={styleFormGroup}>
      {isLabel && isLabelPostion && <label htmlFor={idLable || name}>{title}</label>}
      <input
        type="text"
        className="form-control"
        id={idLable||name}
        {...field}
        placeholder={placeholder}
        {...rest}
      />
      {isLabel && !isLabelPostion &&<label htmlFor={idLable || name}>{title}</label>}
      {showError && (
        <small className="form-text text-danger text-left">
          {errors[name]}
        </small>
      )}
    </div>
  );
};

export default InputField;
