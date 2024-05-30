let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return null;
}

function makeMove(index) {
    if (!cells[index].innerText && !checkWinner() && ![...cells].every(cell => cell.innerText)) {
        cells[index].innerText = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            status.textContent = `${winner} wins!`;
            highlightWinnerCells(winningCombos.find(combo => cells[combo[0]].innerText === winner));
        } else if ([...cells].every(cell => cell.innerText)) {
            status.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Current player: ${currentPlayer}`;
        }
    }
}

function highlightWinnerCells(cellsToHighlight) {
    for (let cellIndex of cellsToHighlight) {
        cells[cellIndex].style.backgroundColor = 'lightgreen';
    }
}

function resetBoard() {
    for (let cell of cells) {
        cell.innerText = '';
        cell.style.backgroundColor = '#ddd';
    }
    status.textContent = '';
    currentPlayer = 'X';
}
