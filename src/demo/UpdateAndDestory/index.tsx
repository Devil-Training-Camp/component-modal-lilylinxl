import React from 'react';
import Button from '../../components/Button/index';
import Modal from '../../components/Modal/index';

const UpdateAndDestory: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const countDown = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  return (
    <>
      <h4>手动更新和移除</h4>
      <Button onClick={countDown}>Open modal to close in 5s</Button>
      {contextHolder}
    </>
  );
};

export default UpdateAndDestory;
