let dom;

function initDomManager(func) {
  dom = domManager(func);
}

function domManager(playRoundFunc) {
  const playerBoard = document.getElementById("content-player");
  const enemyBoard = document.getElementById("content-enemy");
  const player1Name = document.getElementById("player1-name");
  const player2Name = document.getElementById("player2-name");
  const randomBtn = document.getElementById("randomize-ships-btn");
  const startBtn = document.getElementById("start-btn");
  const gameLog = document.getElementById("game-log");
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.disabled = true;

  function initDom(player1, player2, mode) {
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    enemyBoard.classList.add("disabled-board");
    playerBoard.classList.add("disabled-board");

    fill(player1, player2, mode);
    initRandomizeBtn(player1);
    initResetBtn(player1, player2);
    initStartBtn();
  }

  function enableResetBtn() {
    resetBtn.disabled = false;
  }

  function disableResetBtn() {
    resetBtn.disabled = true;
  }

  function initStartBtn() {
    startBtn.addEventListener("click", () => {
      enemyBoard.classList.remove("disabled-board");
      startBtn.disabled = true;
      randomBtn.disabled = true;
      enableResetBtn();

      updateGameLog("ATTACK THE ENEMY SHIPS!!!");
    });
  }

  function gameOverResetBtn() {
    resetBtn.textContent = "Play Again?";
    enableResetBtn();
  }

  function initResetBtn(player1, player2) {
    resetBtn.addEventListener("click", () => {
      player1.board.resetBoard();
      player2.board.resetBoard();
      player1.board.placeRandomFullFleet();
      player2.board.placeRandomFullFleet();

      enemyBoard.classList.add("disabled-board");
      updateGameLog("Game Reset, Change Ships Or Play Again!");
      fill(player1, player2, "Computer");
      resetBtn.textContent = "Reset";

      startBtn.disabled = false;
      randomBtn.disabled = false;
      disableResetBtn();
    });
  }

  function initRandomizeBtn(player) {
    randomBtn.addEventListener("click", () => {
      player.board.resetBoard();
      player.board.placeRandomFullFleet();
      fillBoard(playerBoard, player, true);
    });
  }

  function fill(player1, player2, mode) {
    if (mode === "Computer") {
      fillBoard(playerBoard, player1, true);
      fillBoard(enemyBoard, player2, false);
    }
  }

  function fillBoard(board, player, seeShips) {
    const size = 10;
    const boxSize = 500 / size;

    board.innerHTML = "";

    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${size}, ${boxSize}px)`;
    board.style.gridTemplateRows = `repeat(${size}, ${boxSize}px)`;

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.style.width = `${boxSize}px`;
        div.style.height = `${boxSize}px`;
        div.classList.add("cell");
        div.dataset.row = j;
        div.dataset.col = i;
        div.dataset.player = player.name;

        const key = `${j},${i}`;

        if (player.board.shipCords[key] && seeShips) {
          div.classList.add("ship");
        }

        div.addEventListener("click", (e) => playRoundFunc(e));

        board.appendChild(div);
      }
    }
  }

  function attackedCell(cell, hit) {
    if (hit) {
      cell.classList.add("hit");
      cell.textContent = "💥";
    } else {
      cell.classList.add("miss");
      cell.textContent = "💧";
    }
    cell.classList.add("disabled-cell");
  }

  function updateGameLog(msg) {
    gameLog.textContent = msg;
  }

  function disableBoardToggle(player) {
    if (player.name === "Computer") {
      enemyBoard.classList.toggle("disabled-board");
    } else {
      playerBoard.classList.toggle("disabled-board");
    }
  }
  return {
    initDom,
    attackedCell,
    updateGameLog,
    disableBoardToggle,
    gameOverResetBtn,
    enableResetBtn,
    disableResetBtn,
  };
}

export { dom, initDomManager };
