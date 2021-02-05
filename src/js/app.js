import '../assets/styles/style.scss';
import init from './init';

const props = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  filteredBy: 'All',
  team: ['Maria', 'Bob', 'Alex', 'John', 'All'],
  times: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  calendar: {
    Monday10: {
      isBooked: true,
      name: 'Daily Standup',
      participants: ['Maria', 'Bob', 'Alex'],
    },
  },
  calendarItemsList: [],
};
init(props);
const calendarItems = props.calendarItemsList;
const filteredBy = document.querySelector('#filter');
const newEventBtn = document.querySelector('.add-event-btn');
const membersToAdd = document.querySelectorAll('.member-selected-to-add');
const membersToAddInput = document.querySelector('#add_select');
const membersToAddSpan = document.querySelector('.add_dropdown-selected');
const addModal = document.querySelector('#add-modal');
const addModalError = document.querySelector('.add_modal-error');
const addDropdown = document.querySelector('.add_dropdown');
const addDropdownMain = document.querySelector('.add_dropdown-main');
const errorButton = document.querySelector('#add_modal-error_btn');
const deleteModal = document.querySelector('#delete-modal');
const deleteEventName = document.querySelector('.delete_modal-subtitle');
const noAddBtn = document.querySelector('#cancel_add');
const deleteEventButtons = document.querySelectorAll('.calendar_cell-del_btn');
const addForm = document.querySelector('#add-form');
const newName = document.querySelector('#new_event-name');
const newDay = document.querySelector('.add_day');
const newTime = document.querySelector('.add_time');

let eventToDelete = '';

const fillCalendarTable = () => {
  calendarItems.forEach((dayTime) => {
    const isInFilter = props.filteredBy === 'All' || props.calendar[dayTime].participants.includes(props.filteredBy);
    if (props.calendar[dayTime].isBooked && isInFilter) {
      document.querySelector(`[data-cell=${dayTime}]`).classList.toggle('booked', true);
      document.querySelector(`[data-cell_name=${dayTime}]`).textContent = props.calendar[dayTime].name;
    } else { document.querySelector(`[data-cell=${dayTime}]`).classList.toggle('booked', false); }
  });
};

const deleteEventHandler = (event) => {
  const dayTime = event.target.dataset.del_btn;
  eventToDelete = dayTime;
  deleteEventName.textContent = `"${props.calendar[dayTime].name}" event?`;
  deleteModal.classList.toggle('active', true);
};

const filterHandler = (event) => {
  const updatedProps = props;
  updatedProps.filteredBy = event.target.value;
  fillCalendarTable();
};

const deleteModalHandler = (event) => {
  if (event.target.id === 'delete-modal' || event.target.id === 'no_delete') { deleteModal.classList.toggle('active'); }
  if (event.target.id === 'yes_delete') {
    deleteModal.classList.toggle('active', false);
    document.querySelector(`[data-cell=${eventToDelete}]`).classList.toggle('booked', false);
    props.calendar[eventToDelete] = {
      isBooked: false,
      name: 'hello!',
      participants: [],
    };
    fillCalendarTable();
  }
};

const addDropdownHandler = (event, clear) => {
  const membersList = [];
  if (clear || event.target.value === 'All') {
    const isChecked = clear ? false : event.target.checked;
    membersToAdd.forEach((el) => {
      const copyEl = el;
      copyEl.checked = isChecked;
    });
  }
  membersToAdd.forEach((el) => {
    const selectAll = el.value === 'All' && el;
    if (el.checked && !selectAll) { membersList.push(el.value); }
    if (selectAll) {
      selectAll.checked = membersList.length === (membersToAdd.length - 1);
    }
  });
  membersToAddInput.value = membersList;
  membersToAddSpan.textContent = membersToAddInput.value || 'chose participants';
};

const newEventHandler = () => {
  addModalError.classList.toggle('booked', false);
  addModal.classList.toggle('active');
  newName.value = '';
  addDropdownHandler(0, 1);
};
const addModaltHandler = (event) => {
  if (event.target.id === 'add-modal') { addModal.classList.toggle('active'); }
  if (event.target.dataset.drop !== 'down') { addDropdown.classList.toggle('active', false); }
};

const createEventHandler = (event) => {
  event.preventDefault();
  const membersList = membersToAddInput.value.split(',');
  if (props.calendar[`${newDay.value}${newTime.value}`].isBooked) {
    addModalError.classList.toggle('booked', true);
  } else {
    props.calendar[`${newDay.value}${newTime.value}`] = {
      isBooked: true,
      name: newName.value,
      participants: membersList,
    };
    addModal.classList.toggle('active');
  }
  fillCalendarTable();
};

const setupListeners = () => {
  filteredBy.addEventListener('change', filterHandler);
  addForm.addEventListener('submit', createEventHandler);
  newEventBtn.addEventListener('click', newEventHandler);
  noAddBtn.addEventListener('click', newEventHandler);
  errorButton.addEventListener('click', () => addModalError.classList.toggle('booked', false));
  addDropdownMain.addEventListener('click', () => addDropdown.classList.toggle('active'));
  membersToAddInput.addEventListener('click', (event) => event.stopPropagation());
  addModal.addEventListener('click', addModaltHandler);
  membersToAdd.forEach((el) => el.addEventListener('click', addDropdownHandler));
  deleteModal.addEventListener('click', deleteModalHandler);
  deleteEventButtons.forEach((button) => {
    button.addEventListener('click', deleteEventHandler);
  });
};

setupListeners();
fillCalendarTable();
