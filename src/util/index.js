// import { JSXElementConstructor, ReactElement } from 'react';
import ReactDOM from 'react-dom';

export const render = (element, container) => {
  ReactDOM.render(element, container);
};

export const unmount = (container) => {
  ReactDOM.unmountComponentAtNode(container);
};