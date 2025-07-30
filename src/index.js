import "./styles.css";
import { RealPlayer, ComputerPlayer } from "./player";
import { dom, initDomManager } from "./dom";

let player1, player2;

function initGame() {
  player1 = new RealPlayer("You");
  player2 = new ComputerPlayer();
  player1.board.placeRandomFullFleet();
  player2.board.placeRandomFullFleet();
  initDomManager(playRound);
  dom.initDom(player1, player2, "Computer");

  function playRound(e) {
    const cell = e.target.closest(".cell");
    if (!cell) return;

    // first user attacks
    const enemy = cell.dataset.player === player1.name ? player1 : player2;
    player1.playerMove(cell, enemy);

    // computer attacks

    if (player2 instanceof ComputerPlayer) {
      player2.computerMove(player1);
    } else {
      // player2 attacks if coop mode (If want to add this feature)
    }

    // check if game over

    if (player1.board.areAllShipsSunk() || player2.board.areAllShipsSunk()) {
      console.log("GAMEOVER");
    }
  }
}

window.addEventListener("DOMContentLoaded", initGame);
