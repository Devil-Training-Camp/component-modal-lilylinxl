import React, { useState } from "react";
import Button from "../../components/Button/index";
import Modal from "../../components/Modal/Modal";

const WidthDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h4>自定义宽度</h4>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default WidthDemo;
