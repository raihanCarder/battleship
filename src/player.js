import GameBoard from "./gameBoard";
import { dom } from "./dom";

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

  playerMove(cell, enemy) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    const attackHit = enemy.board.receiveAttack([row, col]);
    const key = `${row},${col}`;

    if (attackHit && enemy.board.shipCords[key]) {
      dom.attackedCell(cell, true);
      if (enemy.board.shipCords[key].ship.isSunk()) {
        dom.updateGameLog(
          `Computer Ship Sunk of Length ${enemy.board.shipCords[key].ship.length}. YOUR TURN`
        );
      } else {
        dom.updateGameLog(`Ship Hit @ ${row},${col}! Shoot Again!`);
      }

      return true;
    } else {
      dom.attackedCell(cell, false);
      dom.updateGameLog(`You Miss!`);

      return false;
    }
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
  }

  async computerMove(enemyPlayer) {
    let validPoint = false;
    let board = enemyPlayer.board;

    while (!validPoint) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      const validMove = board.receiveAttack([row, col]);

      if (validMove) {
        validPoint = true;

        const key = `${row},${col}`;
        const cell = document.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"][data-player="${enemyPlayer.name}"]`
        );

        await this.#delay(800);

        if (enemyPlayer.board.shipCords[key]) {
          dom.attackedCell(cell, true);
          if (enemyPlayer.board.shipCords[key].ship.isSunk()) {
            dom.updateGameLog(
              `Computer Sinks your Ship of length ${enemyPlayer.board.shipCords[key].ship.length}!`
            );
          } else {
            dom.updateGameLog(`Computer Hits at ${row},${col}!`);
          }
          return true;
        } else {
          dom.attackedCell(cell, false);
          dom.updateGameLog(`Computer Misses at ${row},${col}! Your Turn!`);
          return false;
        }
      }
    }
  }

  #delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export { RealPlayer, ComputerPlayer };
