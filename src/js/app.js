import '../assets/styles/style.scss';
import init from './init';

// const body = document.querySelector('body');
const efkProp = {
  playMode: false,
  gameStarted: false,
  curLayout: [],
  curLayoutInd: 0,
  playSoundLayout: [],
  playErrors: 0,
  isStart: true,
};
init(efkProp);
