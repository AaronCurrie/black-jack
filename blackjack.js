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
  playerScore = 0;
  dealerScore = 0; //resets scores for new game

  dealerHand = drawCards(1);
  dealerScore = drawScore;
  

  playerHand = drawCards(2);
  playerScore = drawScore;
  
  if (playerScore === 21) {
    playerPosition = 'blackJack';
  }
}


// function if some one hits
function hit(whoHit) {
    if(whoHit === 'player') {
      playerHand.push(drawCards(1));  
      playerScore += drawScore;
      
    } else {
      dealerHand.push(drawCards(1));  
      dealerScore += drawScore;
  }
}

//checks for Ace 
//started this but concept confused me so will come back another time
function checkAce(whosHand) {
  if (whosHand.includes('Ace Clubs') || whosHand.includes('Ace Diamonds') || whosHand.includes('Ace Hearts') || whosHand.includes('Ace Spades')){
    return true;
  } else {
    return false;
  }
}

//logic for the players decisions
function playerTurn() {
  playerPosition = 'play';
  do {
      if(playerScore > 21) {
        playerPosition = 'bust';
        break;
      } else if(playerScore <= 11) {
        hit('player');
      }
      else if (playerScore === 12 && dealerScore < 4) {
        hit('player');
      }
      else if (playerScore === 12 && dealerScore > 6) {
        hit('player');
      }
      else if (playerScore === 12 && dealerScore < 6) {
        playerPosition = 'stand';
      }
      else if (playerScore > 12 && playerScore < 17 && dealerScore > 6) {
        hit('player');
      }
      else if (playerScore > 12 && playerScore < 17 && dealerScore < 7 ) {
        playerPosition = 'stand';
      }
      else if (playerScore => 17 && playerScore < 21){
        playerPosition = 'stand';
      }
      else if (playerScore === 21) {
        playerPosition = 'stand';
      }
      else if (playerScore > 21) {
        playerPosition = 'bust';
      }   
    } while(playerPosition === 'play');
  }


//logic for the dealers turn
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


//logic for playersturn with logs for watchPlay()
function playerTurn2() {
  playerPosition = 'play';
  do {
      if(playerScore > 21) {
        playerPosition = 'bust';
        break;
      }
      if(playerScore <= 11) {
        hit('player');
        console.log('Player Hit');
      }
      else if (playerScore === 12 && dealerScore < 4) {
        hit('player');
        console.log('Player Hit');
      }
      else if (playerScore === 12 && dealerScore > 6) {
        hit('player');
        console.log('Player Hit');
      }
      else if (playerScore === 12 && dealerScore < 6) {
        playerPosition = 'stand';
      }
      else if (playerScore > 12 && playerScore < 17 && dealerScore > 6) {
        hit('player');
        console.log('Player Hit');
      }
      else if (playerScore > 12 && playerScore < 17 && dealerScore < 7 ) {
        playerPosition = 'stand';
      }
      else if (playerScore => 17 && playerScore < 21){
        playerPosition = 'stand';
      }
      else if (playerScore === 21) {
        playerPosition = 'stand';
      }
      else if (playerScore > 21) {
        playerPosition = 'bust';
      }   
    } while(playerPosition === 'play');
  }


//logic for the dealers turn with logs for watchPlay()
function dealerTurn2() {
  dealerHand.push(drawCards(1));
  dealerScore += drawScore;
  dealerPosition = 'play';
  if (dealerScore === 21) {
    dealerPosition = 'blackjack'
  }

  while (dealerPosition === 'play') {
    if(dealerScore <= 16) {
      hit('dealer');
      console.log('Dealer Hit');
    } else if (dealerScore > 21 && checkAce(playerHand) === false ) {
      dealerPosition = 'bust';
    } else if (dealerScore > 16 && dealerScore < 22) {
      dealerPosition = 'stand';
    }
  } 

}

//plays the game
function play(y) {
  for (let i = 0; i < y; i++) {
    cash -= 10;
    deal()
  if(playerPosition === 'blackjack'){
  } else {
      playerTurn();
  }

  if(playerPosition === 'bust') {
    dealerPosition = 'winner' 
  }else if (playerPosition === 'stand') {
    dealerTurn();
  }

  if (playerPosition === 'blackjack') {
  } else if(dealerPosition === 'blackjack') {
  } else if(dealerPosition === 'bust') {
    playerPosition = 'winner';
  } else if (playerScore > dealerScore && playerScore < 22 ) {
    playerPosition = 'winner';
  } else if (dealerScore > playerScore) {
    dealerPosition = 'winner';
  } else if (dealerScore === playerScore) { 
    playerPosition = 'tie';
  }

  if (playerPosition === 'winner' || playerPosition === 'blackjack') {
    playerWins ++;
    cash += 20;
  } else if (dealerPosition === 'winner' || dealerPosition === 'blackjack'){
    dealerWins ++;
  } else if (playerPosition === 'tie'){
    ties ++
    cash += 10;
  }

  playerPosition = '';
  dealerPosition = '';
  } 
  console.log(`The program played ${y} games of blackjack.\nPlayer Wins: ${playerWins}\nDealer Wins: ${dealerWins}\nTies: ${ties}\nCash Balance: ${cash}`);
}

//plays the game and lets you see the movements
function watchPlay(y) {
  for (let i = 0; i < y; i++) {
    deal()
    console.log(`Dealer Hand: Unknown, ${dealerHand}`);
    console.log(`Dealer Score: ${dealerScore}\n`);
    console.log(`Player Hand: ${playerHand}`);
    console.log(`Player Score: ${playerScore}\n`);

  if(playerPosition === 'blackjack'){
    console.log('Player wins with Blackjack')
  } else {
      playerTurn2();
      console.log(`Player Hand: ${playerHand}`);
      console.log(`Player Score: ${playerScore}`);
      console.log(`Player ${playerPosition}\n`);
  }

  if(playerPosition === 'bust') {
    console.log('\nDealer Wins');
    dealerPosition = 'winner' 
  }else if (playerPosition === 'stand') {
    dealerTurn2();
    console.log(`Dealer Hand: ${dealerHand}`);
    console.log(`Dealer Score: ${dealerScore}\n`);
    console.log(`Dealer ${dealerPosition}\n`);
  }

  if (playerPosition === 'blackjack') {
    console.log('\nPlayer wins with BlackJack');
  } else if(dealerPosition === 'blackjack') {
    console.log('\nDealer wins with BlackJack');
  } else if(dealerPosition === 'bust') {
    console.log('\nPlayer Wins');
    playerPosition = 'winner';
  } else if (playerScore > dealerScore && playerScore < 22 ) {
    console.log('\nPlayer Wins');
    playerPosition = 'winner';
  } else if (dealerScore > playerScore) {
    console.log('\nDealer Wins');
    dealerPosition = 'winner';
  } else if (dealerScore === playerScore) { 
    console.log('\nTie Game');
    playerPosition = 'tie';
  }

  playerPosition = '';
  dealerPosition = '';
  } 
}



play(1000)

