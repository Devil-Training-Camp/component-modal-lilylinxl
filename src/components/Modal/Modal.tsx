import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon/index";
import Button from "../Button/index";
import classNames from "classnames";
import { ModalProps } from "./interface";


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
    cancelButtonProps,
    icon,
    okType,
    style,
    centered,
    width,
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
        <div
          className={modalClass}
          style={{ ...style, width: typeof Number ? `${width}px` : width }}
        >
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
              {footer||footer===null ? (
                footer
              ) : (
             <>
                  <Button onClick={handleClose} {...cancelButtonProps}>
                    取消
                  </Button>
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
