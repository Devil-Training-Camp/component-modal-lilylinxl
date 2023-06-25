import React from 'react';
import Button from '../../components/Button/index';
import Modal from '../../components/Modal/index';

const UseModalDemo= () => {
  const [modal] = Modal.useModal();//1

  const countDown = () => {
    let secondsToGo = 100;

    modal.success({//2
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });

    // const timer = setInterval(() => {
    //   secondsToGo -= 1;
    //   instance.update({//3
    //     content: `This modal will be destroyed after ${secondsToGo} second.`,
    //   });
    // }, 1000);

    // setTimeout(() => {
    //   clearInterval(timer);
    //   instance.destroy();//4
    // }, secondsToGo * 1000);
  };

  return (
    <div>
      <Button onClick={countDown}>Open modal to close in 5s</Button>
  {/* {contextHolder} */}
  </div>
    );
};

export default UseModalDemo;