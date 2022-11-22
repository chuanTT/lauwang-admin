import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Toast = ({ type, isShowToast, title, callBack = () => {} }) => {
  useEffect(() => {
    if (isShowToast) {
      const settings = {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };

      if (type === "success") {
        toast.success(title, settings);
      } else if (type === "erorr") {
        toast.error(title, settings);
      }
    }
  });

  // if (!isShowToast) return null;

  return (
    <ToastContainer
      position="top-right"
      autoClose={1200}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      onClose={() => callBack()}
    />
  );
};

export default Toast;
