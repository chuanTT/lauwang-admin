import { useContext } from "react";
import { loadingListContext } from "~/context/LayoutLoadingList";

const TablePeople = () => {
  const { handelShow, data } = useContext(loadingListContext);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col align-middle">Hình ảnh</th>
            <th scope="col" className="w-25">
              Họ Và Tên
            </th>
            <th scope="col" className="w-25">
              Ngày Sinh
            </th>
            <th scope="col">Địa Chỉ </th>
            <th scope="col">Chức Vụ</th>
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
                      src={item.avatar}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>{item.HoTen}</td>
                  <td>{item.NgaySinh}</td>
                  <td>{item.DiaChi}</td>
                  <td>{item.nameRole}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
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
    </div>
  );
};

export default TablePeople;
