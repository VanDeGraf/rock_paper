
function computerPlay() {
    let rand = Math.random();
    if (rand < 0.33) {
        return "Rock";
    } else if (rand < 0.66) {
        return "Paper";
    } else {
        return "Scissors";
    }
}



function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        return { msg: "Draw!! Same selections", result: null };
    } else if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            return roundResultMsg(false, playerSelection, computerSelection);
        } else if (computerSelection === "Scissors") {
            return roundResultMsg(true, playerSelection, computerSelection);
        }
    } else if (playerSelection === "Paper") {
        if (computerSelection === "Rock") {
            return roundResultMsg(true, playerSelection, computerSelection);
        } else if (computerSelection === "Scissors") {
            return roundResultMsg(false, playerSelection, computerSelection);
        }
    } else if (playerSelection === "Scissors") {
        if (computerSelection === "Rock") {
            return roundResultMsg(false, playerSelection, computerSelection);
        } else if (computerSelection === "Paper") {
            return roundResultMsg(true, playerSelection, computerSelection);
        }
    }
}

function roundResultMsg(isPlayerWin, playerSelection, computerSelection) {
    return {
        msg: "You " + (isPlayerWin ? "Win" : "Lose") + "! " +
            (isPlayerWin ? playerSelection : computerSelection) + " beats " +
            (isPlayerWin ? computerSelection : playerSelection),
        result: isPlayerWin
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
    let win = 0;
    let lose = 0;

    for (let round = 1; round <= 5; round++) {
        let result = playRound(getPlayerSelection(), computerPlay());
        console.log("Round " + round + ": " + result.msg);
        if (result.result !== null) {
            if (result.result) {
                win++;
            } else {
                lose++;
            }
        }
    }

    console.log("Score " + win + ":" + lose + ", " +
        (win == lose ? "Draw!" : ("You " + (win > lose ? "Win" : "Lose") + "!")));
}

game();