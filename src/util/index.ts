// import { JSXElementConstructor, ReactElement } from 'react';
import {createRoot} from 'react-dom/client';
import ReactDOM from 'react-dom';

// import { createRoot } from 'react-dom/client';

export const render = (element: any, container: any) => {
  createRoot(container).render(element);
  ReactDOM.render(element, container);
    document.body.appendChild(container);

};

export const unmount = (container: any) => {
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);
};