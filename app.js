/* Global Variables */
const cardsContainer = document.querySelector('.game-cards'),
      cards = Array.from(cardsContainer.children),
      triesElement = document.querySelector('.game-info .tries span'),
      duration = 1500;



/* Helper Functions */
function gameOver() {
  const allMatchedCards = document.querySelectorAll('.game-cards .matched');

  if (cardsContainer.childElementCount === allMatchedCards.length || triesElement.innerHTML == 0) {
    const divElement = document.createElement('div');
    divElement.className = 'game-interface';

    if (cardsContainer.childElementCount === allMatchedCards.length) {divElement.innerHTML = 'You Win'}
    if (triesElement.innerHTML == 0) {divElement.innerHTML = 'Game Over'}

    document.documentElement.appendChild(divElement);
  }
}

function stopClicking() {
  cardsContainer.classList.add('stop-clicking');
  setTimeout(() => cardsContainer.classList.remove('stop-clicking'), duration);
}

function checkMatchedCards(firstCard, secondCard) {
  if (firstCard.dataset.index == secondCard.dataset.index + 10 || firstCard.dataset.index == secondCard.dataset.index - 10) {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) - 1;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
    }, duration);
  }
}

function flipCard(selectedCard) {
  selectedCard.classList.add('flipped');
  
  const allFlippedCards = cards.filter(flippedCard => flippedCard.classList.contains('flipped'));
  if (allFlippedCards.length === 2) {
    stopClicking();
    checkMatchedCards(allFlippedCards[0], allFlippedCards[1]);
  }
}

function cardsShuffler() {
  let orderRange = [...Array(cards.length + 1).keys()].slice(1);
  let currentLength = orderRange .length;
  let helperValue;
  
  while (currentLength > 0) {
    let randomNumber = Math.floor(Math.random() * currentLength--);
    
    helperValue = orderRange[currentLength];
    orderRange[currentLength] = orderRange[randomNumber];
    orderRange[randomNumber] = helperValue;
  }

  for (let i=0; i < orderRange.length; i++) {
    cards[i].style.order = orderRange[i];
  }
}



/* Events to handle the app actions */

// [1] Starting game action
document.querySelector('.game-interface span').addEventListener('click', e => {
  const username = prompt("what's your name?");
  username == null || username == '' ? document.querySelector('.name span').innerHTML = 'Player' : document.querySelector('.name span').innerHTML = username;

  cardsShuffler();
  e.target.parentElement.remove();
});

// [2] Flipping Cards action
cards.forEach(card => card.onclick = () => {
  flipCard(card);
  setTimeout(gameOver, duration-5);
});