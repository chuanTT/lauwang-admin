import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import { TableMenu } from "~/component/Table";
import LayoutLoadingList from "~/context/LayoutLoadingList";
import * as menuServices from "~/Services/menuServices";

const LIMIT = 12;

const ListMenu = () => {
  const GetDataList = async (perPages) => {
    const response = await menuServices.listMenu(LIMIT, perPages);

    if(response.status === 200) {
      return response.data;
    }
    return response;
  }

  const DeleteMenu = async(id, token) => {
    const response = await menuServices.DeleteMenu(id, token);

    return response;
  }

  return (
    <DefaultItem
      textButton={"Thêm thực đơn"}
      pathButton={config.path.AddMenu}
      title={"Danh sách thực đơn"}
    >
      <LayoutLoadingList
         CallApi={GetDataList}
         DeleteFuc={DeleteMenu}
      >
        <TableMenu />
      </LayoutLoadingList>
    </DefaultItem>
  );
};

export default ListMenu;
