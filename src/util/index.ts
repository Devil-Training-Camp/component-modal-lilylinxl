import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

export const render = (element: any, container: any) => {
  // const root = createRoot(container);
  // root.render(element);
  ReactDOM.render(element, container);
};

export const unmount = (container: any) => {
  document.body.removeChild(container);
};
