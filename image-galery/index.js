const galleryImages = document.querySelector('.gallery-images');
const buttonSearch = document.querySelector('.gallery-search-button');
const input = document.querySelector('.gallery-input');
let request = input.value;
let url = '';




const requestData = (event) => {
  event.preventDefault();
  if (document.querySelector('.start-page')) {
    document.querySelector('.start-page').classList.remove('start-page');
  }

  if (galleryImages.innerHTML !== '') {
    galleryImages.innerHTML = '';
  }

  request = input.value;
  url = `https://api.unsplash.com/search/photos?query=${request}&client_id=mEuxiKwGugiYIAqJaAwij45HsH76vvCtXJTxnckJxbw&per_page=30`
  //`https://api.unsplash.com/search/photos?query=${request}&client_id=mEuxiKwGugiYIAqJaAwij45HsH76vvCtXJTxnckJxbw`

  getData();
};

async function getData() {
  
  const res = await fetch(url);
  const data = await res.json();
  showData(data);

}

const showData = (data) => {

  data.results.map(function(num) {
    const div = document.createElement('div');
    div.classList.add('gallery-wrapper-img')
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `${num.urls.regular}`;
    img.alt = `${num.alt_description}`;
    galleryImages.append(div);
    div.append(img);
   }); 
};


buttonSearch.addEventListener('click', requestData);

// по запросу https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo приходит список фото.
// по запросу https://api.unsplash.com/photos/random?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo получаем одно случайное фото.


/* чтобы не обновлялась страница
...function(event) {
  // Откоючает тригер события формы
  event.preventDefault();
  ... some code...
}

у тебя сейчас ветка аудио-плеера, обнови ее
*/

