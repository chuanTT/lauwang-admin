import { useEffect, useRef, useState } from "react";

const ImagesField = (prop) => {
  const dataFile = useRef(new DataTransfer());
  const files = useRef();
  const { field, form, height, width } = prop;
  const { name, value, onBlur } = field;
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const delFiles = (e) => {
    e.stopPropagation();
    dataFile.current.items.clear();
    files.current.files = dataFile.current.files;
    setAvatar(files.current.files[0]);
  };

  const handelPreview = (e) => {
    let file = e.target.files[0];
    if (file) {
      dataFile.current.items.clear();
      dataFile.current.items.add(file);
    } else {
      file = dataFile.current.files;
      e.target.files[0] = file;
    }

    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    form.setFieldValue(name, file);
  };

  return (
    <div className="form-group">
      <div
        className="form-control position-relative hover"
        style={{
          backgroundColor: "rgb(0 0 0 / 32%)",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          cursor: "pointer",
          height: `${height ? height : "100%"}`,
          width: `${width ? width : "100%"}`,
        }}
        onClick={(e) => {
          if (files.current) {
            files.current.click();
          }
        }}
      >
        <input
          type="file"
          id={name}
          name={name}
          ref={files}
          onChange={handelPreview}
          onBlur={onBlur}
          style={{ display: "none" }}
        />
        {avatar?.preview && (
          <img
            style={{ position: "absolute", inset: 0 }}
            src={avatar?.preview}
            alt=""
            width={"100%"}
            height={"100%"}
          />
        )}
        {!avatar?.preview && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <i
              className="feather icon-upload-cloud"
              style={{ fontSize: 30, color: "white" }}
            ></i>
            <span style={{ color: "white", textAlign: "center" }}>
              Lưu ý: chỉ chấp nhận định dạng ảnh: png, jpg và kích thước tối
              thiểu 200 x 200
            </span>
          </div>
        )}

        {avatar?.preview && (
          <div
            className="deleteFile"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={delFiles}
          >
            <i className="feather icon-trash-2"></i>
          </div>
        )}
      </div>
      {/* <label htmlFor={name}>{title}</label> */}
      {/* {showError && <small className="form-text text-muted">{errors[name]}</small>} */}
    </div>
  );
};

export default ImagesField;
