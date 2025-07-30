import Ship from "./ship";

export default class GameBoard {
  constructor(boardLength = 10, boardHeight = 10) {
    this.length = boardLength;
    this.height = boardHeight;
    this.missedAttacks = new Set();
    this.shipCords = {};
    this.allShips = [];
  }

  placeShip(startCord, direction, length) {
    const ship = new Ship(length);
    const row = startCord[0];
    const col = startCord[1];
    const directionHorizontal = direction === "horizontal" ? true : false;
    let rowDiff = 0,
      colDiff = 0;

    if (!this.#isInBounds(row, col, directionHorizontal, length)) return false;

    if (directionHorizontal) {
      colDiff = 1;
    } else {
      rowDiff = 1;
    }

    // case where one point of new ship is already taken

    if (this.#doesOverlap(row, col, direction, length)) return false;

    // safe, create ship

    for (let i = 0; i < length; i++) {
      const key = `${row + i * rowDiff},${col + i * colDiff}`;
      this.shipCords[key] = {
        ship: ship,
        hit: false,
      };
    }

    this.allShips.push(ship);

    return true;
  }

  #isInBounds(x, y, directionHorizontal, length) {
    // case where trying to place horizontally but no space for ship
    if (y + length > this.length && directionHorizontal) return false;

    // case where trying to place vertically but no space for ship
    if (x + length > this.height && !directionHorizontal) return false;

    return true;
  }

  #doesOverlap(x, y, direction, length) {
    const rowDiff = direction === "horizontal" ? 0 : 1;
    const colDiff = direction === "horizontal" ? 1 : 0;

    for (let i = 0; i < length; i++) {
      const key = `${x + i * rowDiff},${y + i * colDiff}`;
      if (this.shipCords[key]) return true;
    }

    return false;
  }

  randomShipPlacement(length) {
    let foundCord = false;
    while (!foundCord) {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 9);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      let isHorizontal = direction === "horizontal" ? true : false;

      if (
        this.#isInBounds(x, y, isHorizontal, length) &&
        !this.#doesOverlap(x, y, direction, length)
      ) {
        foundCord = true;
        this.placeShip([x, y], direction, length);
      }
    }
  }

  placeRandomFullFleet(lengths = [5, 3, 2, 3, 1]) {
    for (let length of lengths) {
      this.randomShipPlacement(length);
    }
  }

  receiveAttack(cord) {
    // doesn't check if cord already hit or in missed attacks
    const key = `${cord[0]},${cord[1]}`;
    const target = this.shipCords[key];

    // already missed return false
    if (this.missedAttacks.has(key)) return false;

    // on ship cord

    if (target) {
      // if already hit return false
      if (target.hit) return false;

      // else target exists and not hit so hit

      target.ship.hit();
      target.hit = true;
      return true;
    }

    // if not in missed attacks add
    this.missedAttacks.add(key);

    return true;
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
