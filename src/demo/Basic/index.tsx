import React from 'react';
import { useState } from 'react';
import Button from '../../components/Button/index';
import Modal from '../../components/Modal/index';

function Basic() {
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <h4>基本</h4>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        title={'提示信息'}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        aaa
      </Modal>
    </div>
  );
}

export default Basic;
