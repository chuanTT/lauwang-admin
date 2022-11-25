import { createContext, useContext, useEffect, useRef, useState } from "react";
import Proptypes from "prop-types";

import { userDataContext } from "~/context/GetDataUser";
import LayoutLoading from "~/component/LayoutLoading";

export const loadingListContext = createContext();

const LayoutLoadingList = ({
  CallApi = async () => {},
  children,
  DeleteFuc = async () => {},
  msgNotData
}) => {
  const { token, id } = useContext(userDataContext);
  const idCurrent = useRef(0);
  const [updated, setUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [perPages, setPerPages] = useState(1);
  const [isPending, setIsPending] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataGetNews = async () => {
      const response = await CallApi(perPages, token, id);

      if (response?.data) {
        setData(response);
      } else {
        setData([])
      }
      setIsPending((prev) => !prev);
    };

    dataGetNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPages, updated]);

  const handelShow = (id) => {
    if (!isPending) {
      setIsOpen(true);
    }
    idCurrent.current = parseInt(id);
  };

  const Delete = async () => {
    let isCheck = false;
    const response = await DeleteFuc(idCurrent.current, token);

    if (response?.status === 200) {
      isCheck = true;
    }
    return isCheck;
  };

  const Values = {
    handelShow,
    data
  }

  return (
    <loadingListContext.Provider value={Values}>
      <LayoutLoading
        isOpen={isOpen}
        isLoadPending={isPending}
        setPerPages={setPerPages}
        dataPaging={data?.paging}
        setIsOpen={setIsOpen}
        callApi={Delete}
        CallBackSuss={() => {
          setUpdated((prev) => !prev);
          setIsPending((prev) => !prev);
        }}
        onChangePaging={setIsPending}
      >
        {children}
        {!data?.data && <span>{msgNotData}</span>}
      </LayoutLoading>
    </loadingListContext.Provider>
  );
};

LayoutLoadingList.prototype = {
  children: Proptypes.node.isRequired,
  CallApi: Proptypes.func.isRequired,
  DeleteFuc: Proptypes.func.isRequired,
  msgNotData: Proptypes.string
};


LayoutLoadingList.defaultProps = {
  msgNotData: 'Không tìm thấy bản ghi nào...'
}


export default LayoutLoadingList;
