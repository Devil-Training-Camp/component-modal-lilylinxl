import * as React from 'react';
import ConfirmDialog from '../ConfirmDialog';
import type { ModalFuncProps } from '../interface';

export interface HookModalProps {
  afterClose: () => void;
  config: ModalFuncProps;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  { afterClose: hookAfterClose, config },
  ref,
) => {
  const [open, setOpen] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);

  const afterClose = () => {
    hookAfterClose();
    innerConfig.afterClose?.();
  };

  const close = (...args: any[]) => {
    setOpen(false);
    //triggerCancel由confirmDialog的属性传入
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel(() => {}, ...args.slice(1));
    }
  };

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig((originConfig) => ({
        ...originConfig,
        ...newConfig,
      }));
    },
  }));
  return (
    <ConfirmDialog
    rootPrefixCls={''} {...innerConfig}
    close={close}
    open={open}
    afterClose={afterClose}
    okText={innerConfig.okText ||'知道了'}
    direction={innerConfig.direction}
    cancelText={innerConfig.cancelText}    />
  );
};

export default React.forwardRef(HookModal);
