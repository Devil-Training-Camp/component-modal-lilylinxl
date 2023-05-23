import React, { ReactNode } from "react";
import "./index.less";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/index";
interface ModalProps {
  children: ReactNode;
  title?: string;
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}
function Modal(props: ModalProps) {
  const { title, open, onOk, onCancel, confirmLoading } = props;

  const handleClose = () => {
    onCancel && onCancel();
  };

  const handleOk = () => {
    onOk && onOk();
  };

  return open ? (
    <div className="modal-content">
      <button className="modal-close" onClick={handleClose}>
        x
      </button>
      <div className="modal-header">
        <div className="modal-header-title">{title}</div>
      </div>
      <div className="modal-body">{props.children}</div>
      <div className="modal-footer">
        <button onClick={handleClose}>取消</button>
        <button onClick={handleOk}>
          {confirmLoading ? (
            <Icon icon={faSpinner} spin={true}/>
          ) : null}
         <span>确定</span> 
        </button>
      </div>
    </div>
  ) : null;
}

export default Modal;
