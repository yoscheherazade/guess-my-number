/*
USER STORIES:
-Player guesses a number using step or by manual input.
-Player has a set number of guesses.
-Player is notified of remaining guesses.
-Player is notified of the correct answer if player loses.
-Player can choose to play again.
*/

// Game Vals
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

// UI elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// Assign min and max to UI
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess submit
UIguessBtn.addEventListener('click', function() {
  //input will be string, change it to number
  let guess = parseInt(UIguessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if winning number
  if(guess === winningNum) {
    //Game over - YOU WIN!
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else {
    // Wrong guess
    guessesLeft -= 1;

    if(guessesLeft === 0 || guessesLeft < 0) {
      //Game over - YOU LOSE :(
      gameOver(false, `Game over, YOU LOSE! The correct number was ${winningNum}.`);

    } else {
      // Continue game - wrong answer

      UIguessInput.style.borderColor = 'red';

      UIguessInput.value = '';

      setMessage(`Not Quite! Guess again! ${guessesLeft} guesses left.`)
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';


  //disable input
  UIguessInput.disabled = true;

  //change border and text colors
  UIguessInput.style.borderColor = color;
  UImessage.style.color = color;

  //You win! Message
  setMessage(msg);

  //Play again
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

// Get Winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message function
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}
