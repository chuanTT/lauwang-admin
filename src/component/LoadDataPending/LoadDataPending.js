import Loading from "~/component/Loading";
import Modal from "~/component/Modal";
import Pagination from "../Pagination";

const LoadDataPending = ({
  children,
  isOpen,
  setIsOpen,
  data,
  handelDelete,
  objectPages,
  setPerPages,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Thông báo
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            style={{ outline: "none" }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa không??</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handelDelete();
            }}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
      <div className="table-responsive">
        {data && children}
        {!data && (
          <Loading
            classCustom="loading-tag"
            styleContainer={{ height: "100px", width: "100px" }}
            size={0.5}
          />
        )}
      </div>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end"}}>
        <Pagination
          perPages={objectPages?.per_pager}
          limitPages={objectPages?.limit}
          totalPages={objectPages?.total}
          onPagesChanges={(pages) => {
            setPerPages(pages);
          }}
        />
      </div>
    </>
  );
};

export default LoadDataPending;
