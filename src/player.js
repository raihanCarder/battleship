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
}

class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
  }
}

export { RealPlayer, ComputerPlayer };
