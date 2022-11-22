import { Formik, Form, FastField } from "formik";

import {
  ImagesField,
  InputField,
  SelectField,
  TextareaField,
  TextEditor,
} from "../CustomField";

const FormNews = () => {
  const initialValues = {
    TitleNews: "",
    Edit: "",
    avatar: "",
  };

  return (
    <Formik initialValues={initialValues}>
      {(propFormik) => {
        const { values } = propFormik;

        return (
          <Form>
            <div className="row">
              <div className="col-md-12">
                <FastField
                  component={InputField}
                  name={"TitleNews"}
                  placeholder={"Tiêu Đề"}
                />
              </div>

              <div className="col-md-6">
                <FastField
                  component={SelectField}
                  name={"TitleNews"}
                  placeholder={"Loại"}
                />
              </div>

              <div className="col-md-6">
                <FastField
                  component={SelectField}
                  name={"TitleNews"}
                  placeholder={"Từ khóa"}
                />
              </div>

              <div className="col">
                <div className="row">
                  <div
                    className="col"
                    style={{
                      width: "100%",
                      flexGrow: "inherit"
                    }}
                  >
                    <FastField
                      component={ImagesField}
                      name={"avatar"}
                      placeholder={"Tiêu Đề"}
                      height={"200px"}
                      width={"200px"}
                    />
                  </div>

                  <div className="col">
                    <FastField
                      component={TextareaField}
                      name={"TitleNews"}
                      placeholder={"Từ khóa"}
                      height={200}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <FastField
                  component={TextEditor}
                  name={"Edit"}
                  placeholder={"Từ khóa"}
                  height={600}
                />
              </div>
            </div>
            <button className="btn btn-primary shadow-2 mb-4">Thêm</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormNews;
