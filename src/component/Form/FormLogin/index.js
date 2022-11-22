import { Formik, Form, Field } from "formik";
import {
  useContext,
  useEffect,
  useState
} from "react";

import { initialValues, validationSchema } from "./validateForm";
import { InputField } from "../CustomField";
import SendFormData from "../SendFormData";
import * as authenServices from "~/Services/authenServices";
import { convertDate, setCookie } from "~/component/Cookie";
import { showToastContext } from "~/context/ShowToast";

const FormLogin = (prop) => {
  const { titleToast, setIsLoading, isLoading, setShowToast } =
    useContext(showToastContext);
  const [dataForm, setDataForm] = useState({});

  const handelSubmit = (values, {setFieldValue, resetForm, setSubmitting}) => {
    setDataForm({
      values,
      resetForm,
      setSubmitting,
      setFieldValue
    });
    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    if (isLoading) {
      let data = SendFormData(dataForm.values);

      const sendFrom = async () => {
        const response = await authenServices.LoginUser(data);

        if (response?.token) {
          let expiresIn = convertDate(response.expiresIn);
          setCookie("accessToken", response.token, expiresIn);
          titleToast.current.msg = "Đăng nhập thành công";
          titleToast.current.type = "success";
        } else {
          titleToast.current.msg = "Đăng nhập thất bại";
          titleToast.current.type = "erorr";
        }

        setShowToast((preState) => !preState);
        setIsLoading((prev) => !prev);
        dataForm.setSubmitting(false);
        dataForm.setFieldValue("password", "");
      };

      sendFrom();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, titleToast, setShowToast, setIsLoading]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}
    >
      {() => {
        return (
          <Form>
            <div className="row">
              <div className="col-md-12">
                <Field
                  component={InputField}
                  name={"user_name"}
                  placeholder={"Nhập tên đăng nhập"}
                />
              </div>

              <div className="col-md-12">
                <Field
                  component={InputField}
                  name={"password"}
                  placeholder={"Nhập mật khẩu"}
                  type={"password"}
                  autoComplete="off"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary shadow-2 mb-4">
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
