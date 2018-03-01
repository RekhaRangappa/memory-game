// list that holds all of your cards
let cards = ["fa-diamond", "fa-paper-plane-o",  "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", 
"fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o",
 "fa-cube"];
let openCards=[];
let matchFound=0;
let moves = 0;
let starCount = 3;
let timer = "";
let clickCount = 0;
let time_value = '0:0:00';

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
    time_value = '0:0:00';
    $('#moves').html(`${moves} moves`);
    $(".timer").text(time_value);
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
        //start timer for first click
        clickCount++;
        if(clickCount == 1) {
            gameTimer();
        }
        if(openCards.length === 0) {
            $(this).toggleClass("show open");
            openCards.push($(this));
            disableCLick();
        } else if(openCards.length === 1) {
            $(this).toggleClass("show open");
            openCards.push($(this));
            animateCards();
            setTimeout(checkCardMatches, 1600);
            trackMoves();
        }
    };

/* 
 * openCards are cards to be matched
 * Check card matches. if yes, then remove click event for the matched card
 * check if game has been completed
*/
function checkCardMatches() {
    if(openCards[0][0].firstElementChild.className === openCards[1][0].firstElementChild.className) {
        disableCLick();
        openCards[0].addClass('match');
        openCards[1].addClass('match');
        animateCards();
        removeCards();
        checkGameFinish();
    } else {
        openCards[0].toggleClass("show open");
        openCards[1].toggleClass("show open");
        enableClick();
        animateCards();
        removeCards();
    }      
}


/*
 * Check card matches
 * if matches, display success message in overlay
*/
function checkGameFinish() {
    matchFound = matchFound + 1;
    if (matchFound == 8) {
        clearInterval(timer);
        $("#overlay").addClass('overlay');
        $('#overlay').html(`
                    <p class="success"> Congratulations! You Won! </p>
                    <p>
                        <span class="score">With ${moves} Moves and ${starCount} Stars in</span>
                    </p>
                    <p>
                        <span>${time_value}</span>
                    </p>
                    <p>Wooooooo!</p>
                    <p><button onclick="restartGame()">Play again!</button></p>
            `);
    }
}

// Empty open cards
function removeCards() {
    openCards = [];
}

// Disable click of the open Cards
function disableCLick() {
    openCards.forEach(function (card) {
        card.off('click');
    });
}

// enable click on the open card
function enableClick() {
    openCards[0].click(toggleCard);
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
    $('#overlay').empty();
    matchFound = 0;
    clickCount = 0;
    clearInterval(timer);
    startGame();
}

// listener to restart event on click
$('.restart').on('click', restartGame);

/*
 *calculate time taken to complete the game
*/
function gameTimer() {
    const game_start_time = new Date().getTime();

    timer = setInterval(function () {
        let current_time = new Date().getTime();
        let current_time_played = current_time - game_start_time;
        let hrs = Math.floor((current_time_played % (1000 * 60 * 60 *  24))/(1000 * 60 * 60));
        let mins = Math.floor((current_time_played % (1000 * 60 * 60))/(1000 * 60));
        let secs = Math.floor((current_time_played % (1000 * 60))/(1000));

        time_value = hrs + ' hours ' + mins + ' mins ' + secs + ' secs ';

        if(secs < 10) {
            secs = '0' + secs;
        }
        current_time_played = hrs + ':' +mins + ':' + secs;
        $(".timer").text(current_time_played);
    },500);
}

// Start the Game
startGame();