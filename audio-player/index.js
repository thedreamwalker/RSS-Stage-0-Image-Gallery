const audioBtn = document.querySelector('.control-switcher');
const nextBtn = document.querySelector('.control-next');
const prevBtn = document.querySelector('.control-previous');
const shuffleBtn = document.querySelector('.control-shuffle');

const textAuthor = document.querySelector('.track-author');
const textName = document.querySelector('.track-name');
const backgroundImage = document.querySelector('.background-img');
const trackImage = document.querySelector('.track-img');

let progress = document.querySelector('.player-progress-bar');
let currentTime = document.querySelector('.player-current-time');

//const audio = new Audio('./assets/audio/beyonce.mp3');
const audio = new Audio();
let isPlay = false;
let isShuffle = false;
let playNum = 0;

// const tracks = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3', './assets/audio/steffanargus.mp3'];
const tracks = [
  {
    name: `Don't Hurt Yourself`,
    author: `Beyonce`,
    src: './assets/audio/beyonce.mp3',
    duration: '3:53',
    img: './assets/img/lemonade.png'
  },
  {
    name: `Don't Start Now`,
    author: `Dua Lipa`,
    src: './assets/audio/dontstartnow.mp3',
    duration: '3:23',
    img: './assets/img/dontstartnow.png'
  },
  {
    name: `Ship in a Bottle`,
    author: `Steffan Argus`,
    src: './assets/audio/steffanargus.mp3',
    duration: '5:14',
    img: './assets/img/shipinabottle.jpg'
  },
  {
    name: `Do I Wanna Know`,
    author: `Arctic Monkeys`,
    src: './assets/audio/arcticmonkeys.mp3',
    duration: '4:33',
    img: './assets/img/arcticmonkeys.jpg'
  },
  {
    name: `Heather`,
    author: `Conan Gray`,
    src: './assets/audio/conangray.mp3',
    duration: '5:14',
    img: './assets/img/conangray.jpg'
  }
];


// начальные параметры
audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".player-track-duration").textContent = formatTime(
      audio.duration
    );
    audio.volume = .25;
  },
  false
);

audio.src = tracks[playNum].src;

//click on timeline to skip around

const timeline = document.querySelector(".player-progress");
timeline.addEventListener("click", e => {
  console.log('Перед ползунком ' + audio.currentTime);
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
  
}, false);

// запускает плеер и останавливает
function playAudio() {
//audio.src = tracks[playNum].src;
textAuthor.innerHTML = tracks[playNum].author;
textName.innerHTML = tracks[playNum].name;

// проверка флага включена ли музыка
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

// следующий трек
const playNext = x => {
  console.log('Нам пришло ' + playNum);
  playNum += 1;
  playNum > tracks.length - 1 ? playNum = 0 : playNum = playNum;

  if (isShuffle) {
    playNum = randomTrack(0, tracks.length);
  }

  if (!isPlay) {
    audioBtn.classList.add('control-switcher-pause');
  }
  audio.src = tracks[playNum].src;
  isPlay = true;
  textAuthor.innerHTML = tracks[playNum].author;
  textName.innerHTML = tracks[playNum].name;
  backgroundImage.src = tracks[playNum].img;
  trackImage.src = tracks[playNum].img;
  audio.play();

  console.log('Текущее значение ' + playNum);
}

// предыдущий трек
const playPrev = x => {
  console.log('Нам пришло ' + playNum);
  playNum -= 1;
  playNum < 0 ? playNum = tracks.length - 1 : playNum = playNum;

  if (isShuffle) {
    playNum = randomTrack(0, tracks.length);
  }

  if (!isPlay) {
    audioBtn.classList.add('control-switcher-pause');
  }

  audio.src = tracks[playNum].src;
  isPlay = true;
  textAuthor.innerHTML = tracks[playNum].author;
  textName.innerHTML = tracks[playNum].name;
  backgroundImage.src = tracks[playNum].img;
  trackImage.src = tracks[playNum].img;
  audio.play();
}

// прогресс воспроизведения

const updateProgress = x => {
  let current = audio.currentTime;
  let percent = (current / audio.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

const formatTime = time => {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

// регулировка звука

const volumeSlider = document.querySelector(".volume-progress");
volumeSlider.addEventListener('click', e => {
  const sliderHeight = window.getComputedStyle(volumeSlider).height;
  console.log('значение оффсета ' + e.offsetY);
  const newVolume = e.offsetY / parseInt(sliderHeight);
  audio.volume = 1 - newVolume;
  document.querySelector(".volume-progress-bar").style.height = newVolume * 100 + '%';
}, false)


shuffleBtn.addEventListener('click', e => {
  shuffleBtn.classList.toggle('is-active');
  if (!isShuffle) {
    isShuffle = true;
  } else {
    isShuffle = false;
  }
}, false)

function randomTrack(min, max){
  const r = Math.random()*(max-min) + min;
  return Math.floor(r);
}


audioBtn.addEventListener('click', playAudio);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
audio.addEventListener('timeupdate', updateProgress);