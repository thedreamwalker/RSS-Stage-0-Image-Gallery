const galleryImages = document.querySelector('.gallery-images');
const buttonSearch = document.querySelector('.gallery-search-button');
const buttonRandom = document.querySelector('.button-random');
const input = document.querySelector('.gallery-input');
let request = input.value;
let url = '';

/* НАЧАЛЬНЫЕ ПАРАМЕТРЫ */

async function startData() {
  
  if (document.querySelector('.start-page')) {
    const img = document.createElement('img');
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=mEuxiKwGugiYIAqJaAwij45HsH76vvCtXJTxnckJxbw&per_page=12&count=10`);
    const data = await res.json();

    console.log(data);
    console.log(typeof(data));
  
    data.map(function(num) {
      dataSet(num);
     }); 
  }
}

startData();

/* ОБРАБОТЧИК */

const requestData = (event) => {
  event.preventDefault();

  cleaner();

  request = input.value;
  url = `https://api.unsplash.com/search/photos?query=${request}&client_id=mEuxiKwGugiYIAqJaAwij45HsH76vvCtXJTxnckJxbw&per_page=30`

  getData();
};

async function getData() {
  
  const res = await fetch(url);
  const data = await res.json();

        console.log(data);
        console.log(typeof(data));

    if (data.results) {
      showData(data);
    } else {
      data.map(function(num) {
        dataSet(num);
       }); 
    }
};

const showData = (data) => {
  data.results.map(function(num) {
    dataSet(num);
   }); 
};

const dataSet = num => {
  const div = document.createElement('div');
    div.classList.add('gallery-wrapper-img')
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `${num.urls.regular}`;
    img.alt = `${num.alt_description}`;
    galleryImages.append(div);
    div.append(img);
};

const randomData = (event) => {
  event.preventDefault();

  cleaner();

  console.log(request);

  request = input.value;
  url = `https://api.unsplash.com/photos/random?query=${request}&client_id=mEuxiKwGugiYIAqJaAwij45HsH76vvCtXJTxnckJxbw&per_page=30&count=30`
  
  getData();
};

const cleaner = () => {
  if (document.querySelector('.start-page')) {
    document.querySelector('.start-page').classList.remove('start-page');
  }
  
  if (document.querySelector('.start-gallery')) {
    document.querySelector('.start-gallery').classList.remove('start-gallery');
  }

  if (galleryImages.innerHTML !== '') {
    galleryImages.innerHTML = '';
  }
}


buttonSearch.addEventListener('click', requestData);
buttonRandom.addEventListener('click', randomData);