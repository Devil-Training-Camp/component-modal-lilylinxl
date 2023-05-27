import React from "react";
import ReactDOM from "react-dom/client";
import Modal, { ModalProps } from "./Modal";

const confirm = (config: ModalProps) => {
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  document.body.appendChild(div);
  let currentConfig = { ...config, close, open: true } as any;
  // 如果没有传递onok或者okcancel,点击后关闭弹窗
  // 如果传递了，但是是一个普通函数，执行完函数内容后关闭弹窗
  // 如果传递了，是一个promise对象，那么执行完resolve之后关闭弹窗
  function render({ onOk, onCancel, ...props }: any) {
    const handleCancel = () => {
      if (onCancel) {
        const cancelCb = onCancel();
        if (cancelCb instanceof Promise) {
          return cancelCb;
        } else {
          return new Promise<void>((resolve) => {
            resolve();
          });
        }
      } else {
        close();
      }
    };

    const handleOk = () => {
      if (onOk) {
        const okCb = onOk();
        if (okCb instanceof Promise) {
          return okCb;
        } else {
          return new Promise<void>((resolve) => {
            resolve();
          });
        }
      } else {
        close();
      }
    };

    setTimeout(() => {
      ReactDOM.createRoot(div).render(
        <Modal {...props} onOk={handleOk} onCancel={handleCancel} />
      );
      // root.render(<Modal {...props} onOk={onOk} onCancel={handleCancel} />);
    });
  }
  function close() {
    currentConfig = {
      ...currentConfig,
      open: false,
    };
    render(currentConfig);
  }
  render(currentConfig);

  return {};
};
export default confirm;
