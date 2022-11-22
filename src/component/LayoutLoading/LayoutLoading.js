import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Toast from "../Toast/Toast";
import Loading from "../Loading";
import Pagination from "../Pagination";

const LayoutLoading = ({
  children,
  callApi = async () => {},
  isOpen,
  setIsOpen,
  handelDelete = () => {},
  CallBack = () => {},
  CallBackSuss = () => {},
  isLoadPending = true,
  dataPaging = {},
  objectMsg = {
    error: "Xóa bàn thất bại",
    sussus: "Xóa bàn thành công",
  },
  setPerPages,
  onChangePaging = () => {}
}) => {
  const titleToast = useRef({ type: "", msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const GetDataCall = async () => {
        let isCheck = await callApi();

        if (isCheck) {
          titleToast.current.msg =
            objectMsg?.sussus || "Hủy đặt bàn thành công";
          titleToast.current.type = "success";
        } else {
          titleToast.current.msg = objectMsg?.error || "Hủy đặt bàn thất bại";
          titleToast.current.type = "erorr";
        }
        setIsLoading((pre) => !pre);
        setShowToast((pre) => !pre);
        setIsOpen((pre) => !pre);
      };
      GetDataCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
              setIsLoading((prev) => !prev);
              handelDelete();
            }}
          >
            Đồng ý
          </button>
        </div>
      </Modal>

      {showToast && (
        <Toast
          isShowToast={showToast}
          type={titleToast.current.type}
          title={titleToast.current.msg}
          callBack={() => {
            setShowToast((pre) => !pre);
            let isCheck = titleToast.current.type;
            if(isCheck === "success") {
                CallBackSuss();
            }
          }}
        />
      )}
      {isLoading && <Loading />}

      {!isLoadPending && (
        <>
          {children}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              perPages={dataPaging?.per_pager}
              limitPages={dataPaging?.limit}
              totalPages={dataPaging?.total}
              onPagesChanges={(pages) => {
                setPerPages(pages);
                onChangePaging(prev => !prev)
              }}
            />
          </div>
        </>
      )}

      {isLoadPending && (
        <Loading
          classCustom="loading-tag"
          styleContainer={{ height: "100px", width: "100px" }}
          size={0.5}
        />
      )}
    </>
  );
};

export default LayoutLoading;
