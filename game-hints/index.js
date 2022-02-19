const memoryField = document.querySelector('.memory-field');
let numberMove = 0;
let checkedPair = 0;
const sizeField = 12;
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let scores = [];

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
  
  numberMove += 1;
  checkForMatch();
  document.querySelectorAll('.number-move').forEach(move => move.innerHTML = numberMove);
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
     disableCards();
     checkedPair += 1;
     if (checkedPair === sizeField / 2) {
      setTimeout("alert('Ура, победа!');", 1000);
      scores.push(numberMove);
      localStorage.setItem( 'score', JSON.stringify(scores));
    }
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
    }, 1000);   
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

const tableSet = num => {
  getLocalStorage()
  if (scores.length > 10) {
    while (scores.length > 10) {
      scores.splice(0, 1);
    }
  }

  for (let i = 0; i < scores.length; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-result-table-item');
    console.log(scores);
    div.innerHTML = `На игру было затрачено ${scores[i]} ходов`;
    document.querySelector('.memory-result-table').append(div);
  }
};
tableSet();


function getLocalStorage() {
  if (localStorage.getItem('score')) {
      const result = localStorage.getItem('score');
      scores = JSON.parse(result);
      
  }
}  

function setLocalStorage() {
  localStorage.setItem('score', JSON.stringify(scores));
}

window.addEventListener('load', getLocalStorage)  
window.addEventListener('beforeunload', setLocalStorage);

