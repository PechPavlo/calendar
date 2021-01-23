import newElement from './createElement';

const init = () => {
  const body = document.querySelector('body');
  const menuTitle = newElement('h1');
  const container = newElement('div', 'main-container');
  menuTitle.textContent = 'Calendar';
  body.insertAdjacentElement('afterbegin', menuTitle);
  body.insertAdjacentElement('beforeend', container);
};
export default init;
