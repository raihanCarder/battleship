import Ship from "./ship";

export default class GameBoard {
  constructor(boardLength = 10, boardHeight = 10) {
    this.length = boardLength;
    this.height = boardHeight;
    this.missedAttacks = [];
    this.shipCords = {};
    this.allShips = [];
  }

  placeShip(startCord, direction, length) {
    // currently assumes input is valid

    const ship = new Ship(length);
    const [x, y] = startCord;
    let rowDiff = 0,
      colDiff = 0;

    // check if out of bounds

    // check if all spaces are open

    if (direction === "horizontal") {
      colDiff = 1;
    } else {
      rowDiff = 1;
    }

    for (let i = 0; i < length; i++) {
      const key = `${x + i * rowDiff},${y + i * colDiff}`;
      this.shipCords[key] = {
        ship: ship,
        hit: false,
      };
    }
    this.allShips.push(ship);
  }

  receiveAttack(cord) {
    // doesn't check if cord already hit or in missed attacks
    const key = `${cord[0]},${cord[1]}`;
    const target = this.shipCords[key];

    if (target) {
      target.ship.hit();
      target.hit = true;
      return;
    }
    this.missedAttacks.push(cord);
  }

  areAllShipsSunk() {
    for (let ship of this.allShips) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
