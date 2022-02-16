const memoryField = document.querySelector('.memory-field');
const sizeField = 12;



const cardsSet = num => {
  for (let i = 0; i < num; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-card')
    const cardFront = document.createElement('img');
    cardFront.classList.add('front-face')
    cardFront.src = "./assets/svg/react.svg";
    cardFront.alt = `здесь альт, если будет нужен`;
    const cardBack = document.createElement('img');
    cardBack.classList.add('back-face')
    cardBack.src = "./assets/svg/js-badge.svg";
    cardBack.alt = `здесь альт, если будет нужен`;
    memoryField.append(div);
    div.append(cardFront);
    div.append(cardBack);
  }

};

cardsSet(sizeField);

const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));


//    cardFront.src = `${num.urls.regular}`;