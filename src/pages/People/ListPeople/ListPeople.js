import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import * as userServices from "~/Services/userServices";
import LayoutLoadingList from "~/context/LayoutLoadingList";
import { TablePeople } from "~/component/Table";

const LIMIT = 4;

const ListPeople = () => {


  const GetListNews = async (perPages, token, id) => {
    const response = await userServices.getListUser(id, LIMIT, perPages, token);
    if (response.status === 200) {
      return response.data;
    }
    return response;
  };

  //   const DeleteNews = async (id, token) => {
  //     const response = await newServices.DeleteNews(id, token);

  //     return response;
  //   };
  return (
    <DefaultItem
      textButton={"Thêm nhân viên"}
      pathButton={config.path.AddNews}
      title={"Danh sách nhân viên"}
    >
      <LayoutLoadingList CallApi={GetListNews}>
        <TablePeople />
      </LayoutLoadingList>
    </DefaultItem>
  );
};

export default ListPeople;
