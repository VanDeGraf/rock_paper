
function computerPlay() {
    let randomThing = Math.random();
    if (randomThing < 0.33) {
        return "Rock";
    } else if (randomThing < 0.66) {
        return "Paper";
    } else {
        return "Scissors";
    }
}



function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        return { msg: "Draw!! Same selections", won: null };
    } else if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            return formatRoundResult(false, playerSelection, computerSelection);
        } else if (computerSelection === "Scissors") {
            return formatRoundResult(true, playerSelection, computerSelection);
        }
    } else if (playerSelection === "Paper") {
        if (computerSelection === "Rock") {
            return formatRoundResult(true, playerSelection, computerSelection);
        } else if (computerSelection === "Scissors") {
            return formatRoundResult(false, playerSelection, computerSelection);
        }
    } else if (playerSelection === "Scissors") {
        if (computerSelection === "Rock") {
            return formatRoundResult(false, playerSelection, computerSelection);
        } else if (computerSelection === "Paper") {
            return formatRoundResult(true, playerSelection, computerSelection);
        }
    }
}

function formatRoundResult(playerWon, playerSelection, computerSelection) {
    return {
        msg: "You " + (playerWon ? "Win" : "Lose") + "! " +
            (playerWon ? playerSelection : computerSelection) + " beats " +
            (playerWon ? computerSelection : playerSelection),
        won: playerWon
    }
}

function validatePlayerSelection(playerSelection) {
    playerSelection = playerSelection + '';
    if (playerSelection.length < 1) {
        return false;
    }
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();

    if (playerSelection !== "Rock" &&
        playerSelection !== "Paper" &&
        playerSelection !== "Scissors") {
        return false;
    }
    return playerSelection;
}


function getPlayerSelection() {
    let playerSelection;
    playerSelection = prompt("Type one of Rock, Paper or Scissors:");
    while (!(playerSelection = validatePlayerSelection(playerSelection))) {
        playerSelection = prompt("Wrong input! Type one of Rock, Paper or Scissors:");
    }
    return playerSelection;
}


function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let round = 1; round <= 5; round++) {
        let result = playRound(getPlayerSelection(), computerPlay());
        console.log("Round " + round + ": " + result.msg);
        if (result.won !== null) {
            if (result.won) {
                playerScore++;
            } else {
                computerScore++;
            }
        }
    }

    console.log("Score " + playerScore + ":" + computerScore + ", " +
        (playerScore == computerScore ? "Draw!" :
            ("You " + (playerScore > computerScore ? "Win" : "Lose") + "!")));
}

// function uiAddRoundLog(playerWon, playerSelection, computerSelection) {

// }

// game();