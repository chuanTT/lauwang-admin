import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { InputField, SelectField } from "../Form/CustomField";
import * as tableServices from "~/Services/tableServices";
import statusTable from "./dataFilter";

const FilterTable = ({dataFilter, setIsPending}) => {
  const [listBase, setListBase] = useState([])

  const initialValues = {
    type: 0,
    base: 0,
  };

  useEffect(() => {
    const funcOption = (array) => {
      const options = [];
      array.forEach((singer) => {
        options.push({
          value: singer.id,
          label: singer.name,
        });
      });

      return options;
    };

    const getData = async () => {
      const response = await tableServices.getBase();

      if(response?.length > 0) {
        setListBase(funcOption(response));
      }
    }

    getData();
  }, [])

  const handelSubmitForm = (values) => {
    dataFilter({...values});
    setIsPending(prev => !prev)
  };

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handelSubmitForm}
    >
      {(propFormik) => {
        const { values } = propFormik;

        return (
          <Form>
            <div className="row">
              <div className="col-md-4">
                <Field
                  component={SelectField}
                  name="base"
                  placeholder="Cơ sở"
                  options={listBase}
                />
              </div>

              {statusTable.map((item, index) => {
                return (
                  <div className="col-md-2" key={index}>
                    <Field
                      component={InputField}
                      name="type"
                      value={item.value}
                      checked={parseInt(values.type) === item.value}
                      type="radio"
                      isLabel
                      idLable={item.id}
                      title={item.text}
                      isLabelPostion={false}
                      styleFormGroup={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </div>
                );
              })}

              <button
                className="btn btn-primary shadow-2 mb-4"
                type="submit"
                style={{ marginLeft: "auto" }}
              >
                Lọc
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterTable;
