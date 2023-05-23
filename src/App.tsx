import React from 'react'
import { useState } from 'react'
import './App.less'
import Modal from './components/Modal/index'

function App() {
const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
const [modalText, setModalText] = useState('Content of the modal');
// const handleOk  = () =>{
//   setOpen(false)
// }
// const handleCancel  = () =>{
//   setOpen(false)
// }
const handleOpen = () => {
  setOpen(true)

}
const handleOk = () => {
  setModalText('The modal will be closed after two seconds');
  setConfirmLoading(true);
  setTimeout(() => {
    setOpen(false);
    setConfirmLoading(false);
  }, 2000);
};

const handleCancel = () => {
  console.log('Clicked cancel button');
  setOpen(false);
};
  return (
    <>
      <button onClick={handleOpen}>Switch</button>
      {/* <Modal open={open} title={'提示信息'} onOk={handleOk} onCancel={handleCancel}>aaa</Modal> */}
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default App
