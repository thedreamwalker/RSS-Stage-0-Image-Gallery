const memoryField = document.querySelector('.memory-field');
const sizeField = 12;
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

const allCards = [
  {
    name: 'react',
    src: './assets/svg/react.svg'
  },
  {
    name: 'react',
    src: './assets/svg/react.svg'
  },
  {
    name: 'angular',
    src: './assets/svg/angular.svg'
  },
  {
    name: 'angular',
    src: './assets/svg/angular.svg'
  },
  {
    name: 'aurelia',
    src: './assets/svg/aurelia.svg'
  },
  {
    name: 'aurelia',
    src: './assets/svg/aurelia.svg'
  },
  {
    name: 'backbone',
    src: './assets/svg/backbone.svg'
  },
  {
    name: 'backbone',
    src: './assets/svg/backbone.svg'
  },
  {
    name: 'ember',
    src: './assets/svg/ember.svg'
  },
  {
    name: 'ember',
    src: './assets/svg/ember.svg'
  },
  {
    name: 'vue',
    src: './assets/svg/vue.svg'
  },
  {
    name: 'vue',
    src: './assets/svg/vue.svg'
  }
];



const cardsSet = num => {
  for (let i = 0; i < num; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-card')
    const cardFront = document.createElement('img');
    cardFront.classList.add('front-face')
    cardFront.src = allCards[i].src;
    div.setAttribute("data-name", allCards[i].name);
    const cardBack = document.createElement('img');
    cardBack.classList.add('back-face')
    cardBack.src = "./assets/svg/js-badge.svg";
    memoryField.append(div);
    div.append(cardFront);
    div.append(cardBack);
  }

};

cardsSet(sizeField);

const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  
  checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
     disableCards();
    return;
    }

    unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1500);   
}

cards.forEach(card => card.addEventListener('click', flipCard));

(function shuffle() {
  cards.forEach(card => {
  let ramdomPos = Math.floor(Math.random() * sizeField);
  card.style.order = ramdomPos;
  });
})();


function resetBoard() {
  [isFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}