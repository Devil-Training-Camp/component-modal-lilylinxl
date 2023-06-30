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
    className,
    afterClose,
  } = props;
  const [isLoading] = useState(confirmLoading);
  const modalClass = classNames('modal', className, {
    'modal-centered': centered,
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };
  if (!open) {
    afterClose?.();
  }
  const contentElement = (
    <section className="modal-content">
      <Button className="modal-close" onClick={handleCancel}>
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
            <Button onClick={handleCancel} {...cancelButtonProps}>
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
    <div className="modal-root">
      <section className="modal-mask"></section>
      <section className="modal-wrap">
        <section
          className={modalClass}
          style={{ ...style, width: typeof Number ? `${width}px` : width }}
        >
          {modalRender ? modalRender(contentElement) : contentElement}
        </section>
      </section>
    </div>
  ) : null;
};

export default Modal;
