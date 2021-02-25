import '../assets/styles/style.scss';
import init from './init';
import { newElement } from './createElement';

const props = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  filteredBy: 'All',
  release: '1.1',
  team: ['Maria', 'Bob', 'Alex', 'John'],
  // team: ['Maria', 'Bob', 'Alex', 'John', 'All'],
  currentUser: 'Bob',
  isAdmin: true,
  times: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  calendar: {},
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
const authorizeModal = document.querySelector('#authorize-modal');
const autorizedBy = document.querySelector('.autorized-by');
const deleteEventName = document.querySelector('.delete_modal-subtitle');
const noAddBtn = document.querySelector('#cancel_add');
const deleteEventButtons = document.querySelectorAll('.calendar_cell-del_btn');
const calendarCells = document.querySelectorAll('[data-time]');
// const calendarCells = document.querySelectorAll('.calendar_cell');
const addForm = document.querySelector('#add-form');
const newName = document.querySelector('#new_event-name');
const newDay = document.querySelector('.add_day');
const newTime = document.querySelector('.add_time');

let eventToDelete = '';
let activeDataTime = '';
let currentDataTime = '';
// let nextDataTime = '';
let isFree = false;

const saveStorage = () => {
  localStorage.pechPavloCalendar = JSON.stringify(props);
};

const setPermissions = () => {
  newEventBtn.classList.toggle('hidden', !props.isAdmin);
  deleteEventButtons.forEach((button) => {
    button.classList.toggle('hidden', !props.isAdmin);
  });
  calendarCells.forEach((cell) => {
    cell.toggleAttribute('draggable', props.isAdmin);
  });
};

const authorization = () => {
  props.currentUser = autorizedBy.value;
  props.isAdmin = false;
  console.log(props.currentUser);
};

const fillCalendarTable = () => {
  calendarItems.forEach((dayTime) => {
    const isInFilter = props.filteredBy === 'All' || props.calendar[dayTime].participants.includes(props.filteredBy);
    if (props.calendar[dayTime].isBooked && isInFilter) {
      const cellParticipantsList = document.querySelector(`[data-cell_list=${dayTime}]`);
      cellParticipantsList.innerHTML = '';
      document.querySelector(`[data-cell=${dayTime}]`).classList.toggle('booked', true);
      document.querySelector(`[data-cell_name=${dayTime}]`).textContent = props.calendar[dayTime].name;
      props.calendar[dayTime].participants.forEach((participant) => {
        const cellParticipant = newElement('li', 'calendar_cell_participant');
        cellParticipant.textContent = participant;
        cellParticipantsList.appendChild(cellParticipant);
      });
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
      name: ' ',
      participants: [],
    };
    fillCalendarTable();
    saveStorage();
  }
};

const authorizeModalHandler = (event) => {
  if (event.target.id === 'authorize-modal') { authorizeModal.classList.toggle('active'); }
  if (event.target.id === 'confirm_user') {
    authorization();
    authorizeModal.classList.toggle('active', false);
    // document.querySelector(`[data-cell=${eventToDelete}]`).classList.toggle('booked', false);
    // props.calendar[eventToDelete] = {
    //   isBooked: false,
    //   name: ' ',
    //   participants: [],
    // };
    // fillCalendarTable();
    saveStorage();
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
const dragendHandler = (event) => {
  event.currentTarget.classList.remove('selected');
  if (isFree) {
    const movedTo = props.calendar[currentDataTime];
    const movedFrom = props.calendar[activeDataTime];
    movedTo.name = movedFrom.name;
    movedTo.participants = movedFrom.participants;
    movedTo.isBooked = true;
    props.calendar[activeDataTime] = {
      isBooked: false,
      name: ' ',
      participants: [],
    };
    fillCalendarTable();
    saveStorage();
  }
};
const dragoverHandler = (event) => {
  event.preventDefault();
  isFree = false;
  const currentElement = event.target;
  currentDataTime = currentElement.dataset.time;
  if (!currentDataTime || !props.calendar[activeDataTime].isBooked) return;
  const { isBooked } = props.calendar[currentDataTime];
  const isMoveble = activeDataTime !== currentDataTime && !isBooked;
  if (!isMoveble) return;
  isFree = true;
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
  saveStorage();
};

const setupListeners = () => {
  filteredBy.addEventListener('change', filterHandler);
  addForm.addEventListener('submit', createEventHandler);
  newEventBtn.addEventListener('click', newEventHandler);
  noAddBtn.addEventListener('click', newEventHandler);
  errorButton.addEventListener('click', () => addModalError.classList.toggle('booked', false));
  addDropdownMain.addEventListener('click', (event) => {
    addDropdown.classList.toggle('active');
    event.preventDefault();
  });
  addModal.addEventListener('click', addModaltHandler);
  calendarCells.forEach((cell) => {
    cell.addEventListener('mousedown', (event) => {
      event.currentTarget.classList.add('selected');
    });
    cell.addEventListener('mouseup', (event) => {
      event.currentTarget.classList.remove('selected');
    });
    cell.addEventListener('mouseleave', (event) => {
      event.currentTarget.classList.remove('selected');
    });
    cell.addEventListener('dragstart', (event) => {
      event.currentTarget.classList.add('selected');
      activeDataTime = event.currentTarget.dataset.time;
    });
    cell.addEventListener('dragleave', () => { isFree = false; });
    cell.addEventListener('dragend', dragendHandler);
    cell.addEventListener('dragover', dragoverHandler);
  });
  membersToAdd.forEach((el) => el.addEventListener('click', addDropdownHandler));
  deleteModal.addEventListener('click', deleteModalHandler);
  authorizeModal.addEventListener('click', authorizeModalHandler);
  deleteEventButtons.forEach((button) => {
    button.addEventListener('click', deleteEventHandler);
  });
};

setupListeners();
fillCalendarTable();
authorization();
setPermissions();
saveStorage();
