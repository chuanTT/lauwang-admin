import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const ImagesField = (prop) => {
  const dataFile = useRef(new DataTransfer());
  const files = useRef();
  const { field, form, height, width, msgSize, sizeFile, validType, msgType, defaultSrc, resertFile } =
    prop;
  const { name, value, onBlur } = field;
  const { errors } = form;
  const showError = errors[name];
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  useEffect(() => {
    if(defaultSrc) {
      setAvatar((preStates) => {
        return {...preStates, preview: defaultSrc}
      });
    }
  }, []);

  const delFiles = (e) => {
    e.stopPropagation();
    dataFile.current.items.clear();
    files.current.files = dataFile.current.files;
    setAvatar(files.current.files[0]);
  };

  const handelPreview = (e) => {
    let file = e.target.files[0];

    if (file) {
      if (!validType.includes(file.type)) {
        e.target.value = "";
        form.setFieldError(name, msgType || "Định dạng file không hợp lệ");
        return;
      }
      let size = (file.size / 1024 / 1024).toFixed(2);
      if (!(size <= sizeFile)) {
        e.target.value = "";
        form.setFieldError(
          name,
          msgSize || "Dung dượng file vượt quá giới hạn"
        );
        return;
      }
      dataFile.current.items.clear();
      dataFile.current.items.add(file);
    } else if (dataFile.current.files.length > 0) {
      file = dataFile.current.files;
      e.target.files[0] = file;
    } else {
      return;
    }

    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    form.setFieldValue(name, file);
  };

  useEffect(() => {
    if(resertFile) {
      if(avatar?.preview) {
        setAvatar(preStates => {
          let {preview, ...rest} = preStates;

          return rest
        })
      }
    }
  }, [resertFile, avatar])

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
              Lưu ý: chỉ chấp nhận định dạng: {validType.join(", ")} và dung
              lượng tối đa {sizeFile}MB
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
      {showError && (
        <small className="form-text text-danger text-left">{errors[name]}</small>
      )}
    </div>
  );
};

ImagesField.prototype = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  height: PropTypes.string,
  width: PropTypes.string,
  msgSize: PropTypes.string,
  sizeFile: PropTypes.number,
  validType: PropTypes.array,
  msgType: PropTypes.string,
  defaultSrc: PropTypes.string,
  resertFile: PropTypes.bool
};

ImagesField.defaultProps = {
  height: "200px",
  width: "200px",
  msgSize: "Không được vượt quá định dạng",
  sizeFile: 5,
  validType: ["image/jpg", "image/jpeg", "image/png"],
  msgType: "File không đúng dịnh dạng",
  defaultSrc: "",
  resertFile: false
};

export default ImagesField;
