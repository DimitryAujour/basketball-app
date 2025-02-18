let playerOneScore = 0;
let playerTwoScore = 0;
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
/*sets the probability and the points awarded for each shot*/
const buttons = {
    snake: [
        {id: "button4", prob: 0.5, points: 3},
        {id: "button5", prob: 0.7, points: 2},
        {id: "button6", prob: 0.9, points: 1}
    ],
    lion: [
        {id: "button1", prob: 0.5, points: 3},
        {id: "button2", prob: 0.7, points: 2},
        {id: "button3", prob: 0.9, points: 1}
    ]
};
/* checks ho is the player and call the correct function depending on the button clicked*/
function handleButtonClick(player, button) {
    const { prob, points } = button;
    if (player === 'snake') {
        playerOneScore = incrementScore(playerOneScore, prob, points, score1, 'Snake');
    } else {
        playerTwoScore = incrementScore(playerTwoScore, prob, points, score2, 'Lion');
    }
    switchEventListeners(button.id);
}
/*the logic to add the points and change the text of the score on the board */
function incrementScore(value, probability, points, scoreElement, player) {
    if (Math.random() < probability) {
        value += points;
        scoreElement.innerText = value;
        console.log(scoreElement.innerText);
        checkWinner(value, player);
    } else {
        console.log("Value not incremented. Current value:", value);
    }
    return value;
}
/* Makes sure that only the active player has buttons with event listeners*/
function switchEventListeners(clickedButtonId) {
    const isSnakeTurn = ['button4', 'button5', 'button6'].includes(clickedButtonId);
    const activeButtons = isSnakeTurn ? buttons.lion : buttons.snake;
    const inactiveButtons = isSnakeTurn ? buttons.snake : buttons.lion;

    inactiveButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        element.removeEventListener("click", element.clickHandler);
    });

    activeButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        element.clickHandler = () => handleButtonClick(isSnakeTurn ? 'lion' : 'snake', btn);
        element.addEventListener("click", element.clickHandler);
    });
/* sets the css to change the background color of the active and inactive players*/
    side1.classList.toggle("active-player");
    side1.classList.toggle("inactive-player");
    side2.classList.toggle("active-player");
    side2.classList.toggle("inactive-player");
}

function checkWinner(score, player) {
    if (score >= 20) {
        const modal = document.getElementById("winnerModal");
        const winnerMessage = document.getElementById("winnerMessage");
        winnerMessage.textContent = `${player} wins!`;
        modal.style.display = "block";

        // Close modal when clicking the close button
        const closeBtn = modal.querySelector(".close");
        closeBtn.onclick = function() {
            modal.style.display = "none";
            resetGame();
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                resetGame();
            }
        }
    }
}

function resetGame() {
    playerOneScore = 0;
    playerTwoScore = 0;
    score1.innerText = "0";
    score2.innerText = "0";

    // Reset to initial state (Snake's turn)
    side1.classList.add("active-player");
    side1.classList.remove("inactive-player");
    side2.classList.add("inactive-player");
    side2.classList.remove("active-player");

    // Remove all event listeners
    buttons.snake.concat(buttons.lion).forEach(btn => {
        const element = document.getElementById(btn.id);
        element.removeEventListener("click", element.clickHandler);
    });

    // Add initial event listeners for Snake
    buttons.snake.forEach(btn => {
        const element = document.getElementById(btn.id);
        element.clickHandler = () => handleButtonClick('snake', btn);
        element.addEventListener("click", element.clickHandler);
    });
}

// Initial setup
buttons.snake.forEach(btn => {
    const element = document.getElementById(btn.id);
    element.clickHandler = () => handleButtonClick('snake', btn);
    element.addEventListener("click", element.clickHandler);
});
