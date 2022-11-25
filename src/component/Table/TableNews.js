import { useContext } from "react";
import { loadingListContext } from "~/context/LayoutLoadingList";

const TableNews = () => {
  const { handelShow, data } = useContext(loadingListContext);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col align-middle">Hình ảnh</th>
            <th scope="col" className="w-25">
              Tiêu đề
            </th>
            <th scope="col" className="w-25">
              Mô tả
            </th>
            <th scope="col">Người đăng</th>
            <th scope="col">Loại</th>
            <th scope="col">Thời gian</th>
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
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.shortContent}</td>
                  <td>{item.poster}</td>
                  <td>{item.type}</td>
                  <td>{item.created_at}</td>
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

export default TableNews;
