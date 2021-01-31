import '../assets/styles/style.scss';
import init from './init';

// const body = document.querySelector('body');
const props = {
  team: ['Maria', 'Bob', 'Alex', 'John', 'All'],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  times: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  calendar: {
    Monday10: {
      isFree: false,
      name: 'Daily Standup',
      participants: ['Maria', 'Bob', 'Alex'],
    },
  },
};
init(props);
