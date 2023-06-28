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
import DraggableDemo from "./demo/Draggable/index";
import StaticFuncDemo from "./demo/StaticFuncDemo/index";
import DestroyAll from "./demo/DestroyAll/index";
function App() {
  return (
    <div id='app'>
      <Basic />
      <AsyncClose />
      <CustomFooter />
      <ConfirmDemo />
      <CustomPosition />
      <WidthDemo />
      <UseModalDemo/>
      <UpdateAndDestory/>
      <ContextHolder/>
      <DraggableDemo/>
      <StaticFuncDemo/>
      <DestroyAll/>
    </div>
  );
}

export default App;
