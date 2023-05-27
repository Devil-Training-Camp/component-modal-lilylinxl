import React from "react";
import "./App.less";
import AsyncClose from "./demo/AsyncClose/index";
import Basic from "./demo/Basic/index";
import CustomFooter from "./demo/CustomFooter/index";
import { ConfirmDemo } from "./demo/Confirm/index";
import CustomPosition from "./demo/CustomPosition/index";
function App() {
  return (
    <>
      <Basic />
      <AsyncClose />
      <CustomFooter />
      <ConfirmDemo />
      <CustomPosition />
    </>
  );
}

export default App;
