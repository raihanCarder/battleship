import Ship from "./ship";

test("ship gets hit", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("ship sinks after 3 hits", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
