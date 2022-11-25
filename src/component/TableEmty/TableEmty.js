import Loading from "../Loading";
import Pagination from "../Pagination";

const TableEmty = ({ data, isPending, setPerPages, setIsPending}) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="w-15">
              Mã Bàn
            </th>
            <th scope="col" className="w-10">
              Địa chỉ
            </th>
            <th scope="col">Số người tối đa</th>
          </tr>
        </thead>
        <tbody>
          {data?.data &&
            !isPending &&
            data.data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.DiaChi}</td>
                  <td>{item.SoNguoiToiDa}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {isPending && (
        <Loading
          classCustom="loading-tag"
          styleContainer={{ height: "100px", width: "100px" }}
          size={0.5}
        />
      )}

      {!data?.data && !isPending && <span>Không tìm thấy bản ghi nào...</span>}

      {!isPending && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Pagination
            perPages={data?.paging?.per_pager}
            limitPages={data?.paging?.limit}
            totalPages={data?.paging?.total}
            onPagesChanges={(pages) => {
              setPerPages(pages);
              setIsPending((prev) => !prev)
            }}
          />
        </div>
      )}
    </>
  );
};

export default TableEmty;
