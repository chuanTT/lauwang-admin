import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SlideBar from "../SlideBar";
import Header from "../Header";
import Footer from "../Footer";
import GetDataUser from "~/context/GetDataUser";
import { getCookie } from "~/component/Cookie";

import "./DefaultLayout.scss";
import config from "~/config";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  let token = getCookie('accessToken');

  useEffect(() => {
    if(!token) {
      navigate(config.path.Login);
    }
  }, [token, navigate])

  return (
    <GetDataUser token={token}>
      {/* <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div> */}

      <SlideBar />

      <Header />

      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">{children}</div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </GetDataUser>
  );
};

export default DefaultLayout;
