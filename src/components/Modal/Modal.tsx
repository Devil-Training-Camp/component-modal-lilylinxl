import React, { CSSProperties, ReactNode, useState } from "react";
import "./index.less";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/index";
import Button, { ButtonProps, ButtonType } from "../Button/index";
import classNames from "classnames";

export interface ModalProps {
  children?: ReactNode;
  title?: string;
  open?: boolean;
  onOk?: Function;
  onCancel?: Function;
  confirmLoading?: boolean;
  footer?: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  okText?: string;
  okType?: ButtonType;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  style?: CSSProperties;
  centered?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    open,
    onOk,
    onCancel,
    confirmLoading,
    footer,
    content,
    okButtonProps,
    icon,
    okType,
    style,
    centered,
  } = props;
  const [isLoading, setIsLoading] = useState(confirmLoading);

  const modalClass = classNames("modal", {
    "modal-centered": centered,
  });

  const handleClose = () => {
    if (onCancel) {
      const cancelCb = onCancel();
      if (cancelCb instanceof Promise) {
        setIsLoading(true);
        cancelCb
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      } else {
        onCancel();
      }
    }
  };

  const handleOk = () => {
    if (onOk) {
      const okCb = onOk();
      if (okCb instanceof Promise) {
        setIsLoading(true);
        okCb
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      } else {
        onOk();
      }
    }
  };

  return open ? (
    <>
      <div className="modal-mask"></div>
      <div className="modal-wrap">
        <div className={modalClass} style={style}>
          <div className="modal-content">
            <button className="modal-close" onClick={handleClose}>
              <Icon icon={faTimes} />
            </button>
            <div className="modal-header">
              <div className="modal-header-title">
                {icon ? (
                  <span className="modal-header-title-icon"> {icon} </span>
                ) : null}
                {title}
              </div>
            </div>
            <div className="modal-body">{content || props.children}</div>
            <div className="modal-footer">
              {footer ? (
                footer
              ) : (
                <>
                  <Button onClick={handleClose}>取消</Button>
                  <Button
                    loading={
                      confirmLoading !== undefined ? confirmLoading : isLoading
                    }
                    {...okButtonProps}
                    type={okType || "primary"}
                    onClick={handleOk}
                  >
                    确定
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
