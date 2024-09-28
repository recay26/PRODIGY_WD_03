const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return board.every(cell => cell !== "");
};

const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (checkDraw()) {
            statusText.textContent = "It's a draw!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
};

const restartGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
