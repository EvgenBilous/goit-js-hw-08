import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');

const LOCAL_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    // data is an object containing properties specific to that event
    localStorage.setItem(LOCAL_KEY, seconds);
    console.log(seconds);
  }, 1000)
);

player.setCurrentTime(localStorage.getItem(LOCAL_KEY) || 0);
