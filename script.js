document.addEventListener('DOMContentLoaded', function() {
    const wordContainer = document.getElementById('word-container');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const feedbackContainer = document.getElementById('feedback-container');
  
    let selectedWord = generateRandomWord();
    let guessedLetters = [];
    let attemptsLeft = 6;
  
    // Generate a random word from the words array
    function generateRandomWord() {
      const words = [
        "javascript",
        "hangman",
        "developer",
        "programming",
        "html",
        "css",
        "python"
      ];
      return words[Math.floor(Math.random() * words.length)];
    }
  
    // Display the word with blanks for missing letters
    function displayWord(word, guessedLetters) {
      let displayedWord = "";
      for (let letter of word) {
        if (guessedLetters.includes(letter)) {
          displayedWord += letter + " ";
        } else {
          displayedWord += "_ ";
        }
      }
      return displayedWord.trim();
    }
  
    // Check if the player has guessed all the letters in the word
    function isWordGuessed(word, guessedLetters) {
      for (let letter of word) {
        if (!guessedLetters.includes(letter)) {
          return false;
        }
      }
      return true;
    }
  
    // Handle player's guess
    function guessLetter(letter) {
      if (guessedLetters.includes(letter)) {
        feedbackContainer.textContent = "You've already guessed this letter.";
        return;
      }
  
      guessedLetters.push(letter);
      if (!selectedWord.includes(letter)) {
        attemptsLeft--;
        feedbackContainer.textContent = "Incorrect guess! Attempts left: " + attemptsLeft;
      }
  
      let wordDisplay = displayWord(selectedWord, guessedLetters);
      wordContainer.textContent = wordDisplay;
  
      if (isWordGuessed(selectedWord, guessedLetters)) {
        feedbackContainer.textContent = "Congratulations! You guessed the word.";
        resetGame();
      } else if (attemptsLeft === 0) {
        feedbackContainer.textContent = "Game over! The word was: " + selectedWord;
        resetGame();
      }
    }
  
    // Reset the game
    function resetGame() {
      guessedLetters = [];
      attemptsLeft = 6;
      selectedWord = generateRandomWord();
      wordContainer.textContent = displayWord(selectedWord, guessedLetters);
    }
  
    // Event listener for guess button click
    guessButton.addEventListener('click', function() {
      const letter = guessInput.value.trim().toLowerCase();
      if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
        feedbackContainer.textContent = "Please enter a valid letter.";
        return;
      }
      guessInput.value = '';
      guessLetter(letter);
    });
  
    // Initialize the game
    wordContainer.textContent = displayWord(selectedWord, guessedLetters);
  });
  