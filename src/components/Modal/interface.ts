import { CSSProperties, ReactNode } from 'react';
import { ButtonProps, ButtonType } from '../Button/index';

export type DirectionType = 'ltr' | 'rtl' | undefined;
type getContainerFunc = () => HTMLElement;
export interface ModalProps {
  children?: ReactNode;
  title?: string | ReactNode;
  open?: boolean;
  onOk?: Function;
  onCancel?: Function;
  confirmLoading?: boolean;
  footer?: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  okText?: string;
  okType?: ButtonType;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  style?: CSSProperties;
  centered?: boolean;
  width?: number | string;
  className?: string;
  wrapClassName?: string;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  zIndex?: number;
  keyboard?: boolean;
  getContainer?: any;
  closable?: boolean;
  closeIcon?: ReactNode;
  modalRender?: Function;
  focusTriggerAfterClose?: boolean;
  /**
   * Modal 完全打开后的回调
   */
  afterOpen?: () => void;
  /**
   * Modal 完全关闭后的回调
   */
  afterClose?: () => void;
  /**
   * 关闭时销毁 Modal 里的子元素
   * @defaultValue true
   */
  destroyOnClose?: boolean;
  /**
   * 动画名称
   */
  animation?: {
    in?: string;
    out?: string;
  };
}

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  open?: boolean;
  title?: React.ReactNode;
  closable?: boolean;
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  afterClose?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskStyle?: React.CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  footer?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

// 【todo 这块的类型有点复杂
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
export type MousePosition = { x: number; y: number } | null;
