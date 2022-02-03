const audioBtn = document.querySelector('.control-switcher');
const nextBtn = document.querySelector('.control-next');
const prevBtn = document.querySelector('.control-previous');
const audio = new Audio();
let isPlay = false;
let playNum = 0;
let currentTime;

const tracks = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3', './assets/audio/steffanargus.mp3'];

function playAudio() {
audio.src = tracks[playNum];
audio.currentTime = 0;

console.log(playNum);

  if (!isPlay) {
    isPlay = true;
    audioBtn.classList.add('control-switcher-pause');
    audio.play();
  } else {
    isPlay = false;
    audioBtn.classList.remove('control-switcher-pause');
    audio.pause();
  }
}

const playNext = x => {
  console.log('Нам пришло ' + playNum);
  playNum += 1;
  playNum > tracks.length - 1 ? playNum = 0 : playNum = playNum;

  if (!isPlay) {
    audioBtn.classList.add('control-switcher-pause');
  }
  audio.src = tracks[playNum];
  isPlay = true;
  audio.play();
}

const playPrev = x => {
  console.log('Нам пришло ' + playNum);
  playNum -= 1;
  playNum < 0 ? playNum = tracks.length - 1 : playNum = playNum;

  if (!isPlay) {
    audioBtn.classList.add('control-switcher-pause');
  }

  audio.src = tracks[playNum];
  isPlay = true;
  audio.play();
}

audioBtn.addEventListener('click', playAudio);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);