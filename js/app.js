let oSelected = false;
let vsPlayer;
let printImg = "X";
let matchCount = 1;
let xScore = 0;
let oScore = 0;
let ties = 0;
let moves = 0;
let index = 0;
let axisIndex = 0;
let xMoves = new Set();
let oMoves = new Set();
let winner = "";
let winnerCombo = [
["spot11","spot12","spot13"],
["spot21","spot22","spot23"],
["spot31","spot32","spot33"],
["spot11","spot21","spot31"],
["spot12","spot22","spot32"],
["spot13","spot23","spot33"],
["spot11","spot22","spot33"],
["spot13","spot22","spot31"]];

let lineAxis =  [
[6.5,14.5,93.5,14.5],
[6.5,49.5,93.5,49.5],
[6.5,84.5,93.5,84.5],
[15,93,15,6.5],
[50,93,50,6.5],
[84.5,93,84.5,6.5],
[6.5,6,93,92],
[6.5,93,93,6.5]];

// Printing Xs and Os
function printImage(length, item) {

  console.log(length);
  console.log(item);
  console.log(printImg);

  if (length != 3) {

    document.querySelector("." + item).firstChild.src = 'images/' + printImg + '-th1.png';
    document.querySelector("." + item).classList.add("locked");

    moves++;
    if (printImg === "X") {
      xMoves.add(item);
      printImg = "O";
    } else {
      oMoves.add(item);
      printImg = "X";
    }

    setTimeout(function() {
      document.querySelector(".turn-img").src = 'images/' + printImg + '-th1.png';
    }, 150);

    if (moves > 4) {
      checkWinner();

      if (winner === "X") {
        //X Wins
        renderLine();
        printwinner();
        xScore++;
      } else if (winner === "O") {
        //X Wins
        renderLine();
        printwinner();
        oScore++;
      } else if (winner === "" && moves == 9) {
        //Tie Match
        winner = "T";
        printwinner();
        ties++;
      }
    }
  }
}
//End

//Check the Winner
function checkWinner() {

index = 0;
winnerCombo.forEach(arr => {

  let xtrue = 0;
  let otrue = 0;

  for ( let i = 0; i < arr.length; i++) {
    if (xMoves.has(arr[i])) {
     xtrue++;
    }
    if (oMoves.has(arr[i])) {
    otrue++;
    }
  }

  if(xtrue == 3){
    winner = "X";
    axisIndex = index;
    return;
  }
  if(otrue == 3){
    winner = "O";
    axisIndex = index;
    return;
  }
  index++;
});

}
//End

//Render Winner Line
function renderLine(){

document.querySelector("line").x1.baseVal.value = lineAxis[axisIndex][0];
document.querySelector("line").y1.baseVal.value =  lineAxis[axisIndex][1];
document.querySelector("line").x2.baseVal.value =  lineAxis[axisIndex][2];
document.querySelector("line").y2.baseVal.value =  lineAxis[axisIndex][3];

if(winner=== "T"){
  document.querySelector("line").style.display = "none";
}

if(winner === "X"){
document.querySelector("line").style.stroke = "#be4d25";

}

if(winner === "O"){
document.querySelector("line").style.stroke = "#bea925";

}

setTimeout(function() {
  document.querySelector(".svg-comtainer").classList.remove("not-display");
}, 200);
}
//End

//Print Winner Banners
function  printwinner(){

if(winner === "T"){
  document.querySelector(".winner-p").innerHTML = "A TIE !!!";
}

  setTimeout(function() {
    document.querySelector(".winner-img").src = 'images/' + winner + '-th1.png';
    document.querySelector(".item-w").classList.remove("not-shown");
    document.querySelector(".bottom-div-2").classList.remove("not-shown");
  }, 200);

}
//End

// Next Match function

function nextMatch() {
  //Change who begins
  if (oSelected) {
    oSelected = false;
  } else {
    oSelected = true;
  }
  if (oSelected) {
    printImg = "O";
  } else {
    printImg = "X";
  }

  // Print Scores and Matchs
  matchCount++;
  document.querySelector(".match-counter-btn").lastElementChild.innerHTML = matchCount;
  document.querySelector(".x-score").lastElementChild.innerHTML = xScore;
  document.querySelector(".o-score").lastElementChild.innerHTML = oScore;
  document.querySelector(".ties").lastElementChild.innerHTML = ties;

}

function clearBorad(){

  document.querySelector(".svg-comtainer").classList.add("not-display");
  document.querySelector(".item-w").classList.add("not-shown");
  document.querySelector(".bottom-div-2").classList.add("not-shown");
  xMoves.clear();
  oMoves.clear();
  moves = 0;
  index = 0;
  axisIndex = 0;
  winner = "";
  document.querySelector(".winner-p").innerHTML = "WINs !!!";
  document.querySelector(".turn-img").src = 'images/' + printImg + '-th1.png';

  for (let i = 0; i < 9; i++) {
    document.querySelectorAll(".item")[i].firstChild.src = '';
    document.querySelectorAll(".item")[i].classList.remove("locked");
  }
}

function endGame(){

 if(oScore > xScore){
   // O WINs
  document.querySelector(".final-h3").innerHTML = "GAME WINNER !!!";
  document.querySelector(".end-winner-img").src = 'images/O-th1.png';
 }
 if(oScore < xScore){
   // O WINs
   document.querySelector(".final-h3").innerHTML = "GAME WINNER !!!";
  document.querySelector(".end-winner-img").src = 'images/X-th1.png';
 }
 if(oScore == xScore){
   // O WINs
  document.querySelector(".final-h3").innerHTML = "TIE GAME !!!";
  document.querySelector(".end-winner-img").src = 'images/T-th1.png';
 }

}

// Popup JS
$ = function(id) {
  return document.getElementById(id);
}

var show = function(id) {
  $(id).style.display = 'block';

}
var hide = function(id) {
  $(id).style.display = 'none';
}
//-----------

// Events to swith from X to O
document.querySelector(".x-mid-img").addEventListener("click", function(e) {

  document.querySelector(".btn-picker").classList.remove("o-selected");
  oSelected = false;
  if (oSelected) {
    printImg = "O";
  } else {
    printImg = "X";
  }
});

document.querySelector(".o-mid-img").addEventListener("click", function(e) {

  document.querySelector(".btn-picker").classList.add("o-selected");
  oSelected = true;
  if (oSelected) {
    printImg = "O";
  } else {
    printImg = "X";
  }
});
//------------



//Events to dectect CPU and Player 2 Bottoms
document.querySelector(".item-btn-cpu").addEventListener("click", function(e) {

  document.querySelector(".item-btn-cpu").classList.add("clicked");
  setTimeout(function() {
    document.querySelector(".item-btn-cpu").classList.remove("clicked");
  }, 100);

  vsPlayer = false;
  console.log(vsPlayer);

  //Show Initial TURN
  document.querySelector(".turn-img").src = 'images/' + printImg + '-th1.png';

});

document.querySelector(".item-btn-player").addEventListener("click", function(e) {

  document.querySelector(".item-btn-player").classList.add("clicked");
  setTimeout(function() {
    document.querySelector(".item-btn-player").classList.remove("clicked");
  }, 100);

  setTimeout(function() {
    document.querySelector(".game-page").classList.remove("not-display");
    document.querySelector(".home-page").classList.add("not-display");
  }, 150);

  vsPlayer = true;
  console.log(vsPlayer);

  //Show Initial TURN
  document.querySelector(".turn-img").src = 'images/' + printImg + '-th1.png';

});
//-------------


// Reading Clicks on Sapce Event Listener
for (var i = 0; i < 9; i++) {
  document.querySelectorAll(".item")[i].addEventListener("click", function(e) {
    printImage(e.target.classList.length, e.target.classList[1]);
  });
}
//-------------

//Ok Buttom Next Match Event Listener
document.querySelector(".ok-next").addEventListener("click", function(e) {
  console.log("Hello");
  nextMatch();
  clearBorad();
});
//END
//Ok Buttom Next Match Event Listener
document.querySelector(".ok-reset").addEventListener("click", function(e) {
    endGame();
});
//END
//Ok Buttom Next Match Event Listener
document.querySelector(".ok-end").addEventListener("click", function(e) {
  console.log("Hello1");
  location.reload();
});
//END
