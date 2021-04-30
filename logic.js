
function getComputerSelection() {
    let randomThing = Math.random();
    if (randomThing < 0.33) {
        return "Rock";
    } else if (randomThing < 0.66) {
        return "Paper";
    } else {
        return "Scissors";
    }
}



function isPlayerWin(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        return null;
    } else if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            return false;
        } else if (computerSelection === "Scissors") {
            return true;
        }
    } else if (playerSelection === "Paper") {
        if (computerSelection === "Rock") {
            return true;
        } else if (computerSelection === "Scissors") {
            return false;
        }
    } else if (playerSelection === "Scissors") {
        if (computerSelection === "Rock") {
            return false;
        } else if (computerSelection === "Paper") {
            return true;
        }
    }
}

function uiAddRoundLog(playerWon, playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    const log = document.querySelector('#roundslog');
    const container = document.createElement('div');
    container.classList.add('versus', 'versus-small',
        (playerWon === null ? 'tie' : playerWon ? 'win' : 'lose'));
    let img = document.createElement('img');
    img.classList.add('versus-left');
    img.setAttribute('src', `img/${playerSelection}.svg`);
    img.setAttribute('alt', `${playerSelection} hand`);
    container.appendChild(img);
    img = document.createElement('img');
    img.classList.add('versus-right');
    img.setAttribute('src', `img/${computerSelection}.svg`);
    img.setAttribute('alt', `${computerSelection} hand`);
    container.appendChild(img);
    log.appendChild(container);
}

function uiChangeRoundResult(playerWon, playerSelection, computerSelection) {
    const roundDesc = playerWon == null ? 'Tie! Selections are same!' :
        "You " + (playerWon ? "Win" : "Lose") + " this round! " +
        (playerWon ? playerSelection : computerSelection) + " beats " +
        (playerWon ? computerSelection : playerSelection);
    document.querySelector('#result-desc h3').innerText = roundDesc;

    const imgLeft = document.querySelector('.versus-big .versus-left');
    const imgRight = document.querySelector('.versus-big .versus-right');
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    imgLeft.setAttribute('src', `img/${playerSelection}.svg`);
    imgLeft.setAttribute('alt', `${playerSelection} hand`);
    imgRight.setAttribute('src', `img/${computerSelection}.svg`);
    imgRight.setAttribute('alt', `${computerSelection} hand`);
}

function uiEndGame(playerWon) {
    document.querySelector('main>h3').remove();
    document.querySelector('#selection').remove();
    document.querySelector('#result').remove();
    const h = document.createElement('h1');
    h.innerText = playerWon == null ? 'Tie! No winners!' :
        playerWon ? 'You Win!' : 'You Lose!';
    h.setAttribute('align', 'center');
    document.querySelector('main').appendChild(h);
    const p = document.createElement('p');
    p.innerText = "Reload page to play again."
    p.setAttribute('align', 'center');
    document.querySelector('main').appendChild(p);
}

function uiUpdateScore(playerScore, computerScore) {
    document.querySelector('#score-player').innerText = "Player: " + playerScore;
    document.querySelector('#score-computer').innerText = "Computer: " + computerScore;
}

let playerScore = 0;
let computerScore = 0;

let currentRound = 1;
let maxRound = 5;

function playRound(event) {
    const computerSelection = getComputerSelection();
    const playerSelection = event.target.dataset.value;
    const playerWon = isPlayerWin(playerSelection, computerSelection);
    playerScore += playerWon ? 1 : 0;
    computerScore += playerWon === false ? 1 : 0;
    uiAddRoundLog(playerWon, playerSelection, computerSelection);
    uiChangeRoundResult(playerWon, playerSelection, computerSelection);
    uiUpdateScore(playerScore, computerScore);
    currentRound++;
    if (currentRound > maxRound) {
        uiEndGame(playerScore == computerScore ? null : playerScore > computerScore);
    }
}

document.querySelectorAll('.button').forEach((element) => {
    element.addEventListener('click', playRound);
});
