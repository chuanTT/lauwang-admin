import { useEffect, useLayoutEffect, useRef } from "react";

import "./Modal.scss";

const Modal = ({ children, setIsOpen, isOpen, isCloseMain = true }) => {
  const ModalMain = useRef();
  const ModalContent = useRef();

  const VisibleModel = (e, modelMain) => {
    let element = e.target;

    if (element && modelMain) {
      let { width, top, height, left } = modelMain.getBoundingClientRect();

      let maxX = left + width;
      let maxY = top + height;

      let x = e.clientX;
      let y = e.clientY;

      if (x < left || x > maxX || y < top || y > maxY) {
        setIsOpen(!isOpen);
      }
    }
  };

  function handelAnimationed (e) {
    let element = e.target;
    element.removeEventListener("animationend", handelAnimationed);
    ModalMain.current.style.display = "none";
  }

  function clearAnimation(element, parentElement) {
    if (element && parentElement) {
      if( parentElement.classList.contains('show')) {
        parentElement.classList.remove("show");
        element.addEventListener("animationend", handelAnimationed);
      } else {
        ModalMain.current.style.display = "none";
      }
    }
  }
  useLayoutEffect(() => {
    if (!isOpen) {
      clearAnimation(ModalContent.current, ModalMain.current);
    } else {
      ModalMain.current.style.display = "block";
      ModalMain.current.classList.add("show");
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      ref={ModalMain}
      className={`modal fade`}
      tabIndex="-1"
      role="dialog"
      onClick={(e) => {
        isCloseMain && VisibleModel(e, ModalContent.current);
      }}
    >
      <div className="modal-dialog" role="document" ref={ModalContent}>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
