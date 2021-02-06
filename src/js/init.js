import { newElement, createSelect } from './createElement';

const init = (props) => {
  const body = document.querySelector('body');
  const menuTitle = newElement('h1');
  const container = newElement('div', 'main-container');
  const topContainer = newElement('div', 'main_top-container');
  const controls = newElement('div', 'controls');
  const addButton = newElement('button', 'add-event-btn');

  const newProps = props;
  const localProps = localStorage.pechPavloCalendar;

  const createInitCalendar = () => {
    const { calendarItemsList } = props;
    props.days.forEach((day) => {
      props.times.forEach((time) => {
        calendarItemsList.push(`${day}${time}`);
        const calendarItem = props.calendar;
        calendarItem[`${day}${time}`] = {
          isBooked: false,
          name: ' ',
          participants: [],
        };
      });
    });
  };

  if (localProps && JSON.parse(localProps).release === props.release) {
    newProps.calendar = JSON.parse(localProps).calendar;
    newProps.calendarItemsList = JSON.parse(localProps).calendarItemsList;
  } else { createInitCalendar(); }

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
          const cellContainer = newElement('div', 'calendar_cell', '', `data-cell=${day}${time}`);
          const cellSpan = newElement('span', 'calendar_cell-name', '', `data-cell_name=${day}${time}`);
          const delBtn = newElement('button', 'calendar_cell-del_btn', '', `data-del_btn=${day}${time}`);
          const cellParticipants = newElement('ul', 'calendar_cell_participants');
          // const cellParticipant = newElement('li', 'calendar_cell_participant');
          cellContainer.insertAdjacentElement('beforeend', cellSpan);
          cellContainer.insertAdjacentElement('beforeend', delBtn);
          td.insertAdjacentElement('beforeend', cellContainer);
          td.insertAdjacentElement('beforeend', cellParticipants);
          td.dataset.time = `${day}${time}`;
        } else { td.textContent = day; }
        row.insertAdjacentElement('beforeend', td);
      });
      tabel.insertAdjacentElement('beforeend', row);
    });
    return tabel;
  };

  // const createFilterDropdown = () => {
  //   const dropdown = newElement('div', 'filter_dropdown');
  //   const span = newElement('span', 'filter_dropdown-selected');
  //   const dropdownContent = newElement('div', 'filter_dropdown-content');
  //   props.team.forEach((member) => {
  //     const label = newElement('label', 'member');
  //     const input = newElement('input',
  //       'member-selected',
  //       `by-${member}`,
  //       'type=checkbox',
  //       `value=${member}`);
  //     if (props.filteredBy.includes('All')) {
  //       input.setAttribute('checked', '');
  //     } else {
  //       input.toggleAttribute('checked', props.filteredBy.includes(member));
  //     }
  //     label.textContent = member === 'All' ? 'All members' : member;
  //     label.insertAdjacentElement('beforeend', input);
  //     dropdownContent.insertAdjacentElement('beforeend', label);
  //   });
  //   span.textContent = props.filteredBy.includes('All')
  //   ? 'All members'
  //   : props.filteredBy.join(', ');
  //   dropdown.insertAdjacentElement('beforeend', span);
  //   dropdown.insertAdjacentElement('beforeend', dropdownContent);
  //   return dropdown;
  // };

  const createFilter = () => {
    const filter = createSelect(props.team, 'filtered-by', 'member', 'All');
    filter.setAttribute('id', 'filter');
    return filter;
  };

  const createAddDropdown = () => {
    const dropdown = newElement('div', 'add_dropdown', '', 'data-drop=down');
    const dropdownMain = newElement('div', 'add_dropdown-main', '', 'data-drop=down');
    const span = newElement('span', 'add_dropdown-selected', '', 'data-drop=down');
    const fakeSelect = newElement('select', 'add_dropdown-fake_select', '', 'data-drop=down');
    const mainInput = newElement('input', '', 'add_select', 'form=add-form', 'required=');
    mainInput.setAttribute('data-drop', 'down');
    const dropdownContent = newElement('div', 'add_dropdown-content', '', 'data-drop=down');
    props.team.forEach((member) => {
      const label = newElement('label', 'member', '', 'data-drop=down');
      const input = newElement('input', 'member-selected-to-add', '', 'type=checkbox', `value=${member}`, 'data-drop=down');
      label.textContent = member === 'All' ? 'All members' : member;
      label.insertAdjacentElement('beforeend', input);
      dropdownContent.insertAdjacentElement('beforeend', label);
    });
    span.textContent = 'choose participiants';
    dropdownMain.insertAdjacentElement('beforeend', span);
    dropdownMain.insertAdjacentElement('beforeend', mainInput);
    dropdownMain.insertAdjacentElement('beforeend', fakeSelect);
    dropdown.insertAdjacentElement('beforeend', dropdownMain);
    dropdown.insertAdjacentElement('beforeend', dropdownContent);
    return dropdown;
  };

  const addEventForm = () => {
    const form = newElement('form', '', 'add-form');
    const formInput = newElement('input', 'add_form-name', 'new_event-name', 'placeholder=Event name', 'required=');
    const members = createAddDropdown();
    const name = newElement('label', 'add_lable');
    const participants = newElement('label', 'add_lable', '', 'for=add_select');
    const day = newElement('label', 'add_lable');
    const time = newElement('label', 'add_lable');
    name.textContent = 'Name of the event:';
    participants.textContent = 'Participants:';
    day.textContent = 'Day:';
    time.textContent = 'Time:';
    participants.insertAdjacentElement('beforeend', members);
    day.insertAdjacentElement('beforeend', createSelect(props.days, 'add_day', 'day', 'Monday'));
    time.insertAdjacentElement('beforeend', createSelect(props.times, 'add_time', 'time', 10));
    name.insertAdjacentElement('beforeend', formInput);
    form.insertAdjacentElement('beforeend', name);
    form.insertAdjacentElement('beforeend', participants);
    form.insertAdjacentElement('beforeend', day);
    form.insertAdjacentElement('beforeend', time);
    return form;
  };

  const addEventModal = () => {
    const modalWrapper = newElement('div', 'modal_wrapper', 'add-modal');
    const modal = newElement('div', 'add_modal-container');
    const errorDiv = newElement('div', 'add_modal-error');
    const errorSpan = newElement('span');
    const errorButton = newElement('button', '', 'add_modal-error_btn');
    const modalFooter = newElement('div', 'add_modal-footer');
    const noButton = newElement('button', 'cancel_add_event-btn', 'cancel_add');
    const yesButton = newElement('button', 'create_add_event-btn', 'create_add', 'form=add-form');
    errorSpan.textContent = 'Failed to create an event. Time slot is already booked.';
    noButton.textContent = 'Cancel';
    yesButton.textContent = 'Create';
    modalFooter.insertAdjacentElement('beforeend', noButton);
    modalFooter.insertAdjacentElement('beforeend', yesButton);
    errorDiv.insertAdjacentElement('beforeend', errorSpan);
    errorDiv.insertAdjacentElement('beforeend', errorButton);
    modal.insertAdjacentElement('beforeend', errorDiv);
    modal.insertAdjacentElement('beforeend', addEventForm());
    modal.insertAdjacentElement('beforeend', modalFooter);
    modalWrapper.insertAdjacentElement('beforeend', modal);
    return modalWrapper;
  };

  const deleteEventModal = () => {
    const modalWrapper = newElement('div', 'modal_wrapper', 'delete-modal');
    const modal = newElement('div', 'delete_modal-container');
    const modalTitle = newElement('span', 'delete_modal-title');
    const modalSubTitle = newElement('span', 'delete_modal-subtitle');
    const modalFooter = newElement('div', 'delete_modal-footer');
    const noButton = newElement('button', 'no_delete_event-btn', 'no_delete');
    const yesButton = newElement('button', 'yes_delete_event-btn', 'yes_delete');
    modalTitle.textContent = 'Are you sure you want to delete';
    modalSubTitle.textContent = '"This" event?';
    noButton.textContent = 'No';
    yesButton.textContent = 'Yes';
    modalFooter.insertAdjacentElement('beforeend', noButton);
    modalFooter.insertAdjacentElement('beforeend', yesButton);
    modal.insertAdjacentElement('beforeend', modalTitle);
    modal.insertAdjacentElement('beforeend', modalSubTitle);
    modal.insertAdjacentElement('beforeend', modalFooter);
    modalWrapper.insertAdjacentElement('beforeend', modal);
    return modalWrapper;
  };

  menuTitle.textContent = 'Calendar';
  addButton.textContent = 'New event +';
  body.insertAdjacentElement('beforeend', addEventModal());
  body.insertAdjacentElement('beforeend', deleteEventModal());
  topContainer.insertAdjacentElement('afterbegin', menuTitle);
  controls.insertAdjacentElement('beforeend', createFilter());
  // controls.insertAdjacentElement('beforeend', createFilterDropdown());
  controls.insertAdjacentElement('beforeend', addButton);
  topContainer.insertAdjacentElement('beforeend', controls);
  container.insertAdjacentElement('beforeend', topContainer);
  container.insertAdjacentElement('beforeend', createTable());
  body.insertAdjacentElement('beforeend', container);
};
export default init;