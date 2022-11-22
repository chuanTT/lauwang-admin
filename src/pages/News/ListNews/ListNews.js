import { useEffect, useState } from "react";
import LoadDataPending from "~/component/LoadDataPending";
import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import * as newServices from "~/Services/newServices";

const ListNews = () => {
  const [dataNews, setDataNews] = useState([]);

  useEffect(() => {
    const dataGetNews = async () => {
      const response = await newServices.listNews(12, 1);

      if (response?.data) {
        setDataNews(response);
      }
    };

    dataGetNews();
  }, []);

  return (
    <DefaultItem
      textButton={"Thêm tin tức"}
      pathButton={config.path.AddNews}
      title={"Danh sách tin tức"}
    >
      <LoadDataPending data={dataNews?.data}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col align-middle">Hình ảnh</th>
              <th scope="col" className="w-25">Tiêu đề</th>
              <th scope="col" className="w-25">Mô tả</th>
              <th scope="col">Người đăng</th>
              <th scope="col">Loại</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {dataNews?.data &&
              dataNews.data.map((item) => {
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
                    <td style={{whiteSpace: 'nowrap'}}>
                      <button type="button" className="text-white btn btn-danger">Xóa</button>
                      <button type="button" className="text-white btn btn-primary">Sửa</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </LoadDataPending>
    </DefaultItem>
  );
};

export default ListNews;
