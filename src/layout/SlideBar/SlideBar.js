import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import config from "~/config";
import DataSlider from "./dataSlider";
import "./SlideBar.scss";

const SlideBar = () => {
  
  const ShowChildren = (e) => {
    e.preventDefault();
    let parentElement = e.target.parentElement;

    if(parentElement) {
      if(!parentElement.classList.contains('pcoded-hasmenu')) {
        parentElement.classList.add('pcoded-hasmenu')
        e.target.classList.add('active')
      } else {
        parentElement.classList.remove('pcoded-hasmenu')
        e.target.classList.add('active')
      }
    }
  };

  const removeClassAll = (listElement, className, matchesFuc = () => {}) => {
    if(listElement) {
      listElement.forEach((item) => {
        if(item.classList.contains(className)) {
          item.classList.remove(className)
          matchesFuc(item);
        }
      })
    }
  }

  const CheckClassName = (e) => {
    let navConent = document.querySelectorAll('.nav-content');
    
    if(navConent) {
      removeClassAll(navConent, 'pcoded-hasmenu', (item) => {
        let elem = item.querySelector('.nav-item');
        if(elem) {
          if(elem.classList.contains('active')) {
            elem.classList.remove('active')
          }
        }
      });
      navConent.forEach((item) => {
        if(item.classList.contains('pcoded-hasmenu')) {
          let child = item.querySelector('.nav-item');
          item.classList.remove('pcoded-hasmenu')
          if(child) {
            if(child.classList.contains('active')) {
              child.classList.remove('active')
            }
          }
        }
      })
    }
  }

  const searchParentElement = (element, selector) => {
    while(element.parentElement) {
      if(element.parentElement.matches(selector)) {
        return element = element.parentElement
      }
      element = element.parentElement;
    }
  }

  useEffect(() => {
    let element = document.querySelector('.submenu-item.active');
    
    if(element) {
      let parentElement = searchParentElement(element, '.nav-content')
      
      if(parentElement) {
        parentElement.classList.add('pcoded-hasmenu')
      }
    }
  }, [])

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
                <li className="nav-content" key={index}>
                  <NavLink
                    to={item.path}
                    className="nav-item"
                    end={item.path === config.path.Home}
                    onClick={(e) => {
                      item.children ? ShowChildren(e) : CheckClassName(e);
                    }}
                  >
                    <span className="nav-link">
                      <span className="pcoded-micon">
                        {item.icon && (
                          <i className={`feather ${item.icon}`}></i>
                        )}
                      </span>
                      <span className="pcoded-mtext">{item.name}</span>
                    </span>
                  </NavLink>

                  {item?.children && (
                    <ul className="pcoded-submenu">
                      {item.children.map((item, index) => {
                        return (
                          <li key={index}>
                            <NavLink className={"submenu-item"} to={item.path}>{item.name}</NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SlideBar;
