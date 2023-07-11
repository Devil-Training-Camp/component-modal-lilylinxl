import * as React from 'react';
import Dialog from './Modal';
import type { ModalFuncProps } from './interface';
import Icon from '../Icon/index';
import { faExclamationCircle } from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import Button from '../Button/index';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close?: (...args: any[]) => void;
}

export function ConfirmContent(props: ConfirmDialogProps) {
  const {
    icon,
    onCancel,
    onOk,
    close,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    type,
    footer,
  } = props;
  // Icon
  let mergedIcon: React.ReactNode = icon;
  const [isLoading, setIsLoading] = React.useState(false);
  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  if (!icon && icon !== null) {
    mergedIcon = <Icon icon={faExclamationCircle} color="#faad14" size="lg" />;
  }

  const okType = props.okType || 'primary';
  const handleCancel = async () => {
    if (onCancel) {
      setIsLoading(true);
      const result = await onCancel();
      result && result();
      setIsLoading(false);
    }
    close && close();
  };
  const showFooter = type === 'confirm';
  const cancelButton = showFooter && (
    <Button onClick={handleCancel} {...cancelButtonProps}>
      {cancelText || '取消'}
    </Button>
  );

  const handleOk = async () => {
    if (onOk) {
      setIsLoading(true);
      const result = await onOk();
      result && result();
      setIsLoading(false);
    }
    close && close();
  };

  return (
    <div className={`modal-body-wrapper`}>
      <div className={`modal-body`}>
        <div className={`modal-header`}>
          {props.title === undefined ? null : (
            <div className={`modal-header-title`}>
              <span className="modal-header-title-icon">{mergedIcon}</span>
              {props.title}
            </div>
          )}
        </div>
        <div className={`modal-confirm-content`}>{props.content}</div>
      </div>
      {footer === undefined ? (
        <div className={`modal-btns`}>
          {cancelButton}
          <Button
            type={okType}
            {...okButtonProps}
            onClick={handleOk}
            loading={isLoading}
          >
            {showFooter ? okText || '确定' : '知道了'}
          </Button>
        </div>
      ) : (
        footer
      )}
    </div>
  );
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = React.memo((props) => {
  const {
    close,
    zIndex,
    open,
    keyboard,
    centered,
    maskStyle,
    closable = false,
    closeIcon,
    modalRender,
    className,
    afterClose,
  } = props;
  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  const maskClosable =
    props.maskClosable === undefined ? false : props.maskClosable;

  return (
    <Dialog
      className={className}
      onCancel={() => close?.({ triggerCancel: true })}
      open={open}
      title=""
      footer={null}
      mask={mask}
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      style={style}
      width={width}
      zIndex={zIndex}
      keyboard={keyboard}
      centered={centered}
      closable={closable}
      closeIcon={closeIcon}
      modalRender={modalRender}
      afterClose={afterClose}
    >
      <ConfirmContent {...props} />
    </Dialog>
  );
});
ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
