import GameBoard from "./gameBoard";

class Player {
  constructor(name) {
    this.board = new GameBoard();
    this.name = name;
  }
}

class RealPlayer extends Player {
  constructor(name) {
    super(name);
  }

  playerMove(cell, dom, enemy) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    console.log("Clicked:", row, col, enemy.name);

    const attackHit = enemy.board.receiveAttack([row, col]);

    if (attackHit) {
      dom.attackedCell(cell, "hit");
    } else {
      dom.attackedCell(cell, "miss");
    }
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
  }

  computerMove(enemyPlayer) {
    let validPoint = false;
    let board = enemyPlayer.board;

    while (!validPoint) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      const validMove = board.receiveAttack([row, col]);

      if (validMove) {
        validPoint = true;
        console.log("computerMove Complete");
        console.log("Computer Attacked" + row + " " + col);
        const cell = document.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"][data-player="${enemyPlayer.name}"]`
        );
      }
    }
  }
}

export { RealPlayer, ComputerPlayer };
