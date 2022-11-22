import { Formik, Form, FastField } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { ImagesField, InputField, TextareaField } from "../CustomField";
import SendFormData from "../SendFormData";
import * as menuServices from "~/Services/menuServices";
import { userDataContext } from "~/context/GetDataUser";
import { showToastContext } from "~/context/ShowToast";

const FormMenu = () => {
  const { token } = useContext(userDataContext);
  const { titleToast, setIsLoading, isLoading, setShowToast } =
    useContext(showToastContext);
  const [dataForm, setFormData] = useState({});

  const initialValues = {
    name: "",
    price: "",
    desc: "",
    thumbnail: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tiêu đề"),
    price: Yup.string().required("Vui lòng nhập giá"),
    desc: Yup.string().required("Vui lòng nhập mô tả"),
  });

  const handelSubmit = (values) => {
    setIsLoading((pre) => !pre);
    setFormData(values);
  };

  useEffect(() => {
    if (isLoading && dataForm) {
      let data = SendFormData(dataForm);

      const sendData = async () => {
        const response = await menuServices.addMenu(data, token);

        console.log(response);

        // if (response?.status === 200) {
        //   titleToast.current.msg = "Thêm thành công";
        //   titleToast.current.type = "success";
        // } else {
        //   titleToast.current.msg = "Thêm thất bại";
        //   titleToast.current.type = "erorr";
        // }

        // setIsLoading((pre) => !pre);
        // setShowToast((pre) => !pre);
      };

      sendData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dataForm, token]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handelSubmit}
      >
        {(propFormik) => {
          return (
            <Form>
              <div className="row">
                <div className="col-md-9">
                  <FastField
                    component={InputField}
                    name={"name"}
                    placeholder={"Tiêu Đề"}
                  />
                </div>

                <div className="col-md-3">
                  <FastField
                    component={InputField}
                    name={"price"}
                    placeholder={"Giá"}
                  />
                </div>

                <div className="col">
                  <div className="row">
                    <div
                      className="col"
                      style={{
                        width: "100%",
                        flexGrow: "inherit",
                      }}
                    >
                      <FastField
                        component={ImagesField}
                        name={"thumbnail"}
                        height={"200px"}
                        width={"200px"}
                      />
                    </div>

                    <div className="col">
                      <FastField
                        component={TextareaField}
                        name={"desc"}
                        placeholder={"Mô tả"}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                disabled={titleToast.current.type === "success" ? true : false}
                type="submit"
              >
                Thêm
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormMenu;
