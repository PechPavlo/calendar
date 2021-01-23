const newElement = (tag, elClass, elId, elAtr, elAtr1, elAtr2) => {
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
export default newElement;
