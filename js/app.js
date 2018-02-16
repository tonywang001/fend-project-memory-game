// list that holds all card
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

// list holding matched cards
let matchedCardList = [];

// indicating the open card yet matched
let openCard = '';

// number of matches in order to win
const NUM_MATCH_TO_WIN = 8;

let timeElapsed = 0;

// interval event id used to clear interval event
let intervalId = null;

// start rating
let numStars = 0;

/*
 * Setting up all event listener
 */
// Listen on card click
document.querySelector('.deck').addEventListener('click', handleCardClick);
// listen on restart button
document.querySelector('.restart').addEventListener('click', refreshBoard);
// listen on play again button
document.querySelector('.restart-button').addEventListener('click', restartGame);

/*
 * Render the board
 */
refreshBoard();

/*
 * Handle card click event
 */
function handleCardClick(e) {
    if (e.target.className == 'card') {
        const className = (e.target.firstElementChild.className.split(' '))[1];
        showCard(e.target);
        setTimeout(function() {
            checkCardMatch(e.target);
            checkWinningCondition();
        }, 500);
    }
}

/* 
 * function to setup the board and all the variables
 */
function refreshBoard() {
    // Set moves to 0
    document.querySelector('.moves').textContent = 0;

    // Set timer to 0
    timeElapsed = 0;
    document.querySelector('.time-elapsed').textContent = 0;

    // Restart timer
    if (null !== intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(function() {
        ++timeElapsed;
        document.querySelector('.time-elapsed').textContent = timeElapsed;
    }, 1000);

    // Reset num stars
    numStars = 3;

    refreshStars();

    // reset board
    displayCards();
}

/*
 * function to restart the game
 */
function restartGame(e) {
    displayGame();
}

/*
 * function to display the board
 */
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

/*
 * function to shuffle the given array from 
 * http://stackoverflow.com/a/2450976
 */
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
 * functino to show the card
 */
function showCard(cardNode) {
    cardNode.classList.add('open');
    cardNode.classList.add('show');
}

/*
 * functino to hide the card
 */
function hideCard(cardNode) {
    cardNode.classList.remove('open');
    cardNode.classList.remove('show');
}

/*
 * check whether theres a card match
 */
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
            checkStars();
        }
        openCard = '';
    }
}

/*
 * Imcrement the move counter
 */
function incrementMoves() {
    ++(document.querySelector('.moves').textContent);
}

/*
 * check whether user has won
 */
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

/*
 * function to display the winning page
 */
function displayWinningPage() {
    document.querySelector('.winning-page').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.num-move-took').textContent =
        document.querySelector('.moves').textContent;

    document.querySelector('.time-took').textContent =
        timeElapsed + ' seconds';

}

/*
 * functino to render the game board
 */
function displayGame() {
    document.querySelector('.winning-page').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    refreshBoard();
}

/*
 * logic to determine star rating
 */
function checkStars() {

    const numMoves = document.querySelector('.moves').textContent;

    if (numMoves >= 30) {
        numStars = 0;
    } else if (numMoves >= 20) {
        numStars = 1;
    } else if (numMoves >= 10) {
        numStars = 2;
    } else {
        numStars = 3;
    }

    refreshStars();

}

/*
 * function to render stars
 */
function refreshStars() {
    const childNodes = document.querySelector('.stars').children;
    for (let i=0; i<numStars; ++i) {
        console.log('i : ' + i + ' childNode i : ' + childNodes[i]);
        childNodes[i].firstChild.className = 'fa fa-star';
    }

    for (let i=2; i>=numStars; --i) {
        childNodes[i].firstChild.className = 'fa fa-star-o';
    }
}
