"use strict";

// variable declartion
const diceEl = document.querySelector(".dice");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const btnNew = document.querySelector(".newgame");
let current1 = document.querySelector("#current1");
let current2 = document.querySelector("#current2");

let active, crscore, tscores, playing, player;
function init() {
  active = 1;
  player = 1;
  playing = true;
  crscore = 0;
  tscores = [0, 0, 0];
  current1.textContent = 0;
  current2.textContent = 0;
  document.querySelector(`.player2`).classList.remove("player-winner");
  document.querySelector(`.player1`).classList.remove("player-winner");
  document.querySelector(`.player2`).classList.remove("player-active");
  document.querySelector(`.player1`).classList.add("player-active");
  document.getElementById("tscore1").textContent = 0;
  document.getElementById("tscore2").textContent = 0;
  diceEl.classList.add("hidden");
}

init();

// Dice display
diceEl.classList.add("hidden");

function switchp() {
  document.querySelector(`#current${active}`).textContent = 0;
  crscore = 0;
  active = active === 1 ? 2 : 1;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    crscore = Number(crscore + dice);
    console.log(crscore);

    if (dice != 1) {
      document.querySelector(`#current${active}`).textContent = crscore;
    } else {
      switchp();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    console.log("hold");
    tscores[active] += crscore;
    console.log(tscores[active]);
    document.getElementById(`tscore${active}`).textContent = tscores[active];

    if (tscores[active] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document.querySelector(`.player${active}`).classList.add("player-winner");
      document.querySelector(`.player${active}`).classList.add("player-active");
      document
        .querySelector(`.player${active}`)
        .getElementById("name").textContent = "winner";
    } else {
      switchp();
    }
  }
});

btnNew.addEventListener("click", init);
