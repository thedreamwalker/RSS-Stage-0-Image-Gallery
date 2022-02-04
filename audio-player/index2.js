const audioBtn = document.querySelector('.control-switcher');

const audio = new Audio();
let isPlay = false;
let playNum = 0;

const tracks = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3', './assets/audio/steffanargus.mp3'];

// запускает плеер и останавливает

function playAudio() {
  audio.src = tracks[playNum];
  
  // проверка флага включена ли музыка
    if (!isPlay) {
      isPlay = true;
      audio.play();
    } else {
      audio.pause();
    }
  }

  audioBtn.addEventListener('click', playAudio);