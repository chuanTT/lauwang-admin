import { useContext } from "react";
import { NavLink } from "react-router-dom";
import config from "~/config";

import { loadingListContext } from "~/context/LayoutLoadingList";

const TableHandel = () => {
  const { handelShow, data } = useContext(loadingListContext);

  return (
    <>
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
          {data?.data &&
            data.data.map((item) => {
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
                    <NavLink
                      to={`${config.path.TableBook}/${item.id}`}
                      type="button"
                      className="text-white btn btn-success"
                    >
                      Duyệt
                    </NavLink>
                    <button
                      type="button"
                      className="text-white btn btn-danger"
                      onClick={() => {
                        handelShow(item.id);
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
    </>
  );
};

export default TableHandel;
