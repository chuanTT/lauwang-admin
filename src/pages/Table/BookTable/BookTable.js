import DefaultItem from "~/layout/DefaultItem";
import { TableHandel } from "~/component/Table";

const BookTable = () => {
  

  return (
    <DefaultItem
      textButton={"Thêm tin tức"}
      isVisible={false}
      title={"Bàn đang chờ duyệt"}
    >
      <TableHandel />
    </DefaultItem>
  );
};

export default BookTable;
