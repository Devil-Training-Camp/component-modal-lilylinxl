import React from "react";
import Button from "../../components/Button/index";
import Icon from "../../components/Icon/index";
import Modal from "../../components/Modal/index";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "Do you Want to delete these items?",
    content: "Some descriptions",
    icon: <Icon icon={faExclamationCircle} color="#faad14" size="22px" />,
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const showPromiseConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",
    icon: <Icon icon={faExclamationCircle} color="#faad14" size="sm" />,
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
      }).catch(() => console.log("Oops errors!"));
    },
    onCancel() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log("Oops errors!"));
    },
  });
};

const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const showPropsConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    okButtonProps: {
      disabled: true,
    },
    cancelButtonProps: { disabled: true },
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export const ConfirmDemo = () => (
  <>
    <h4>确认对话框</h4>
    <Button onClick={showConfirm}>Confirm</Button>
    <Button onClick={showPromiseConfirm}>With promise</Button>
    <Button onClick={showDeleteConfirm}>Delete</Button>
    <Button onClick={showPropsConfirm}>With extra props</Button>
  </>
);
