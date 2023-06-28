import * as React from 'react';
import Dialog from './Modal';
import type { ModalFuncProps } from './interface';
import Icon from '../Icon/index';
import {
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
} from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';
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
    switch (type) {
      case 'info':
        mergedIcon = <Icon icon={faInfoCircle} color="#1677ff" size="lg" />;
        break;

      case 'success':
        mergedIcon = <Icon icon={faCheckCircle} color="green" size="lg" />;
        break;

      case 'error':
        mergedIcon = <Icon icon={faTimesCircle} color="red" size="lg" />;
        break;

      default:
        mergedIcon = <Icon icon={faInfoCircle} color="#faad14" size="lg" />;
    }
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
  const cancelButton = cancelText && (
    <Button onClick={handleCancel} {...cancelButtonProps}>
      {cancelText}
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
    <div className={`modal-confirm-body-wrapper`}>
      <div className={`modal-confirm-body`}>
        <div style={{ marginRight: '10px', display: 'inline-block' }}>
          {mergedIcon}
        </div>
        {props.title === undefined ? null : (
          <span className={`modal-confirm-title`}>{props.title}</span>
        )}
        <div className={`modal-confirm-content`}>{props.content}</div>
      </div>
      {footer === undefined ? (
        <div className={`modal-confirm-btns`}>
          {cancelButton}
          <Button
            type={okType}
            {...okButtonProps}
            onClick={handleOk}
            loading={isLoading}
          >
            {okText || '我知道了'}
          </Button>
        </div>
      ) : (
        footer
      )}
    </div>
  );
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
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
    >
      <ConfirmContent {...props} />
    </Dialog>
  );
};
ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
