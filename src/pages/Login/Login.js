import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "~/component/Cookie";
import { FormLogin } from "~/component/Form";
import config from "~/config";
import ShowToast from "~/context/ShowToast";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = getCookie('accessToken');

    if(token) {
      navigate(config.path.Home);
    }
  }, [navigate])

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-bg">
          <span className="r"></span>
          <span className="r s"></span>
          <span className="r s"></span>
          <span className="r"></span>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <i className="feather icon-unlock auth-icon"></i>
            </div>
            <h3 className="mb-4">Đăng nhập</h3>
            <ShowToast CallBack={(setShowToast, titleToast) => {
              setShowToast(preStates => !preStates);

              if(titleToast.current.type === "success") {
                navigate(config.path.Home);
              }
            }}>
              <FormLogin />
            </ShowToast>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
