export const newElement = (tag, elClass, elId, elAtr, elAtr1, elAtr2) => {
  const el = document.createElement(tag);
  if (elClass) {
    elClass.split(' ').forEach((arg) => {
      el.classList.add(arg);
    });
  }
  if (elId) {
    el.id = elId;
  }
  if (elAtr) {
    const atr = elAtr.split('=');
    el.setAttribute(atr[0], atr[1]);
  }
  if (elAtr1) {
    const atr = elAtr1.split('=');
    el.setAttribute(atr[0], atr[1]);
  }
  if (elAtr2) {
    const atr = elAtr2.split('=');
    el.setAttribute(atr[0], atr[1]);
  }
  return el;
};

export const createSelect = (data, selectClass, optionClass, selected) => {
  const select = newElement('select', selectClass);
  data.forEach((item) => {
    const option = newElement('option', optionClass, '', `${item === selected
      ? 'selected'
      : ''}`, `value=${item}`);
    let text;
    if (optionClass === 'time') {
      text = `${item}:00`;
    } else {
      text = item === 'All' ? 'All members' : item;
    }
    option.textContent = text;
    select.insertAdjacentElement('beforeend', option);
  });
  return select;
};
