
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

function playGame(selectedGameOption){
    // contains data of who will defeat the other
    let defeatedBy = {
        rock : ['scissors', 'lizard'],
        paper : ['rock', 'spock'],
        scissors : ['paper', 'lizard'],
        lizard : ['paper', 'spock'],
        spock : ['scissors', 'rock']
    };

    //will store the result from computerPlay
    let computerOption = computerPlay();
    document.getElementById("bot-play").innerText=computerOption;
    
    //check if it's a draw
    if (computerOption ===selectedGameOption){
        document.getElementById("winner").innerText="Draw!";
    }else if(defeatedBy[selectedGameOption].includes(computerOption)) {
        playerScores();
    } else {
       botScores();
    }

    //increment round numbers
    let roundNumber = parseInt(document.getElementById('round-number').innerText);
    //verify if round number is equal to 6
    if (roundNumber === 6){
        endGame();
    } else {
        document.getElementById("round-number").innerText = ++roundNumber;
    }

}

function playerScores(){
    //tell player s/he wins  
    let playerScore = parseInt(document.getElementById('player-score').innerText);  
    document.getElementById("winner").innerText="You win!";
    document.getElementById("player-score").innerText = ++playerScore;
}

function botScores(){
    //tells player bot wins
    let botScore = parseInt(document.getElementById('bot-score').innerText);
    document.getElementById("winner").innerText="Bot wins!";
    document.getElementById("bot-score").innerText = ++botScore;
}

//gameOptionsEasy gameOptionsMedium gameOptionsHard
function computerPlay(){
    //computer will store options 
    let gameOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    //Creates a random number between 0 and 4
    let index = Math.floor(Math.random() * 5);
    let option = gameOptions[index];

    return option;
}

//end game function 
function endGame(){
    let finalPlayerScore = parseInt(document.getElementById("player-score").innerText);
    let finalBotScore = parseInt(document.getElementById("bot-score").innerText);

    if(finalPlayerScore === finalBotScore){
        alert("Final Game Result: DRAW!")
    } else if (finalPlayerScore > finalBotScore){
        alert("Final Game Result: YOU WIN!")
    } else {
        alert("Final Game Result: YOU LOSE!")
    }
    resetGame();
}

//reset the game
function resetGame(){
    document.getElementById("round-number").innerText = "1";
    document.getElementById("bot-score").innerText = "0";
    document.getElementById("player-score").innerText = "0";
}