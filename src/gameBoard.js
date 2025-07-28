import Ship from "./ship";

export default class GameBoard {
  constructor(boardLength = 10, boardHeight = 10) {
    this.length = boardLength;
    this.height = boardHeight;
    this.missedAttacks = [];
    this.shipCords = {};
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
  }
}
