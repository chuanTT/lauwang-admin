import { useContext, useRef, useState } from "react";
import LayoutLoading from "../LayoutLoading";
import * as tableServices from "~/Services/tableServices";
import { userDataContext } from "~/context/GetDataUser";


const TableBooked = ({
  data,
  isPending,
  setIsPending,
  setPerPages,
  setUpdated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useContext(userDataContext);
  const idBooked = useRef();

  const handelDelete = (id) => {
    idBooked.current = id;
    setIsOpen((prev) => !prev);
  };

  const deleteOrder = async () => {
    let isDelete = false;
    const response = await tableServices.payTable(idBooked.current, token);

    if (response.status === 200) {
      isDelete = true;
    }

    return isDelete;
  };

  return (
    <LayoutLoading
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callApi={deleteOrder}
      dataPaging={data?.paging}
      isLoadPending={isPending}
      setPerPages={setPerPages}
      CallBackSuss={() => {
        setUpdated((prev) => !prev);
        setIsPending((prev) => !prev);
      }}
      onChangePaging={setIsPending}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="w-15">
              Mã Bàn
            </th>
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
          {data?.data?.length > 0 && data.data[0].full_name&&
            data?.data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.MaBan}</td>
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
                      className="text-white btn btn-danger"
                      onClick={() => {
                        handelDelete(item.id);
                      }}
                    >
                      Trả bàn
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {(!(data?.data?.length > 0 && (data.data[0].full_name))||!data?.data) && !isPending && <span>Không tìm thấy bản ghi nào...</span>}
    </LayoutLoading>
  );
};

export default TableBooked;
