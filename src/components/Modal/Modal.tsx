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
  const modalWrapRef = useRef<HTMLDivElement>();
  const [clickPosition, setPosition] = useState(null);

  const init = (container: HTMLElement) => {
    const id = new Date().getTime();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('class', 'modal-root');
    modalRoot.dataset.key = id;
    modalRoot.style['--x' as any] = clickPosition ? clickPosition?.x : 0;
    modalRoot.style['--y' as any] = clickPosition ? clickPosition?.y : 0;
    container.appendChild(modalRoot);
    document.body.appendChild(container);

    setModalRoot(modalRoot);
  };
  useEffect(() => {
    //鼠标位置监控，用于动画
    document.addEventListener('click', getPosition, true);
    return () => {
      document.removeEventListener('click', getPosition, true);
    };
  }, []);
  useEffect(() => {
    const container = document.createElement('div');
    const existRoot = document.getElementsByClassName('modal-root');
    const currentWrap = modalWrapRef.current;
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
    handleAnimationClose(onCancel.bind(null, e));
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
  const getPosition = (e: MouseEvent) => {
    if (modalWrapRef.current) return;
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const pageY = e.clientY - centerY;
    const pageX = e.clientX - centerX;
    const new_position = {
      x: `${(pageX / innerWidth) * 100}vw`,
      y: `${(pageY / innerHeight) * 100}vh`,
    };
    setPosition({ ...new_position });
  };

  //动画关闭弹窗
  const handleAnimationClose = (fn: Function | any) => {
    if (!modalWrapRef.current) {
      fn && fn();
      return;
    }
    modalWrapRef.current.classList.add('modal-wrap-hide');
    setTimeout(() => {
      fn && fn();
      modalWrapRef.current &&
        modalWrapRef.current.classList.remove('modal-wrap-hide');
    }, 300);
  };
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
            className={classNames(
              'modal-wrap',
              clickPosition?.x ? '' : 'modal-no-animation'
            )}
            style={{ display: open ? 'block' : 'none' }}
            ref={modalWrapRef}
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
