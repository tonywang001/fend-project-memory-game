/*
 * Create a list that holds all of your cards
 */
const cardList = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
];

let openCard = '';

let matchedCardList = [];

const NUM_MATCH_TO_WIN = 8;

let startTime = new Date();

let timeElapsed = 0;

let intervalId = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

refreshBoard();
//displayCards();

function displayCards() {
    const deckNode = document.querySelector('.deck');

    // Clean up current deck
    while(deckNode.firstChild) {
        deckNode.removeChild(deckNode.firstChild);
    }

    shuffle(cardList).forEach(function(card) {
        const listNode = document.createElement('li');
        const iNode = document.createElement('i');
        listNode.className = 'card';
        iNode.className = 'fa ' + card;
        listNode.appendChild(iNode);
        deckNode.appendChild(listNode);
    });
}

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

document.querySelector('.deck').addEventListener('click', handleClick);
document.querySelector('.restart').addEventListener('click', refreshBoard);
document.querySelector('.restart-button').addEventListener('click', restartGame);

function handleClick(e) {
    if (e.target.className == 'card') {
        const className = (e.target.firstElementChild.className.split(' '))[1];
        showCard(e.target);
        setTimeout(function() {
            checkCardMatch(e.target);
            checkWinningCondition();
        }, 500);
    }
}

function showCard(cardNode) {
    cardNode.classList.add('open');
    cardNode.classList.add('show');
}

function hideCard(cardNode) {
    cardNode.classList.remove('open');
    cardNode.classList.remove('show');
}

function checkCardMatch(cardNode) {
    console.log('check called');
    const className = (cardNode.firstElementChild.className.split(' '))[1];
    if ('' === openCard) {
        openCard = className;
    } else {
        if (openCard === className) {
            // This is a match
            matchedCardList.push(className);
            const cardList = document.getElementsByClassName(className);
            [].forEach.call(cardList, function(card) {
                        card.parentElement.className = 'card match';
                    });
        } else {
            // No match
            const cardList = document.getElementsByClassName(className);
            const openCardList = document.getElementsByClassName(openCard);

            console.log(cardList);
            // TODO: refactor this piece
            [].forEach.call(cardList, function(card) {
                hideCard(card.parentElement);
            });
            [].forEach.call(openCardList, function(card) {
                hideCard(card.parentElement);
            });
            incrementMoves();
        }
        openCard = '';
    }
}

function incrementMoves() {
    ++(document.querySelector('.moves').textContent);
}

function refreshBoard() {
    // Set moves to 0
    document.querySelector('.moves').textContent = 0;

    // Set timer to 0
    document.querySelector('.time-elapsed').textContent = 0;

    // Restart timer
    intervalId = setInterval(function() {
        ++timeElapsed;
        document.querySelector('.time-elapsed').textContent = timeElapsed;
    }, 1000);


   // reset board
   displayCards();

   // reset timer
   startTime = new Date();
}

function checkWinningCondition() {
    if (matchedCardList.length === NUM_MATCH_TO_WIN) {
        // Player won
        console.log('won');
        // Stop timer
        if (null !== intervalId) {
            clearInterval(intervalId);
        }
        // Display the winning page
        displayWinningPage();
    }
}

function displayWinningPage() {
    document.querySelector('.winning-page').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.num-move-took').textContent =
        document.querySelector('.moves').textContent;

    // // Calculate time slapsed
    // let endTime = new Date();
    // let timeDiff = endTime - startTime;

    // // Convert to second
    // timeDiff /= 1000;
    // timeDiff = Math.round(timeDiff);

    // console.log('time elapsed : ' + timeDiff);

    document.querySelector('.time-took').textContent =
        timeElapsed + ' seconds';
}

function restartGame(e) {
    console.log('restart button click -> ' + e.target);
    displayGame();
}

function displayGame() {
    document.querySelector('.winning-page').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    refreshBoard();
}
