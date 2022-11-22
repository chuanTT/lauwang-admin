import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import { TableMenu } from "~/component/Table";
import ShowToast from "~/context/ShowToast";

const ListMenu = () => {
  return (
    <DefaultItem
      textButton={"Thêm thực đơn"}
      pathButton={config.path.AddMenu}
      title={"Danh sách thực đơn"}
    >
      <ShowToast CallBack={(CallFuc) => {
        CallFuc((pre) => !pre)
      }}>
        <TableMenu />
      </ShowToast>
    </DefaultItem>
  );
};

export default ListMenu;
