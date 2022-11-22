import { useContext, useEffect, useRef, useState } from "react";
import * as menuServices from "~/Services/menuServices";
import { userDataContext } from "~/context/GetDataUser";
import LayoutLoading from "../LayoutLoading";

const LIMIT = 5;

const TableMenu = () => {
  const { token } = useContext(userDataContext);
  const idMenu = useRef(0);

  const [dataMenu, setDataMenu] = useState();
  const [updated, setUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [perPages, setPerPages] = useState(1);

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await menuServices.listMenu(LIMIT, perPages);

      if (response?.data) {
        setDataMenu(response);
        setIsPending(prev => !prev);
      }
    };

    getData();
  }, [updated, perPages]);

  const handelShow = (id) => {
    setIsOpen(true);
    idMenu.current = parseInt(id);
  };

  const deleteMenu = async () => {
    let isCheck = false;
    const response = await menuServices.DeleteMenu(idMenu.current, token);

    if (response?.status === 200) {
      isCheck = true;
    }

    return isCheck;
  };

  return (
    <LayoutLoading
      isOpen={isOpen}
      isLoadPending={isPending}
      setPerPages={setPerPages}
      dataPaging={dataMenu?.paging}
      setIsOpen={setIsOpen}
      callApi={deleteMenu}
      CallBackSuss={() => {
        setUpdated(prev => !prev)
        setIsPending(prev => !prev)
      }}
      onChangePaging={setIsPending}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Giá</th>
            <th scope="col" className="w-25">
              Mô tả
            </th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {dataMenu?.data &&
            dataMenu.data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "200px",
                        height: "200px",
                        display: "block",
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price + "k"}</td>
                  <td>{item.descption}</td>
                  <td>
                    <button
                      type="button"
                      className="text-white btn btn-danger"
                      onClick={() => {
                        handelShow(item.id);
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="text-white btn btn-primary"
                    >
                      Sửa
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

export default TableMenu;
