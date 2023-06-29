import ReactDOM from 'react-dom';

export const render = (element: any, container: any) => {
  ReactDOM.render(element, container);
};

export const unmount = (container: any) => {
  document.body.removeChild(container);
};
