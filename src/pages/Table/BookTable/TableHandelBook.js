import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormHadel from "~/component/Form/FormHandel";
import config from "~/config";
import Loading from "~/component/Loading";
import { userDataContext } from "~/context/GetDataUser";
import DefaultItem from "~/layout/DefaultItem";
import * as tableServices from "~/Services/tableServices";
import ShowToast from "~/context/ShowToast";

const dataPendingInit = [
  {
    key: "id",
    title: "Mã",
    classRows: "col-6",
  },
  {
    key: "full_name",
    title: "Họ tên",
    classRows: "col-6",
  },
  {
    key: "phone",
    title: "Số điện thoại",
    classRows: "col-6",
  },
  {
    key: "date",
    title: "Ngày",
    classRows: "col-6",
  },
  {
    key: "hours",
    title: "Giờ",
    classRows: "col-6",
  },
  {
    key: "name_base",
    title: "Cơ Sở",
    classRows: "col-6",
  },
  {
    key: "num_adult",
    title: "Số người lớn",
    classRows: "col-6",
  },
  {
    key: "num_child",
    title: "Số trẻ em",
    classRows: "col-6",
  },
  {
    key: "note",
    title: "Ghi chú",
    classRows: "col-12",
  },
];

const funcOption = (array) => {
  const options = [];
  array.forEach((id) => {
    options.push({
      value: id,
      label: id,
    });
  });

  return options;
};

const TableHandelBook = () => {
  const { id } = useParams();
  const { token } = useContext(userDataContext);
  const [dataPending, setDataPending] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getPending = async () => {
        const response = await tableServices.GetListPending(id, token);

        if (response?.data) {
          dataPendingInit.forEach((item, index) => {
            item.values = response.data[item.key];
            dataPendingInit[index] = item;
          });
          setDataPending(dataPendingInit);
          setOptions(funcOption(response.data.list_table));
        } else {
          navigate(config.path.TableBook);
        }
      };

      getPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  return (
    <DefaultItem
      textButton={"Thêm tin tức"}
      isVisible={false}
      title={"Bàn đang chờ duyệt"}
    >
      {!dataPending.length > 0 && (
        <Loading
          classCustom="loading-tag"
          styleContainer={{ height: "100px", width: "100px" }}
          size={0.5}
        />
      )}

      {dataPending.length > 0 && (
        <ShowToast CallBack={(setShowToast, titleToast) => {
          setShowToast((pre) => !pre);
          let isCheck = titleToast.current.type;
          if(isCheck === "success") {
              navigate(config.path.TableBook)
          }
        }}>
          <FormHadel data={dataPending} options={options} id={id}/>
        </ShowToast>
      )}
    </DefaultItem>
  );
};

export default TableHandelBook;
