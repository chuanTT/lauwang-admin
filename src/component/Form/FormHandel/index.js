import { Field, Formik, Form } from "formik";
import { useContext, useEffect, useState } from "react";

import * as tableServices from "~/Services/tableServices";
import { SelectField } from "~/component/Form/CustomField";
import { userDataContext } from "~/context/GetDataUser";
import { showToastContext } from "~/context/ShowToast";
import SendFormData from "../SendFormData";

const FormHadel = ({ data, options, id }) => {
  const [formData, setFormData] = useState({});
  const { token } = useContext(userDataContext);
  const { titleToast, setIsLoading, isLoading, setShowToast } =
    useContext(showToastContext);

  const initialValues = {
    id_table: 0,
  };

  const handelSubmit = (values, { resetForm }) => {
    values.id_temp = id;
    setFormData({
      values,
      resetForm,
    });

    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    if (isLoading) {
      let data = SendFormData(formData.values);
      const addPendingSuss = async () => {
        const response = await tableServices.SussesPending(data, token);

        if (response?.status === 200) {
          titleToast.current.msg = "Thêm thành công";
          titleToast.current.type = "success";
          formData.resetForm();
        } else {
          titleToast.current.msg = "Thêm thất bại";
          titleToast.current.type = "erorr";
        }

        setIsLoading((pre) => !pre);
        setShowToast((pre) => !pre);
      };

      addPendingSuss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, token]);

  return (
    <Formik initialValues={initialValues} onSubmit={handelSubmit}>
      {(propFormik) => {
        return (
          <Form>
            <div className="row">
              {data.map((item, index) => {
                return (
                  <div className={`${item.classRows} mb-4`} key={index}>
                    <h5 className="mb-1">{item.title}</h5>
                    <span className="mt-2">{item.values}</span>
                  </div>
                );
              })}

              <div className="col-12">
                <h5 className="mb-2">Mã bàn</h5>
                <Field
                  component={SelectField}
                  name="id_table"
                  placeholder="Chọn mã bàn"
                  options={options}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary shadow-2 mb-4"
              disabled={titleToast.current.type === "success"}
            >
              Thêm
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormHadel;
