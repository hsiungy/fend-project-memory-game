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
var stars = document.querySelector('.stars');
var numMoves = 0;

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

  numMoves = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

  moves.innerText = "0";
  document.querySelector('.timer').innerText = "00:00:00";

  timer = setInterval(clock, 1000);
  sec = 0;
  min = 0;
  hr = 0;

  var cards = document.querySelectorAll('.card');
  var openedCards = [];
  var numMatchedPairs = 0;
  var numStars = 3;

  cards.forEach(function(card) {
    card.addEventListener('click', function(event) {
      numMoves += 1;
      if (numMoves == 16) {
        stars.removeChild(stars.childNodes[0]);
        numStars -= 1;
      } else if (numMoves == 32) {
        stars.removeChild(stars.childNodes[0]);
        numStars -= 1;
      }

      if (!(card.classList.contains('open') || card.classList.contains('show') || card.classList.contains('match'))) {
        openedCards.push(card);
        card.classList.add('open', 'show');

        if (openedCards.length == 2) {
          if (openedCards[0].dataset.icon == openedCards[1].dataset.icon) {
            openedCards.forEach(function(openedCard) {
              openedCard.classList.add('match');
              openedCard.classList.remove('open', 'show');
            });
            numMatchedPairs += 1;
            if (numMatchedPairs == 8) {
              showCongrats(numMoves, numStars, document.querySelector('.timer').innerText);
            }
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
}
startGame();

function showCongrats(numMoves, numStars, time) {
  var playAgain = confirm("Congrats! You finished the game in " + time + " with "
            + numMoves + " moves and " + numStars + " stars. Play again?");
  if (playAgain) {
    clearInterval(timer);
    startGame();
  }
}

var timer;
var sec;
var min;
var hr;
function clock() {
  sec += 1;
  if (sec == 60) {
    sec = 0;
    min += 1;
    if (min == 60) {
      min = 0;
      hr += 1;
    }
  }
  if (sec < 10) {
    displaySec = "0" + sec.toString();
  } else {
    displaySec = sec;
  }
  if (min < 10) {
    displayMin = "0" + min.toString();
  } else {
    displayMin = min;
  }
  if (hr < 10) {
    displayHr = "0" + hr.toString();
  } else {
    displayHr = hr;
  }
   document.querySelector(".timer").innerHTML = displayHr + ":" + displayMin + ":" + displaySec;
}

var restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function(event) {
  clearInterval(timer);
  startGame();
})
