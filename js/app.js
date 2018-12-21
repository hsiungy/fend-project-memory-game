/*
 * Create a list that holds all of your cards
 */
var allCards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var moves = document.querySelector('.moves');
var numMoves = 0;
var stars = document.querySelector('.stars');


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame() {
  var cardDeck = document.querySelector('.deck');
  var allCardsHTML = [];
  var shuffledCards = shuffle(allCards);
  shuffledCards.forEach(function(card) {
    var createCard = `<li class="card" data-icon="${card}"><i class="fa ${card}"></i></li>`
    allCardsHTML.push(createCard);
  });
  cardDeck.innerHTML = allCardsHTML.join('');
  moves.innerText = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><li><i class="fa fa-star"></i></li><li><li><i class="fa fa-star"></i></li><li>`

}
startGame();

var cards = document.querySelectorAll('.card');
var openedCards = [];

cards.forEach(function(card) {
  card.addEventListener('click', function(event) {
    numMoves += 1;
    if (numMoves == 10) {
      console.log("numMoves = 10");
      stars.removeChild(stars.childNodes[0]);
    } else if (numMoves == 20) {
      stars.removeChild(stars.childNodes[0]);
    }

    if (!(card.classList.contains('open') || card.classList.contains('show') || card.classList.contains('match'))) {
      openedCards.push(card);
      card.classList.add('open', 'show');

      if (openedCards.length == 2) {
        if (openedCards[0].dataset.icon == openedCards[1].dataset.icon) {
          openedCards.forEach(function(openedCard) {
            openedCard.classList.add('match');
            openedCard.classList.remove('open', 'show');
          })
          openedCards = [];
        } else {
          setTimeout(function() {
            openedCards.forEach(function(openedCard) {
              openedCard.classList.remove('open', 'show');
            })
            openedCards = [];
          }, 1500)
        }
      }
    }
    moves.innerText = numMoves;
  })
});

var restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function(event) {
  startGame();
})
