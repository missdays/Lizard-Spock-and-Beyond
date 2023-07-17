
document.addEventListener("DOMContentLoaded", function() {
    //this will add event listener to buttons
    let buttonElements = document.getElementsByTagName("button");

    for (let button of buttonElements) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "retry") {
                retry();
            } else {
                let selectedGameOption = this.getAttribute("data-type");
                playGame(selectedGameOption);
            }
        });
    }
});

// contains data of who will defeat the other
let defeatedBy = {
    rock : ['scissors', 'lizard'],
    paper : ['rock', 'spock'],
    scissors : ['paper', 'lizard'],
    lizard : ['paper', 'spock'],
    spock : ['scissors', 'rock']
  };

//computer will store options 
let gameOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function playGame(selectedGameOption){
    //will store the result from computerPlay
    let computerOption = computerPlay();
    document.getElementById("bot-play").innerText=computerOption;
    //check if it's a draw
    if (computerOption ===selectedGameOption){
        document.getElementById("winner").innerText="Draw!";
    }else if(defeatedBy[selectedGameOption].includes(computerOption)) {
        //tell the player s/he wins    
        document.getElementById("winner").innerText="You win!";
    } else {
        document.getElementById("winner").innerText="Bot wins!";
    }
}


//gameOptionsEasy gameOptionsMedium gameOptionsHard
function computerPlay(){
    //Creates a random number between 0 and 4
    let index = Math.floor(Math.random() * 5);
    let option = gameOptions[index];
    return option;
}