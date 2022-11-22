import { NavLink } from "react-router-dom";
import config from "~/config";
import DataSlider from "./dataSlider";
import "./SlideBar.scss";


const SlideBar = () => {
  return (
    <nav className="pcoded-navbar">
      <div className="navbar-wrapper">
        <div className="navbar-brand header-logo">
          <a href="index.html" className="b-brand">
            <div className="b-bg">
              <i className="feather icon-trending-up"></i>
            </div>
            <span className="b-title">Admin</span>
          </a>
          <a className="mobile-menu" id="mobile-collapse">
            <span></span>
          </a>
        </div>
        <div className="navbar-content scroll-div">
          <ul className="nav pcoded-inner-navbar">
            {DataSlider.map((item, index) => {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  // data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                  className="nav-item"
                  end={item.path === config.path.Home}
                >
                  <span className="nav-link">
                    <span className="pcoded-micon">
                      {item.icon && <i className={`feather ${item.icon}`}></i>}
                    </span>
                    <span className="pcoded-mtext">{item.name}</span>
                  </span>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SlideBar;
