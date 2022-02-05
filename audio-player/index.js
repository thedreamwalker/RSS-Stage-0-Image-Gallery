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
  }
];


// начальные параметры
audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".player-track-duration").textContent = formatTime(
      audio.duration
    );
    audio.volume = .75;
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

  console.log(tracks.length);

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



/*

player - у меня audio
var audioPlayer = document.querySelector('.green-audio-player');
var playPause = audioPlayer.querySelector('#playPause');
var playpauseBtn = audioPlayer.querySelector('.play-pause-btn');
var loading = audioPlayer.querySelector('.loading');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var volumeBtn = audioPlayer.querySelector('.volume-btn');
var volumeControls = audioPlayer.querySelector('.volume-controls');
var volumeProgress = volumeControls.querySelector('.slider .progress');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('.current-time');
var totalTime = audioPlayer.querySelector('.total-time');
var speaker = audioPlayer.querySelector('#speaker');

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
  if(!isDraggable(event.target)) return false;
  
  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;
  
  this.addEventListener('mousemove', window[handleMethod], false);

  window.addEventListener('mouseup', () => {
    currentlyDragged = false;
    window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);  
});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('volumechange', updateVolume);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function(){
  playPause.attributes.d.value = "M18 12L0 24V0";
  player.currentTime = 0;
});

volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('open');
  volumeControls.classList.toggle('hidden');
})

window.addEventListener('resize', directionAware);

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

directionAware();

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if(direction == 'horizontal') {
    var min = rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;   
    if(event.clientX < min || event.clientX > max) return false;
  } else {
    var min = rect.top;
    var max = min + rangeBox.offsetHeight; 
    if(event.clientY < min || event.clientY > max) return false;  
  }
  return true;
}

ГОТОВО

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

function updateVolume() {
  volumeProgress.style.height = player.volume * 100 + '%';
  if(player.volume >= 0.5) {
    speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';  
  } else if(player.volume < 0.5 && player.volume > 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
  } else if(player.volume <= 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
  }
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
  let rect = slider.getBoundingClientRect();
  let K = 0;
  if(slider.dataset.direction == 'horizontal') {
    
    let offsetX = event.clientX - slider.offsetLeft;
    let width = slider.clientWidth;
    K = offsetX / width;    
    
  } else if(slider.dataset.direction == 'vertical') {
    
    let height = slider.clientHeight;
    var offsetY = event.clientY - rect.top;
    K = 1 - offsetY / height;
    
  }
  return K;
}

function rewind(event) {
  if(inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function changeVolume(event) {
  if(inRange(event)) {
    player.volume = getCoefficient(event);
  }
}
ГОТОВО
function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

function togglePlay() {
  if(player.paused) {
    playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
    player.play();
  } else {
    playPause.attributes.d.value = "M18 12L0 24V0";
    player.pause();
  }  
}

function makePlay() {
  playpauseBtn.style.display = 'block';
  loading.style.display = 'none';
}

function directionAware() {
  if(window.innerHeight < 250) {
    volumeControls.style.bottom = '-54px';
    volumeControls.style.left = '54px';
  } else if(audioPlayer.offsetTop < 154) {
    volumeControls.style.bottom = '-164px';
    volumeControls.style.left = '-3px';
  } else {
    volumeControls.style.bottom = '52px';
    volumeControls.style.left = '-3px';
  }
}

*/

/* ВТОРОЙ ПЛЕЕР ЧЕРНО-ОРАНЖЕВЫЙ


// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
);
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);


СДЕЛАНО
audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);

СДЕЛАНО
//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

УКРАЛА ИЗ ДРУГОГО
//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

*/