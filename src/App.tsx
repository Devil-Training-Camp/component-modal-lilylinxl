import React from "react";
import "./App.less";
import AsyncClose from "./demo/AsyncClose/index";
import Basic from "./demo/Basic/index";
import CustomFooter from "./demo/CustomFooter/index";
import { ConfirmDemo } from "./demo/Confirm/index";
import CustomPosition from "./demo/CustomPosition/index";
import WidthDemo from "./demo/WidthDemo/index";
import UseModalDemo from "./demo/UseModalDemo/index";
import UpdateAndDestory from "./demo/UpdateAndDestory/index";
import ContextHolder from "./demo/ContextHolder/index";
function App() {
  return (
    <>
      <Basic />
      <AsyncClose />
      <CustomFooter />
      <ConfirmDemo />
      <CustomPosition />
      <WidthDemo />
      <UseModalDemo/>
      <UpdateAndDestory/>
      <ContextHolder/>
    </>
  );
}

export default App;
