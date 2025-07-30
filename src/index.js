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

  async function playRound(e) {
    const cell = e.target.closest(".cell");
    if (!cell) return;

    // first user attacks
    const enemy = cell.dataset.player === player1.name ? player1 : player2;
    let skipComp = player1.playerMove(cell, enemy);

    // disable reset btn and enemy board while computer move
    dom.disableResetBtn();
    dom.disableBoardToggle(player2);

    // computer attacks

    if (!skipComp) {
      if (player2 instanceof ComputerPlayer) {
        let playAgain = true;
        while (playAgain) {
          playAgain = await player2.computerMove(player1);
        }
      } else {
        // player2 attacks if coop mode (If want to add this feature)
      }
    }

    // reenable board after move
    dom.disableBoardToggle(player2);

    // check if game over

    const check = checkIfGameOver(player1, player2);

    if (check) {
      // if won disable board and enable reset btn
      dom.gameOverResetBtn();
      dom.disableBoardToggle(player2);
    } else {
      // enable reset btn on player turn
      dom.enableResetBtn();
    }
  }

  function checkIfGameOver(player1, player2) {
    if (player1.board.areAllShipsSunk() || player2.board.areAllShipsSunk()) {
      let winner = player1.board.areAllShipsSunk()
        ? player2.name
        : player1.name;
      if (winner === player2.name) {
        dom.updateGameLog(`Game Over, ${winner} has won!!`);
      } else {
        dom.updateGameLog(`Game Over, ${winner} have won!!`);
      }
      return true;
    }
    return false;
  }
}

window.addEventListener("DOMContentLoaded", initGame);
