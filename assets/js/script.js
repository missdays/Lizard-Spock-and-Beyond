
document.addEventListener("DOMContentLoaded", function() {
    //this will add event listener to buttons
    let buttonElements = document.getElementsByTagName("button");

    for (let button of buttonElements) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "retry") {
                resetGame();
            } else {
                let selectedGameOption = this.getAttribute("data-type");
                playGame(selectedGameOption);
            }
        });
    }
});

function playGame(selectedGameOption){

    document.getElementById("difficulty-level").disabled = true;

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
        let drawText = document.getElementById("winner");
        drawText.innerText="Draw!";
        drawText.style.backgroundColor = "#fade8f";
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
    let playerWinText =  document.getElementById("winner");
    playerWinText.innerText="You win!";
    playerWinText.style.backgroundColor = "#9dd882";
    document.getElementById("player-score").innerText = ++playerScore;
}

function botScores(){
    //tells player bot wins
    let botScore = parseInt(document.getElementById('bot-score').innerText);
    let botWinText = document.getElementById("winner");
    botWinText.innerText="Bot wins!";
    botWinText.style.backgroundColor = "#f5918a";
    document.getElementById("bot-score").innerText = ++botScore;
}

// Automatic gameOptionsEasy gameOptionsMedium gameOptionsHard
function computerPlay(){
    //Easy Level
    let gameOptions = ['rock', 'paper'];

    let level = getDifficultyLevel();
    if(level === "auto"){
        //get the round number to set level of difficulty
        let roundNumber = parseInt(document.getElementById("round-number").innerText);
        
        //Medium Level: computer will be able to choose 3 options: rock, paper, scissors
        if (roundNumber > 2){
            gameOptions.push('scissors');
        }

        //Hard Level: computer will be able to choose ALL options
        if (roundNumber > 4){
            gameOptions.push('lizard');
            gameOptions.push('spock');
        }
    } else if( level === "medium"){
        gameOptions.push('scissors');
    } else if (level ==="hard"){
        gameOptions.push('scissors');
        gameOptions.push('lizard');
        gameOptions.push('spock');
    }

    //Creates a random number according to gameOptions difficulty Level
    let index = Math.floor(Math.random()* gameOptions.length);
    let option = gameOptions[index];
    return option;
}

//Difficulty Level Select Option
function getDifficultyLevel() {
    let selectElement = document.getElementById("difficulty-level");
    let selectedIndex = selectElement.selectedIndex;
    let selectedOption = selectElement.options[selectedIndex].value;
    return selectedOption;
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
    document.getElementById("winner").innerText = "";
    document.getElementById("bot-play").innerText="";
    document.getElementById("difficulty-level").disabled = false;
}