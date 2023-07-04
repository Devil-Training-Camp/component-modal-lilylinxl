import {
  render as reactRender,
  unmount as reactUnmount,
} from '../../util/index';
import * as React from 'react';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps['type']>,
  ModalFunc
>;

export default function confirm(config: ModalFuncProps) {
  // const container = document.createElement('div');
  const container = document.createDocumentFragment();

  const close = (...args: any[]) => {
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
  };
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
    const modalRoot = document.getElementsByClassName('modal-root');
    if (modalRoot.length) {
      reactUnmount((modalRoot[0] as any).parentNode);
    }
  }

  function render({ okText, cancelText, ...props }: any) {
    // document.body.appendChild(container);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      reactRender(
        <ConfirmDialog {...props} okText={okText} cancelText={cancelText} />,
        container
      );
      if (!props.open) {
        const modalRoot = document.querySelector('.modal-root');
        if (modalRoot) {
          reactUnmount(modalRoot.parentNode);
        }
      }
    });
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
