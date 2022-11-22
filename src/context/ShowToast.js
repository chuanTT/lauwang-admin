import { createContext, useRef, useState} from "react";

import Loading from "~/component/Loading";
import Toast from "~/component/Toast/Toast";

export const showToastContext = createContext();

const ShowToast = ({ children, CallBack = () => {} }) => {
  const titleToast = useRef({ type: "", msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const value = {
    titleToast,
    setIsLoading,
    isLoading,
    showToast,
    setShowToast
  }

  return (
    <showToastContext.Provider value={value}>
      {showToast && (
        <Toast
          isShowToast={showToast}
          type={titleToast.current.type}
          title={titleToast.current.msg}
          callBack={() => {
            CallBack(setShowToast, titleToast)
          }}
        />
      )}
      {isLoading && <Loading />}
      {children}
    </showToastContext.Provider>
  );
};

export default ShowToast;
