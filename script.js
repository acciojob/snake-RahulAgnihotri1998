//your code here
// Set the initial direction of the snake
let direction = "right";

// Get the elements we need to work with
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.querySelector(".scoreBoard");

// Set the starting position of the snake
let snakePosition = [
	{row: 20, col: 1},
	{row: 20, col: 2},
	{row: 20, col: 3},
	{row: 20, col: 4},
	{row: 20, col: 5},
	{row: 20, col: 6},
	{row: 20, col: 7},
	{row: 20, col: 8},
	{row: 20, col: 9},
	{row: 20, col: 10}
];

// Draw the snake on the screen
for (let i = 0; i < snakePosition.length; i++) {
	const snakePixel = document.createElement("div");
	snakePixel.classList.add("snakeBodyPixel");
	snakePixel.id = "pixel" + (snakePosition[i].row * 40 + snakePosition[i].col);
	gameContainer.appendChild(snakePixel);
}

// Set the initial position of the food
const foodPosition = {row: 10, col: 10};
const foodPixel = document.createElement("div");
foodPixel.classList.add("food");
foodPixel.id = "pixel" + (foodPosition.row * 40 + foodPosition.col);
gameContainer.appendChild(foodPixel);

// Set the score to 0
let score = 0;

// Update the score board
scoreBoard.textContent = "Score: " + score;

// Move the snake every 100ms
setInterval(function() {
// Calculate the new position of the snake's head
let newHead;
if (direction === "right") {
newHead = {row: snakePosition[0].row, col: snakePosition[0].col + 1};
} else if (direction === "down") {
newHead = {row: snakePosition[0].row + 1, col: snakePosition[0].col};
} else if (direction === "left") {
newHead = {row: snakePosition[0].row, col: snakePosition[0].col - 1};
} else if (direction === "up") {
newHead = {row: snakePosition[0].row - 1, col: snakePosition[0].col};
}

javascript
Copy code
// Check if the snake hit a wall or itself
if (newHead.row < 1 || newHead.row > 40 || newHead.col < 1 || newHead.col > 40) {
	alert("Game over!");
	location.reload();
} else {
	for (let i = 1; i < snakePosition.length; i++) {
		if (newHead.row === snakePosition[i].row && newHead.col === snakePosition[i].col) {
			alert("Game over!");
			location.reload();
		}
	}
}

// Check if the snake hit the food
if (newHead.row === foodPosition.row && newHead.col === foodPosition.col) {
	// Increase the score
	score++;
	scoreBoard.textContent = "Score: " + score;

	// Move the food to a new random position
	let row = Math.floor(Math.random() * 40) + 1;
	let col = Math.floor(Math.random() * 40) + 1;
	foodPosition.row = row;
	foodPosition.col = col;
	foodPixel.id = "pixel" + (row * 40 + col);
}

// Move the snake
snakePosition.unshift(newHead);
const newHeadPixel = document.createElement("div");
newHeadPixel.classList.add("snakeBodyPixel");
newHeadPixel.id = "pixel" + (newHead.row * 40 + newHead.col);
gameContainer.insertBefore(newHeadPixel, gameContainer.firstChild);
gameContainer.removeChild(document.getElementById("pixel" + (snakePosition[snakePosition.length - 1].row * 40 + snakePosition[snakePosition.length - 1].col)));
snakePosition.pop();
}, 100);

// Change the direction of the snake when a key is pressed
document.addEventListener("keydown", function(event) {
if (event.key === "ArrowRight" && direction !== "left") {
direction = "right";
} else if (event.key === "ArrowDown" && direction !== "up") {
direction = "down";
} else if (event.key === "ArrowLeft" && direction !== "right") {
direction = "left";
} else if (event.key === "ArrowUp" && direction !== "down") {
direction = "up";
}
});