document.addEventListener("DOMContentLoaded", function() {
    //this will add event listener to buttons
    let buttonElements = document.getElementsByTagName("button");

    for (let button of buttonElements) {
        button.addEventListener("click", function() {
            //Retry button to reset the game
            if (this.getAttribute("data-type") === "retry") {
                resetGame();
            } else {
                let selectedGameOption = this.getAttribute("data-type");
                playGame(selectedGameOption);
            }
        });
    }
});

//Game starter
function playGame(selectedGameOption){

    //disable level dropdown when game is started
    getLevelField().disabled = true;

    // contains data of who will defeat the other
    let defeatedBy = {
        rock : ['scissors', 'lizard'],
        paper : ['rock', 'spock'],
        scissors : ['paper', 'lizard'],
        lizard : ['paper', 'spock'],
        spock : ['scissors', 'rock']
    };

    //will store the bot choice
    let computerOption = computerPlay();
    getBotChoiceField().innerText = computerOption;
    
    //check if it's a draw
    if (computerOption === selectedGameOption){
        draw();
    }else if(defeatedBy[selectedGameOption].includes(computerOption)) {
        playerScores();
    } else {
       botScores();
    }

    //get round number
    let roundNumber = parseInt(getRoundField().innerText);
    
    //verify if last round was reached
    if (roundNumber === 6){
        endGame();
    } else {
        //increments the round number
        getRoundField().innerText = ++roundNumber;
    }
}

function draw(){
    let drawText = getWinnerField();
    drawText.innerText ="Draw!";
    drawText.style.backgroundColor = "#fade8f";
}

function playerScores(){
    //increase player score 
    let playerScoreField = getPlayerScoreField();
    let playerScore = parseInt(playerScoreField.innerText); 
    playerScoreField.innerText = ++playerScore;

    //tell player s/he wins
    let playerWinText = getWinnerField();
    playerWinText.innerText = "You win!";
    playerWinText.style.backgroundColor = "#9dd882";
    
}

function botScores(){
    //increase bot score
    let botScoreField = getBotScoreField();
    let botScore = parseInt(botScoreField.innerText);
    botScoreField.innerText = ++botScore;

    //tells player bot wins
    let botWinText = getWinnerField();
    botWinText.innerText="Bot wins!";
    botWinText.style.backgroundColor = "#f5918a";
}

function computerPlay(){
    //Easy Level options
    let gameOptions = ['rock', 'paper'];

    let level = getDifficultyLevel();

    if(level === "auto"){
        //get the round number to set level of difficulty
        let roundNumber = parseInt(getRoundField().innerText);
        
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
    } else if (level === "hard"){
        gameOptions.push('scissors');
        gameOptions.push('lizard');
        gameOptions.push('spock');
    }

    //Creates a random number according to gameOptions difficulty Level
    let index = Math.floor(Math.random() * gameOptions.length);
    let option = gameOptions[index];
    return option;
}

//Difficulty Level Select Option
function getDifficultyLevel() {
    let selectElement = getLevelField();
    let selectedIndex = selectElement.selectedIndex;
    let selectedOption = selectElement.options[selectedIndex].value;
    return selectedOption;
  }

//end game function 
function endGame(){
    let finalPlayerScore = parseInt(getPlayerScoreField().innerText);
    let finalBotScore = parseInt(getBotScoreField().innerText);

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
    getRoundField().innerText = "1";
    getBotScoreField().innerText = "0";
    getPlayerScoreField().innerText = "0";
    getWinnerField().innerText = "";
    getBotChoiceField().innerText="";
    getLevelField().disabled = false;
}

//get fields

function getPlayerScoreField(){
    return document.getElementById("player-score");
}

function getRoundField(){
    return document.getElementById("round-number");
}

function getWinnerField(){
    return document.getElementById("winner");
}

function getBotScoreField(){
    return document.getElementById("bot-score");
}

function getBotChoiceField(){
    return document.getElementById("bot-play");
}

function getLevelField(){
    return document.getElementById("difficulty-level");
}