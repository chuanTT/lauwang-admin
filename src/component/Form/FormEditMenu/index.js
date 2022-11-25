import { FastField, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

import * as menuServices from "~/Services/menuServices";
import config from "~/config";
import { ImagesField, InputField, TextareaField } from "../CustomField";
import { isEmptyObj } from "./FucEditMenu";
import Loading from "~/component/Loading";
import { userDataContext } from "~/context/GetDataUser";
import { showToastContext } from "~/context/ShowToast";
import SendFormData from "../SendFormData";

const FormEditMenu = () => {
  const { token } = useContext(userDataContext);
  const { titleToast, setIsLoading, isLoading, setShowToast } =
    useContext(showToastContext);
  const { id } = useParams();
  const isResetFile = useRef(false)
  const navigate = useNavigate();
  const [dataMenu, setDataMenu] = useState({});
  const [dataForm, setFormData] = useState({});


  useEffect(() => {
    const getData = async () => {
      const response = await menuServices.detailsMenu(id);

      if (response?.data) {
        setDataMenu(response.data);
      } else {
        navigate(config.path.Menu);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSubmit = (values, {resetForm }) => {
    setIsLoading((pre) => !pre);
    values.id = id;
    setFormData({
      values,
      resetForm
    });
  };

  const initialValues = {
    name: dataMenu?.name,
    price: dataMenu?.price,
    desc: dataMenu?.descption,
    thumbnail: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tiêu đề"),
    price: Yup.string().required("Vui lòng nhập giá"),
    desc: Yup.string().required("Vui lòng nhập mô tả")
  });

  useEffect(() => {
    if (isLoading && dataForm) {
      let data = SendFormData(dataForm?.values);

      const sendData = async () => {
        const response = await menuServices.EditMenu(data, token);

        if (response?.status === 200) {
          titleToast.current.msg = "Thêm thành công";
          titleToast.current.type = "success";
          isResetFile.current = true;
          dataForm.resetForm({
            values: {
              name: "",
              price: "",
              desc: "",
            }
          });
        } else {
          titleToast.current.msg = "Thêm thất bại";
          titleToast.current.type = "erorr";
        }

        setIsLoading((pre) => !pre);
        setShowToast((pre) => !pre);
      };

      sendData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dataForm, token]);

  return (
    <>
      {isEmptyObj(dataMenu) && (
        <Loading
          classCustom="loading-tag"
          styleContainer={{ height: "100px", width: "100px" }}
          size={0.5}
        />
      )}

      {!isEmptyObj(dataMenu) && (
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
                          height={"185px"}
                          width={"264px"}
                          defaultSrc={dataMenu?.image}
                          resertFile={isResetFile.current}
                        />
                      </div>

                      <div className="col">
                        <FastField
                          component={TextareaField}
                          name={"desc"}
                          placeholder={"Mô tả"}
                          height={185}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary shadow-2 mb-4"
                  disabled={titleToast.current.type === "success"}
                  type="submit"
                >
                  Chỉnh sửa
                </button>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default FormEditMenu;
