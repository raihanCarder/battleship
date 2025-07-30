import "./styles.css";
import { RealPlayer, ComputerPlayer } from "./player";
import domManager from "./dom";

export let player1 = "";
export let player2 = "";

function initGame() {
  player1 = new RealPlayer("Raihan");
  player2 = new ComputerPlayer();
  player1.board.placeRandomFullFleet();
  player2.board.placeRandomFullFleet();

  const dom = domManager(playRound);
  dom.initDom(player1, player2, "Computer");

  function playRound(e) {
    const cell = e.target.closest(".cell");
    if (!cell) return;

    // first user attacks
    const enemy = cell.dataset.player === player1.name ? player1 : player2;
    player1.playerMove(cell, dom, enemy);

    // computer attacks

    if (player2 instanceof ComputerPlayer) {
      player2.computerMove(player1);
    }

    // player2 attacks if coop mode

    // check if game over

    if (player1.board.areAllShipsSunk() || player2.board.areAllShipsSunk()) {
      console.log("GAMEOVER");
    }
  }
}

window.addEventListener("DOMContentLoaded", initGame);
