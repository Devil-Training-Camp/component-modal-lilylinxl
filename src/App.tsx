import React from "react";
import "./App.less";
import Button from "./components/Button/index";
import AsyncClose from "./demo/AsyncClose/index";
import Basic from "./demo/Basic/index";
import CustomFooter from "./demo/CustomFooter/index";
import { ConfirmDemo } from "./demo/Confirm/index";
function App() {
  
  return (
    <>
      <Basic />
      <AsyncClose />
      <CustomFooter />
      <ConfirmDemo/>

    </>
  );
}

export default App;
