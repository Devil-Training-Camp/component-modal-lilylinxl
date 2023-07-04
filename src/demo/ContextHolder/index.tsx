import React, { createContext } from 'react';
import Button from '../../components/Button/index';
import Modal from '../../components/Modal/index';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const config = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>
        {(name) => `Reachable: ${name}!`}
      </ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>
        {(name) => `Unreachable: ${name}!`}
      </UnreachableContext.Consumer>
    </>
  ),
};

const ContextHolder: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ReachableContext.Provider value="Light">
      <h4>使用 hooks 获得上下文</h4>
      <Button
        onClick={() => {
          modal.confirm(config);
        }}
      >
        Confirm
      </Button>
      <Button
        onClick={() => {
          modal.warning(config);
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          modal.info(config);
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          modal.error(config);
        }}
      >
        Error
      </Button>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default ContextHolder;
