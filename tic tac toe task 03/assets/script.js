document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    const messageElement = document.getElementById("message");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || checkWin()) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 200);

        if (checkWin()) {
            showWinMessage(`${currentPlayer} wins!`);
            drawWinningLine();
            setTimeout(resetGame, 2000);
        } else if (board.every(cell => cell !== "")) {
            showWinMessage("It's a draw!");
            setTimeout(resetGame, 2000);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
            return false;
        });
    }

    function drawWinningLine() {
        const winningCombination = winningCombinations.find(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });

        const line = document.createElement("div");
        line.id = "winner-line";
        document.body.appendChild(line);

        const [start, middle, end] = winningCombination;
        const startX = cells[start].offsetLeft + cells[start].offsetWidth / 2;
        const startY = cells[start].offsetTop + cells[start].offsetHeight / 2;
        const endX = cells[end].offsetLeft + cells[end].offsetWidth / 2;
        const endY = cells[end].offsetTop + cells[end].offsetHeight / 2;

        const angle = Math.atan2(endY - startY, endX - startX);
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        line.style.position = 'absolute';
        line.style.top = `${startY - 2.5}px`;
        line.style.left = `${startX}px`;
        line.style.width = `${length}px`;
        line.style.height = '5px';
        line.style.backgroundColor = 'red';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';
    }

    function showWinMessage(message) {
        messageElement.textContent = message;
        document.body.style.backgroundColor = "#b59bb3"; // Change to a shade similar to the original background color
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        messageElement.textContent = "";
        document.body.style.backgroundColor = "#bc8fa1"; // Original background color
        const line = document.getElementById("winner-line");
        if (line) {
            line.remove();
        }
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});
