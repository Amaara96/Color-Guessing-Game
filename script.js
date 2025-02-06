const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let targetColor;
let score = 0;

// Generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize the game
function initGame() {
  // Reset score
  score = 0;
  scoreElement.textContent = score;
  gameStatus.textContent = '';

  // Generate target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Generate color options
  const colors = [targetColor];
  while (colors.length < 6) {
    const color = getRandomColor();
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  colors.sort(() => Math.random() - 0.5); // Shuffle colors

  // Render color buttons
  colorOptions.innerHTML = colors
    .map(
      (color) =>
        `<button style="background-color: ${color};" data-color="${color}"></button>`
    )
    .join('');
}

// Check user's guess
colorOptions.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const selectedColor = e.target.dataset.color;
    if (selectedColor === targetColor) {
      gameStatus.textContent = 'Correct!';
      gameStatus.style.color = 'green';
      score++;
      scoreElement.textContent = score;
      initGame(); // Start a new round
    } else {
      gameStatus.textContent = 'Wrong! Try again.';
      gameStatus.style.color = 'red';
    }
  }
});

// Reset the game
newGameButton.addEventListener('click', initGame);

// Start the game
initGame();