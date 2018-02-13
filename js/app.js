/*
 * Create a list that holds all of your cards
 */
let cardList = [
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

 function handleClick(e) {
     if (e.target.className == 'card') {
        const className = (e.target.firstElementChild.className.split(' '))[1];
        showCard(e.target);
     }
 }

 function showCard(cardNode) {
     cardNode.classList.add('open');
     cardNode.classList.add('show');
    // const className = (cardNode.firstElementChild.className.split(' '))[1];
 }


