import { useContext } from "react";
import { NavLink } from "react-router-dom";
import config from "~/config";
import { loadingListContext } from "~/context/LayoutLoadingList";

const TableMenu = () => {
  const { handelShow, data } = useContext(loadingListContext);

  return (
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
        {data?.data &&
          data.data.map((item) => {
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
                  <NavLink
                    to={`${config.path.EditMenuNoParams}${item.id}`}
                    type="button"
                    className="text-white btn btn-primary"
                  >
                    Sửa
                  </NavLink>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableMenu;
