import type { ModalStaticFunctions } from './confirm';
import confirm, {
  withConfirm,
  withError,
  withInfo,
  withSuccess,
  withWarn,
} from './confirm';
import destroyFns from './destroyFns';
import type { ModalFuncProps } from './interface';
import OriginModal from './Modal';
import useModal from './useModal/index';
import "./index.less";

export type { ModalFuncProps,  ModalProps } from './interface';

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    useModal: typeof useModal;
    destroyAll: () => void;
  };

const Modal = OriginModal as ModalType;

Modal.useModal = useModal;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
