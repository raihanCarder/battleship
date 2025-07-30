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
    this.queue = [];
  }

  async computerMove(enemyPlayer) {
    let validPoint = false;
    let board = enemyPlayer.board;

    while (!validPoint) {
      let row, col;

      if (this.queue.length) {
        const firstEl = this.queue.shift();
        let randomCord;

        row = firstEl[0];
        col = firstEl[1];

        const tempArr = this.#getValidAdjMoves(row, col, board);

        if (tempArr.length) {
          randomCord = tempArr[this.#getRandomNum(tempArr.length)];
          row = randomCord[0];
          col = randomCord[1];
        } else {
          // fail safe
          row = this.#getRandomNum(10);
          col = this.#getRandomNum(10);
        }
      } else {
        row = this.#getRandomNum(10);
        col = this.#getRandomNum(10);
      }

      const validMove = board.receiveAttack([row, col]);

      // if valid then see if hit or miss

      if (validMove) {
        validPoint = true;

        const key = `${row},${col}`;
        const cell = document.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"][data-player="${enemyPlayer.name}"]`
        );

        await this.#delay(800);

        // hit case
        if (board.shipCords[key]) {
          dom.attackedCell(cell, true);
          if (board.shipCords[key].ship.isSunk()) {
            dom.updateGameLog(
              `Computer Sinks your Ship of length ${board.shipCords[key].ship.length}!`
            );
          } else {
            dom.updateGameLog(`Computer Hits at ${row},${col}!`);
          }

          this.queue.push([row, col]);
          return true; // thus move again (code in index)
        } else {
          // miss case
          dom.attackedCell(cell, false);
          dom.updateGameLog(`Computer Misses at ${row},${col}! Your Turn!`);
          return false; // thus turn ends (code in index)
        }
      }
    }
  }

  #getValidAdjMoves(row, col, board) {
    const directions = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ];
    const valid = [];

    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      const key = `${r},${c}`;

      if (r < 0 || r > 9 || c < 0 || c > 9) continue;
      if (board.missedAttacks.has(key)) continue;
      if (board.shipCords[key]) {
        if (board.shipCords[key].hit) {
          continue;
        }
      }

      valid.push([r, c]);
    }

    return valid;
  }

  #delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  #getRandomNum(length) {
    return Math.floor(Math.random() * length);
  }
}

export { RealPlayer, ComputerPlayer };
