// script.js

// Get references to elements
const gameContainer = document.querySelector('.game-container');
const ball = document.querySelector('.ball');
const leftPaddle = document.querySelector('.paddle-left');
const rightPaddle = document.querySelector('.paddle-right');
const leftScore = document.getElementById('left-score');
const rightScore = document.getElementById('right-score');
const winnerText = document.getElementById('winner-text');

// Initial positions
let ballPosX = 290, ballPosY = 190; // Ball position
let ballSpeedX = 4, ballSpeedY = 4; // Ball speed
let paddleLeftY = 150, paddleRightY = 150; // Paddle positions
let leftPaddleSpeed = 0, rightPaddleSpeed = 0; // Speed of paddles
let leftPlayerScore = 0, rightPlayerScore = 0; // Scores

// Paddle height and game dimensions
const paddleHeight = 100;
const gameWidth = 600;
const gameHeight = 400;
const winScore = 5; // Score to win

// Control paddle movement with up and down arrows
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') rightPaddleSpeed = -5; // Move right paddle up
    if (e.key === 'ArrowDown') rightPaddleSpeed = 5; // Move right paddle down
    if (e.key === 'w') leftPaddleSpeed = -5; // Move left paddle up
    if (e.key === 's') leftPaddleSpeed = 5; // Move left paddle down
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPaddleSpeed = 0; // Stop right paddle
    if (e.key === 'w' || e.key === 's') leftPaddleSpeed = 0; // Stop left paddle
});

// Move paddles
function movePaddles() {
    paddleLeftY += leftPaddleSpeed;
    paddleRightY += rightPaddleSpeed;

    // Keep paddles within the game area
    if (paddleLeftY < 0) paddleLeftY = 0;
    if (paddleLeftY > gameHeight - paddleHeight) paddleLeftY = gameHeight - paddleHeight;
    if (paddleRightY < 0) paddleRightY = 0;
    if (paddleRightY > gameHeight - paddleHeight) paddleRightY = gameHeight - paddleHeight;

    leftPaddle.style.top = `${paddleLeftY}px`;
    rightPaddle.style.top = `${paddleRightY}px`;
}

// Move the ball
function moveBall() {
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballPosY <= 0 || ballPosY >= gameHeight - 20) {
        ballSpeedY = -ballSpeedY; // Reverse ball's vertical direction
    }

    // Ball collision with left paddle
    if (ballPosX <= 30 && ballPosY >= paddleLeftY && ballPosY <= paddleLeftY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Reverse ball's horizontal direction
    }

    // Ball collision with right paddle
    if (ballPosX >= gameWidth - 40 && ballPosY >= paddleRightY && ballPosY <= paddleRightY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Reverse ball's horizontal direction
    }

    // Scoring: Ball passes the left paddle (Right Player Scores)
    if (ballPosX <= 0) {
        rightPlayerScore++;
        updateScore();
        checkWinner();
        resetBall();
    }

    // Scoring: Ball passes the right paddle (Left Player Scores)
    if (ballPosX >= gameWidth - 20) {
        leftPlayerScore++;
        updateScore();
        checkWinner();
        resetBall();
    }

    // Update ball position on screen
    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;
}

// Update the score display
function updateScore() {
    leftScore.textContent = leftPlayerScore;
    rightScore.textContent = rightPlayerScore;
}

// Check if any player has won
function checkWinner() {
    if (leftPlayerScore >= winScore) {
        winnerText.textContent = 'Left Player Wins!';
        stopGame();
    } else if (rightPlayerScore >= winScore) {
        winnerText.textContent = 'Right Player Wins!';
        stopGame();
    }
}

// Stop the game when a player wins
function stopGame() {
    ballSpeedX = 0;
    ballSpeedY = 0;
    leftPaddleSpeed = 0;
    rightPaddleSpeed = 0;
}

// Reset ball to center after scoring
function resetBall() {
    ballPosX = gameWidth / 2 - 10;
    ballPosY = gameHeight / 2 - 10;
    ballSpeedX = -ballSpeedX; // Reverse ball direction
    ballSpeedY = 4;
}

// Game loop
function gameLoop() {
    if (leftPlayerScore < winScore && rightPlayerScore < winScore) {
        movePaddles();
        moveBall();
    }
    requestAnimationFrame(gameLoop); // Continuously update the game state
}

// Start the game
gameLoop();