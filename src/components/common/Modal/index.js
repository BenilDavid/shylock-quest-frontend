import React from "react";
import { Modal as Modals, ModalBody } from "reactstrap";
import "./Modal.scss";
import close from '../../../Assets/close-icon.png';

const Modal = ({
  children,
  isOpen,
  toggle,
  headTitle = "",
  closeIcon = true,
  size = "md",
  className = "modal-bg",
}) => {
  return (
    <Modals isOpen={isOpen} toggle={toggle} size={size} centered={true}>
      {headTitle !== "" && (
        <div className="modal_head">
          <b className="text-center">{headTitle}</b>
          {closeIcon && <img className="cursor-pointer close-btn" src={close} alt="close" onClick={toggle}></img>}
        </div>
      )}
      <ModalBody className={className}>
        {children}
      </ModalBody>
    </Modals>
  );
};

export default Modal;