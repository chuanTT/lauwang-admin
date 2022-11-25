import { TableNews } from "~/component/Table";
import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import * as newServices from "~/Services/newServices";
import LayoutLoadingList from "~/context/LayoutLoadingList";

const LIMIT = 4;

const ListNews = () => {

  const GetListNews = async (perPages) => {
    const response = await newServices.listNews(LIMIT, perPages);
    if (response.status === 200) {
      return response.data;
    }
    return response;
  };

  const DeleteNews = async (id, token) => {
    const response = await newServices.DeleteNews(id, token);

    return response;
  };
  return (
    <DefaultItem
      textButton={"Thêm tin tức"}
      pathButton={config.path.AddNews}
      title={"Danh sách tin tức"}
    >
      <LayoutLoadingList CallApi={GetListNews} DeleteFuc={DeleteNews}>
        <TableNews />
      </LayoutLoadingList>
    </DefaultItem>
  );
};

export default ListNews;
