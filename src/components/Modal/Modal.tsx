import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
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
    mask = true,
  } = props;
  const [isLoading] = useState(confirmLoading);
  const modalClass = classNames('modal', className, {
    'modal-centered': centered,
  });
  const [modalRoot, setModalRoot] = useState(null);
  const dialogRef = useRef<HTMLDivElement>();
  const init = (container: HTMLElement) => {
    const id = new Date().getTime();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('class', 'modal-root');
    modalRoot.dataset.key = id;
    container.appendChild(modalRoot);
    document.body.appendChild(container);
    setModalRoot(modalRoot);
  };

  useEffect(() => {
    const container = document.createElement('div');
    const existRoot = document.getElementsByClassName('modal-root');
    const currentWrap = dialogRef.current;
    let currentKey = '';
    if (currentWrap) {
      currentKey = currentWrap.parentNode?.dataset.key;
    }
    if (open) {
      if (!existRoot.length) {
        init(container);
      } else {
        const needCreate = Array.from(existRoot).find((item) => {
          const hasInner = item.getElementsByClassName('modal-wrap').length;
          const key = item?.dataset.key;
          if (!hasInner) {
            document.body.removeChild(item.parentNode);
          }
          return key === currentKey;
        });
        needCreate || init(container);
      }
    }
  }, [open]);

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

  return modalRoot
    ? createPortal(
        <>
          {mask ? (
            <section
              className="modal-mask"
              style={{ display: open ? 'block' : 'none' }}
            ></section>
          ) : null}
          <section
            className="modal-wrap"
            style={{ display: open ? 'block' : 'none' }}
            ref={dialogRef}
          >
            <section
              className={modalClass}
              style={{
                ...style,
                width: typeof Number ? `${width}px` : width,
              }}
            >
              {modalRender ? modalRender(contentElement) : contentElement}
            </section>
          </section>
        </>,
        modalRoot
      )
    : null;
};

export default memo(Modal);
