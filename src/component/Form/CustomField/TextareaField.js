const TextareaField = (prop) => {
  const { field, form, placeholder, rows, isResize, height} = prop;
  const { name, value } = field;
  const {errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{title}</label> */}
      <textarea
        type="text"
        className="form-control"
        style={{resize: `${isResize?'auto':'none' }`, height: height}}
        {...field}
        id={name}
        placeholder={placeholder}
        rows={rows}
      ></textarea>
      {showError && <small className="form-text text-danger text-left">{errors[name]}</small>}
    </div>
  );
};

export default TextareaField;
