import DefaultItem from "~/layout/DefaultItem";
import { TableStatusComponent } from "~/component/Table";

const TableStatus = () => {
  return (
    <DefaultItem isVisible={false} title={"Bàn trống và bàn đã được đặt"}>
      <TableStatusComponent />
    </DefaultItem>
  );
};

export default TableStatus;
