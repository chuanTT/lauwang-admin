import { useContext, useState, useEffect, useRef } from "react";

import LayoutLoading from "../LayoutLoading";
import * as tableServices from "~/Services/tableServices";
import { userDataContext } from "~/context/GetDataUser";

const TableHandel = () => {
  const { token } = useContext(userDataContext);
  const [dataTable, setDataTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [perPages, setPerPages] = useState(1);
  const [updated, setUpdated] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const idOrder = useRef();

  useEffect(() => {
    const dataGetTable = async () => {
      const response = await tableServices.TableListBook(10, perPages, token);

      if (response?.data) {
        setDataTable(response);
        setIsPending(prev => !prev)
      }
    };

    dataGetTable();
  }, [token, perPages, updated]);

  const handelDelete = (id) => {
    idOrder.current = id;
    setIsOpen((prev) => !prev);
  };

  const deleteOrder = async () => {
    let isDelete = false;
    const response = await tableServices.DeleteOrder(idOrder.current, token);

    if (response.status === 200) {
      isDelete = true
    }

    return isDelete
  };

  return (
    <LayoutLoading
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callApi={deleteOrder}
      dataPaging={dataTable?.paging}
      isLoadPending={isPending}
      setPerPages={setPerPages}
      CallBackSuss={() => {
        setUpdated(prev => !prev)
        setIsPending(prev => !prev)
      }}
      onChangePaging={setIsPending}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="w-15">
              Họ tên
            </th>
            <th scope="col" className="w-10">
              Số điện thoại
            </th>
            <th scope="col">Ngày</th>
            <th scope="col">Giờ</th>
            <th scope="col">Cơ Sở</th>
            <th scope="col">Số người lớn</th>
            <th scope="col">Số trẻ em </th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {dataTable?.data &&
            dataTable.data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.full_name}</td>
                  <td>{item.phone}</td>
                  <td>{item.date}</td>
                  <td>{item.hours}</td>
                  <td>{item.name_base}</td>
                  <td>{item.num_adult}</td>
                  <td>{item.num_child}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="text-white btn btn-success"
                    >
                      Duyệt
                    </button>
                    <button
                      type="button"
                      className="text-white btn btn-danger"
                      onClick={() => {
                        handelDelete(item.id);
                      }}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </LayoutLoading>
  );
};

export default TableHandel;
