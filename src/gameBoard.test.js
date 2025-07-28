import GameBoard from "./gameBoard";

test("places a ship at specific coordinates horizontal", () => {
  const board = new GameBoard();
  board.placeShip([0, 0], "horizontal", 3);

  // Check that all coordinates are occupied by the same ship
  expect(board.shipCords["0,0"].ship).toBeDefined();
  expect(board.shipCords["0,1"].ship).toBeDefined();
  expect(board.shipCords["0,2"].ship).toBeDefined();
});

test("places a ship at specific coordinates vertical", () => {
  const board = new GameBoard();
  board.placeShip([0, 0], "vertical", 3);

  // Check that all coordinates are occupied by the same ship
  expect(board.shipCords["0,0"].ship).toBeDefined();
  expect(board.shipCords["1,0"].ship).toBeDefined();
  expect(board.shipCords["2,0"].ship).toBeDefined();
});

test("Test ship getting hit", () => {
  const board = new GameBoard();
  board.placeShip([0, 0], "vertical", 3);

  expect(board.shipCords["0,0"].ship).toBeDefined();
  expect(board.shipCords["1,0"].ship).toBeDefined();
  expect(board.shipCords["2,0"].ship).toBeDefined();

  board.receiveAttack([0, 0]);
  expect(board.shipCords["0,0"].ship.timesHit).toBe(1);
});

test("Test All Ships sunk", () => {
  const board = new GameBoard();
  board.placeShip([0, 0], "vertical", 3);

  expect(board.shipCords["0,0"].ship).toBeDefined();
  expect(board.shipCords["1,0"].ship).toBeDefined();
  expect(board.shipCords["2,0"].ship).toBeDefined();

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 0]);
  board.receiveAttack([2, 0]);
  expect(board.shipCords["0,0"].ship.isSunk()).toBe(true);
});
