import * as React from 'react';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';
import { createRoot } from 'react-dom/client';
import {
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
} from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import Icon from '../Icon/index';

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
  const root = createRoot(document.createDocumentFragment());
  const close = () => {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        destroy();
      },
      onCancel() {
        config.onCancel?.();
        close();
      },
    };
    render(currentConfig);
  };
  let currentConfig = { ...config, close, open: true } as any;

  function destroy() {
    root.unmount();
  }

  function render({ okText, cancelText, ...props }: any) {
    root.render(<ConfirmDialog {...props} afterClose={destroy} />);
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
    icon: <Icon icon={faInfoCircle} color="#1677ff" size="lg" />,
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
    icon: <Icon icon={faCheckCircle} color="green" size="lg" />,
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
    icon: <Icon icon={faTimesCircle} color="red" size="lg" />,
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  };
}
