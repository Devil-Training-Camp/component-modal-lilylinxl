import React, { useState, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/index';
import Button from '../Button/index';
import classNames from 'classnames';
import { ModalProps } from './interface';
import { useModalAnimationOrigin } from '../../util/hooks/index';
import styles from './Modal.module.less';
import useAnimationVisible from '../../util/hooks/useAnimationVisible';
import useDestroyOnHidden from '../../util/hooks/useDestroyOnHidden';
import { MountHandler } from './MountHandler';

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
    afterOpen,
    afterClose,
    animation,
    mask = true,
    destroyOnClose = true,
    maskClosable = true,
    onCancel,
    children,
  } = props;
  const [isLoading] = useState(confirmLoading);

  const container = document.body;

  const { transformOrigin, onModalElementRef } = useModalAnimationOrigin(
    open,
    container
  );
  // 动画处理：弹窗关闭触发关闭动画
  const { realVisible, activeAnimation, onAnimationEnd } = useAnimationVisible(
    open,
    afterOpen,
    afterClose
  );
  // 关闭时仍然挂载 Modal 里的子元素
  const shouldMount = useDestroyOnHidden(destroyOnClose, realVisible);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

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
        modalRender(<main className="modal-body">{content || children}</main>)
      ) : (
        <main className="modal-body">{content || children}</main>
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
  const modalElement = shouldMount ? (
    <div
      className={styles.lxlModalRoot}
      style={{ display: realVisible ? undefined : 'none' }}
      tabIndex={-1}
      ref={modalRef}
    >
      {realVisible && (
        <MountHandler modalRef={modalRef} getContainer={() => container} />
      )}
      {mask && (
        <div
          className={classNames(styles.lxlModalMask, {
            [styles.fadeIn]: activeAnimation === 'enter',
            [styles.fadeOut]: activeAnimation === 'leave',
          })}
        />
      )}
      <div
        className={classNames('modal-wrap', {
          [styles.centered]: centered,
        })}
        onClick={maskClosable ? onCancel : undefined}
      >
        <div
          className={classNames('modal', className, {
            [animation?.in ?? styles.animateIn]: activeAnimation === 'enter',
            [animation?.out ?? styles.animateOut]: activeAnimation === 'leave',
          })}
          onAnimationEnd={onAnimationEnd}
          ref={onModalElementRef}
          role="dialog"
          style={{
            transformOrigin,
            width,
            ...style,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contentElement}
        </div>
      </div>
    </div>
  ) : null;
  return modalElement && typeof window !== 'undefined' && container
    ? createPortal(modalElement, container)
    : null;
};

export default memo(Modal);
