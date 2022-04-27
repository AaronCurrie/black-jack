//card array

const cards = ['Ace Clubs', '2 Clubs', '3 Clubs','4 Clubs', '5 Clubs', '6 Clubs', '7 Clubs', '8 Clubs', '9 Clubs', '10 Clubs', 'Jack Clubs', 'Queen Clubs', 'King Clubs','Ace Diamonds', '2 Diamonds', '3 Diamonds','4 Diamonds', '5 Diamonds', '6 Diamonds', '7 Diamonds', '8 Diamonds', '9 Diamonds', '10 Diamonds', 'Jack Diamonds', 'Queen Diamonds', 'King Diamonds','Ace Hearts', '2 Hearts', '3 Hearts','4 Hearts', '5 Hearts', '6 Hearts', '7 Hearts', '8 Hearts', '9 Hearts', '10 Hearts', 'Jack Hearts', 'Queen Hearts', 'King Hearts','Ace Spades', '2 Spades', '3 Spades','4 Spades', '5 Spades', '6 Spades', '7 Spades', '8 Spades', '9 Spades', '10 Spades', 'Jack Spades', 'Queen Spades', 'King Spades',];

//corresponding card score array

const cardsScore = [11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,];



let playerHand = []; //updates as players hand changes
let playerScore; //updates as player score changes
let dealerHand = []; //updates as dealer hand changes
let dealerScore; //updates as dealer score changes
let drawScore ; 
let playerPosition;
let dealerPosition;
let playerWins = 0;
let dealerWins = 0;
let ties = 0;
let cash = 0;

let hitButton = document.getElementById('hit');
let standButton = document.getElementById('stand');
let dealButton = document.getElementById('deal');

//function to draw a card
function drawCards(x) {
    let drawn = []
    drawScore = 0;
    for(let i = 0; i < x; i++ ) {
      let random = Math.floor(Math.random()*52)
      drawn[i] = cards[random];
      drawScore += cardsScore[random];
    }
    return drawn;
  }
  
  
  //function to start the game with initial deal
  function deal() {
    dealerPosition = 'play';
    playerScore = 0;
    dealerScore = 0; //resets scores for new game
  
    dealerHand = drawCards(1);
    dealerScore = drawScore;
    document.getElementById('dealerCards').innerHTML = dealerHand;
    document.getElementById('dealer-score').innerHTML = `Score: ${dealerScore}`;
    
  
    playerHand = drawCards(2);
    playerScore = drawScore;
    document.getElementById('playerCards').innerHTML = playerHand;
    document.getElementById('player-score').innerHTML = `Score: ${playerScore}`;

    if (playerScore === 21) {
      playerPosition = 'blackJack';
    }
  }

  // function if some one hits
function hit(whoHit) {
    if(whoHit === 'player') {
      playerHand.push(drawCards(1));  
      playerScore += drawScore;
      document.getElementById('playerCards').innerHTML = playerHand;
      document.getElementById('player-score').innerHTML = `Score: ${playerScore}`;
      document.getElementById('Ihit').innerHTML = 'I will Hit';
    } else {
      dealerHand.push(drawCards(1));  
      dealerScore += drawScore;
      document.getElementById('dealerCards').innerHTML = dealerHand;
      document.getElementById('dealer-score').innerHTML = `Score: ${dealerScore}`;
  }
}

function dealerTurn() {
    dealerHand.push(drawCards(1));
    dealerScore += drawScore;
    dealerPosition = 'play';
    if (dealerScore === 21) {
      dealerPosition = 'blackjack'
    }
  
    while (dealerPosition === 'play') {
      if(dealerScore <= 16) {
        hit('dealer');
      } else if (dealerScore > 21) {
        dealerPosition = 'bust';
      } else if (dealerScore > 16 && dealerScore < 22) {
        dealerPosition = 'stand';
      }
    } 
  }

dealButton.addEventListener('click', function(){
    deal();
});
  
hitButton.addEventListener('click', function(){
    hit('player');
});

standButton.addEventListener('click', function(){
    dealerTurn();
    document.getElementById('Ihit').innerHTML = 'Dealers Turn';
});