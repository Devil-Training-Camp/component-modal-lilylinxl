import classNames from "classnames";
import * as React from "react";
import Dialog from "./Modal";
import type { ModalFuncProps } from "./interface";
import Icon from "../Icon/index";
import {
  faTimesCircle,
  faCheckCircle,
  faInfoCircle,
} from "../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import Button from "../Button/index";

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close?: (...args: any[]) => void;
  rootPrefixCls?: string;
  iconPrefixCls?: string;
}

export function ConfirmContent(
  props: ConfirmDialogProps & {
    confirmPrefixCls: string;
  }
) {
  const {
    icon,
    onCancel,
    onOk,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    type,
    footer,
    close,
  } = props;
  // Icon
  let mergedIcon: React.ReactNode = icon;

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  if (!icon && icon !== null) {
    switch (type) {
      case "info":
        mergedIcon = <Icon icon={faInfoCircle} color="#1677ff" size="lg" />;
        break;

      case "success":
        mergedIcon = <Icon icon={faCheckCircle} color="green" size="lg" />;
        break;

      case "error":
        mergedIcon = <Icon icon={faTimesCircle} color="red" size="lg" />;
        break;

      default:
        mergedIcon = <Icon icon={faInfoCircle} color="#faad14" size="lg" />;
    }
  }

  const okType = props.okType || "primary";
  const cancelButton = cancelText && (
    <Button onClick={onCancel} {...cancelButtonProps}>
      {cancelText}
    </Button>
  );

  return (
    <div className={`modal-confirm-body-wrapper`} >
      <div className={`modal-confirm-body`} >
        <div style={{ marginRight: "10px", display: "inline-block" }}>
          {" "}
          {mergedIcon}
        </div>
        {props.title === undefined ? null : (
          <span className={`modal-confirm-title`}>{props.title}</span>
        )}
        <div className={`modal-confirm-content`}  >{props.content}</div>
      </div>
      {footer === undefined ? (
        <div className={`modal-confirm-btns`}  >
          <button onClick={()=>{
            console.log('222')
          }}>222</button>
          {cancelButton}
          {/* { okText ?  */}
          <Button
            type={okType}
            {...okButtonProps}
            onClick={() => {
             console.log('1111', 1111)
              // onOk && onOk();
              // close && close();
            }}
          >
            {okText || "我知道了"}
          </Button>
          {/* // : null   */}
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
    afterClose,
    open,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    direction,
    prefixCls,
    wrapClassName,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
  } = props;

  const confirmPrefixCls = `${prefixCls}-confirm`;

  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  const maskClosable =
    props.maskClosable === undefined ? false : props.maskClosable;

  const classString = classNames(
    confirmPrefixCls,
    `${confirmPrefixCls}-${props.type}`,
    { [`${confirmPrefixCls}-rtl`]: direction === "rtl" },
    props.className
  );

  return (
    <Dialog
      // className={classString}
      // wrapClassName={classNames(
      //   { [`${confirmPrefixCls}-centered`]: !!props.centered },
      //   wrapClassName
      // )}
      // onCancel={() => close?.({ triggerCancel: true })}
      open={open}
      // title=""
      // footer={null}
      // mask={mask}
      // maskClosable={maskClosable}
      // maskStyle={maskStyle}
      // style={style}
      // bodyStyle={bodyStyle}
      // width={width}
      // zIndex={zIndex}
      // afterClose={afterClose}
      // keyboard={keyboard}
      // centered={centered}
      // getContainer={getContainer}
      // closable={closable}
      // closeIcon={closeIcon}
      // modalRender={modalRender}
      // focusTriggerAfterClose={focusTriggerAfterClose}
    >
      aaa
      {/* <ConfirmContent {...props} confirmPrefixCls={confirmPrefixCls} /> */}
    </Dialog>
  );
};

// ConfirmDialog.displayName = "ConfirmDialog";

export default ConfirmDialog;
