let dom;

function initDomManager(func) {
  dom = domManager(func);
}

function domManager(playRoundFunc) {
  const playerBoard = document.getElementById("content-player");
  const enemyBoard = document.getElementById("content-enemy");
  const player1Name = document.getElementById("player1-name");
  const player2Name = document.getElementById("player2-name");

  function initDom(player1, player2, mode) {
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    fill(player1, player2, mode);
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

    if (seeShips) {
      board.classList.add("disabled-board");
    }
  }

  function attackedCell(cell, hit) {
    if (hit) {
      cell.classList.add("hit");
    } else {
      cell.classList.add("miss");
    }
    cell.classList.add("disabled-cell");
  }

  return { initDom, attackedCell };
}

export { dom, initDomManager };
