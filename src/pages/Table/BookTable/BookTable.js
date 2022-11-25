import DefaultItem from "~/layout/DefaultItem";
import { TableHandel } from "~/component/Table";
import LayoutLoadingList from "~/context/LayoutLoadingList";

import * as tableServices from "~/Services/tableServices";

const LIMIT = 12;

const BookTable = () => {
  const GetDataList = async (perPages, token) => {
    const response =  await tableServices.TableListBook(LIMIT, perPages, token);

    if(response.status === 200) {
      return response.data;
    }
    return response;
  }

  const DeleteTable = async (id, token) => {
    const response = await tableServices.DeleteOrder(id, token);

    return response;
  }

  return (
    <DefaultItem
      textButton={"Thêm tin tức"}
      isVisible={false}
      title={"Bàn đang chờ duyệt"}
    >
      <LayoutLoadingList CallApi={GetDataList} DeleteFuc={DeleteTable}>
        <TableHandel />
      </LayoutLoadingList>
    </DefaultItem>
  );
};

export default BookTable;
