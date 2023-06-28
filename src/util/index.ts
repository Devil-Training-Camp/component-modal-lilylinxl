import { createRoot } from 'react-dom/client';
import ReactDOM, { createPortal } from 'react-dom';

export const render = (element: any, container: any) => {
  // createRoot(container).render(element);
  createPortal(element, container);
  // document.body.appendChild(container);
};

export const unmount = (container: any) => {
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);
};
