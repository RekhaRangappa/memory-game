// list that holds all of your cards
let cards = ["fa-diamond", "fa-paper-plane-o",  "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", 
"fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o",
 "fa-cube"];
let openCards=[], matchFound=0, moves = 0, starCount = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame() {
    shuffledCards = shuffle(cards);
    for(let i=0;i<shuffledCards.length;i++) {
        $("#deck").append('<li class="card"><i class="fa '+ shuffledCards[i] +'"></i></li>');
    }
    // set up the event listener for a card. If a card is clicked:
    $( "ul.deck li.card" ).on( "click", toggleCard);
    initialize();
}

// Initialize variables
function initialize() {
    matchFound = 0;
    moves = 0;
    starCount= 3;
    addStars();
    $('#moves').html(`${moves} moves`);
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

// Display or hide the card 
toggleCard = function() {
        if(openCards.length === 0) {
            $(this).toggleClass("show open");
            openCards.push($(this));
        } else if(openCards.length === 1) {
            $(this).toggleClass("show open");
            openCards.push($(this));
            animateCards();           
            setTimeout(checkCardMatches, 1600);
            trackMoves();
        }
    };

// Check card  matches 
function checkCardMatches() {
    if(openCards[0][0].firstElementChild.className === openCards[1][0].firstElementChild.className) {
        openCards[0].off('click');
        openCards[1].off('click');
        openCards[0].addClass('match');
        openCards[1].addClass('match');
        animateCards();
        removeCards();
        checkGameFinish();
    } else {
        openCards[0].toggleClass("show open");
        openCards[1].toggleClass("show open");
        animateCards();
        removeCards();
    }      
}

// Empty open cards
function removeCards() {
    openCards = [];
}

// Check card matches
function checkGameFinish() {
    matchFound = matchFound + 1;
    if (matchFound == 8) {
         $("#overlay").addClass('overlay');
        $('#overlay').html(`<p class="success"> Congratulations! You Won! </p>
                    <p>
                        <span class="score">With ${moves} Moves and ${starCount} Stars</span>
                    </p>
                    <p>Wooooooo!</p>
                    <p><button onclick="restartGame()">Play again!</button></p>
            `);
    }
}

// Track Moves
function trackMoves() {
    moves += 1;
    $('#moves').html(`${moves} moves`);
    updateStars();
}

// Update Stars
function updateStars() {
    if(moves === 9 ) {
        addEmptyStars();
    } else if(moves === 18) {
        addEmptyStars();
    }
}

// Initialize stars
function addStars() {
    for(let i=0;i<3;i++) {
        $('#stars').append('<i class="fa fa-star"></i>');
    }
}

// Remove stars
function addEmptyStars() {
    starCount--; 
    $('#stars').children()[0].remove();
    $('#stars').append('<i class="fa fa-star-o"></i>');
}

// Add animation effects
function animateCards() {
    openCards[0].toggleClass('animate');
    openCards[1].toggleClass('animate');
}

// Restart Game
function restartGame() {
    $("ul").empty();
    $("#stars").empty();
    $("#overlay").removeClass('overlay');
    matchFound = 0;
    startGame();
}

// listener to restart event on click
$('.restart').on('click', restartGame);

// Start the Game
startGame();
