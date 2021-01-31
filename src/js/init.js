import { newElement, createSelect } from './createElement';

const init = (props) => {
  const body = document.querySelector('body');
  const menuTitle = newElement('h1');
  const container = newElement('div', 'main-container');
  const topContainer = newElement('div', 'main_top-container');
  const controls = newElement('div', 'controls');
  const addButton = newElement('button', 'add-event-btn');

  const createTable = () => {
    const tabel = newElement('table', 'calendar');
    const head = newElement('tr', 'calendar-header');
    ['Name', ...props.days].forEach((el) => {
      const td = newElement('th', 'calendar_header-item');
      td.textContent = el;
      head.insertAdjacentElement('beforeend', td);
    });
    tabel.insertAdjacentElement('beforeend', head);
    props.times.forEach((time) => {
      const row = newElement('tr', 'calendar-row');
      [`${time}:00`, ...props.days].forEach((day, ind) => {
        const td = newElement('td', 'calendar_row-item');
        if (ind) {
          td.dataset.time = `${day}${time}`;
        } else { td.textContent = day; }
        row.insertAdjacentElement('beforeend', td);
      });
      tabel.insertAdjacentElement('beforeend', row);
    });
    return tabel;
  };

  const addEventModal = () => {
    const modalWrapper = newElement('div', 'modal_wrapper', 'add-modal');
    const closeButton = newElement('button', 'close-event-btn');
    closeButton.addEventListener('click', () => modalWrapper.classList.toggle('active'));
    closeButton.textContent = 'Close';
    modalWrapper.insertAdjacentElement('beforeend', closeButton);
    return modalWrapper;
  };

  const deleteEventModal = () => {
    const modalWrapper = newElement('div', 'modal_wrapper', 'delete-modal');
    const closeButton = newElement('button', 'close-event-btn');
    closeButton.addEventListener('click', () => modalWrapper.classList.toggle('active'));
    closeButton.textContent = 'Close';
    modalWrapper.insertAdjacentElement('beforeend', closeButton);
    return modalWrapper;
  };

  menuTitle.textContent = 'Calendar';
  addButton.textContent = 'New event +';
  addButton.addEventListener('click', () => document.querySelector('#add-modal').classList.toggle('active'));
  body.insertAdjacentElement('beforeend', addEventModal());
  body.insertAdjacentElement('beforeend', deleteEventModal());
  topContainer.insertAdjacentElement('afterbegin', menuTitle);
  controls.insertAdjacentElement('beforeend', createSelect(props.team, 'members', 'member', 'All'));
  controls.insertAdjacentElement('beforeend', createSelect(props.days, 'days', 'day', 'Monday'));
  controls.insertAdjacentElement('beforeend', createSelect(props.times, 'times', 'time', 10));
  controls.insertAdjacentElement('beforeend', addButton);
  topContainer.insertAdjacentElement('beforeend', controls);
  container.insertAdjacentElement('beforeend', topContainer);
  container.insertAdjacentElement('beforeend', createTable());
  body.insertAdjacentElement('beforeend', container);
};
export default init;
