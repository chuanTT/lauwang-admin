import * as Yup from "yup";

const initialValues = {
  user_name: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

export { initialValues, validationSchema };
