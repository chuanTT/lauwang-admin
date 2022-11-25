import { useContext, useState, useEffect, useRef } from "react";

import * as tableServices from "~/Services/tableServices";
import { userDataContext } from "~/context/GetDataUser";
import TableEmty from "../TableEmty";
import TableBooked from "../TableBooked";
import FilterTable from "../FilterTable";

const LIMIT = 12;

const TableStatusComponent = () => {
  const { token } = useContext(userDataContext);
  const [dataTable, setDataTable] = useState([]);

  const [perPages, setPerPages] = useState(1);
  const [updated, setUpdated] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const [dataStatus, setDataStatus] = useState({
    type: 0,
    base: 0,
  });

  useEffect(() => {
    if (dataStatus.base !== 0) {
      const dataGetTable = async () => {
        const response = await tableServices.getTableStatus(
          dataStatus.base,
          dataStatus.type,
          LIMIT,
          perPages,
          token
        );

        if (response.status === 200) {
          setDataTable(response.data);
        } else {
          setDataTable([])
        }
        setIsPending((prev) => !prev);
      };
      dataGetTable();
    } else {
      setIsPending((prev) => !prev);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, perPages, updated, dataStatus]);


  return (
    <>
      <FilterTable dataFilter={setDataStatus} setIsPending={setIsPending} />
      {parseInt(dataStatus.type) === 0 ? (
        <TableEmty
          data={dataTable}
          isPending={isPending}
          setPerPages={setPerPages}
          setIsPending={setIsPending}
        />
      ) : (
        <TableBooked
          data={dataTable}
          isPending={isPending}
          setIsPending={setIsPending}
          setPerPages={setPerPages}
          setUpdated={setUpdated}
        />
      )}
    </>
  );
};

export default TableStatusComponent;
