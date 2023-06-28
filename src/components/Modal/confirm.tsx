import { render as reactRender, unmount as reactUnmount } from '../../util/index';
import * as React from 'react';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;

export default function confirm(config: ModalFuncProps) {

  const container = document.createDocumentFragment();
  let currentConfig = { ...config, close, open: true } as any;
  let timeoutId: NodeJS.Timeout;

  function destroy(...args: any[]) {
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(() => {}, ...args.slice(1));
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }

    reactUnmount(container);
  }

  function render({
    okText,
    cancelText,
    prefixCls: customizePrefixCls,
    getContainer,
    ...props
  }: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      let mergedGetContainer = getContainer;
      if (mergedGetContainer === false) {
        mergedGetContainer = undefined;
      }
      reactRender(
        <ConfirmDialog
          {...props}
          getContainer={mergedGetContainer}
          okText={okText}
          cancelText={cancelText}
        />,
        container,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }

        destroy.apply(this, args);
      },
    };

    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  };
}