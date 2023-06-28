import React from 'react';
import Button from '../../components/Button/index';
import Modal from '../../components/Modal/index';

const { confirm } = Modal;

const destroyAll = () => {
  Modal.destroyAll();
};

const showConfirm = () => {
  for (let i = 0; i < 3; i += 1) {
    setTimeout(() => {
      confirm({
        icon: 'a',
        content: <Button onClick={destroyAll}>Click to destroy all</Button>,
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }, i * 500);
  }
};

const DestroyAll = () => <><h4>销毁确认对话框</h4><Button onClick={showConfirm}>Confirm</Button></>;

export default DestroyAll;