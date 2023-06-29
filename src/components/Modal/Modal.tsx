import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/index';
import Button from '../Button/index';
import classNames from 'classnames';
import { ModalProps } from './interface';

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
    modalRender,
    closeIcon,
    className,
  } = props;
  const [isLoading, setIsLoading] = useState(confirmLoading);
  const modalClass = classNames('modal', className, {
    'modal-centered': centered,
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

  const contentElement = (
    <section className="modal-content">
      <Button className="modal-close" onClick={handleClose}>
        <Icon icon={faTimes} size="lg" />
      </Button>
      <header className="modal-header">
        <section className="modal-header-title">
          {icon ? (
            <span className="modal-header-title-icon"> {icon} </span>
          ) : null}
          {title}
        </section>
      </header>
      {modalRender ? (
        modalRender(
          <main className="modal-body">{content || props.children}</main>
        )
      ) : (
        <main className="modal-body">{content || props.children}</main>
      )}
      <footer className="modal-footer">
        {footer || footer === null ? (
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
              type={okType || 'primary'}
              onClick={handleOk}
            >
              确定
            </Button>
          </>
        )}
      </footer>
    </section>
  );
  return open ? (
    <>
      <section className="modal-mask"></section>
      <section className="modal-wrap">
        <section
          className={modalClass}
          style={{ ...style, width: typeof Number ? `${width}px` : width }}
        >
          {modalRender ? modalRender(contentElement) : contentElement}
        </section>
      </section>
    </>
  ) : null;
};

export default Modal;
