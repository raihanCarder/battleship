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
