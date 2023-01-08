window.onload = function () {

    
    document.addEventListener('keyup', checkNumpad)

    let formInput1 = document.querySelector("#Xname");
    formInput1.value = sessionStorage.getItem("PlayerX");
    let formInput2 = document.querySelector("#Oname");
    formInput2.value = sessionStorage.getItem("PlayerO");
    const formButton = document.querySelector(".save");

    const resetScoreButton = document.querySelector("#resetScore")
    var player1 = document.querySelectorAll(".playerX")
    var player2 = document.querySelectorAll(".playerO")
    var Xscore = document.querySelector(".Xresult")
    var Oscore = document.querySelector(".Oresult")
    var Xresult = 0
    var Oresult = 0

    function checkNumpad() {
        if (document.querySelector(".inputName").style.display == "none") {
        switch (event.code) {
            case "Numpad1":
                userAction(document.getElementById("1"), 6)
                break;
            case "Numpad2":
                userAction(document.getElementById("2"), 7)
                break;
            case "Numpad3":
                userAction(document.getElementById("3"), 8)
                break;
            case "Numpad4":
                userAction(document.getElementById("4"), 3)
                break;
            case "Numpad5":
                userAction(document.getElementById("5"), 4)
                break;
            case "Numpad6":
                userAction(document.getElementById("6"), 5)
                break;
            case "Numpad7":
                userAction(document.getElementById("7"), 0)
                break;
            case "Numpad8":
                userAction(document.getElementById("8"), 1)
                break;
            case "Numpad9":
                userAction(document.getElementById("9"), 2)
                break;
        }
    }


    }
    if (sessionStorage.getItem("Xresult")) {
        Xscore.innerHTML = sessionStorage.getItem("Xresult")
        Xresult = parseInt(sessionStorage.getItem("Xresult"), 10)
    }
    if (sessionStorage.getItem("Oresult")) {

        Oresult = parseInt(sessionStorage.getItem("Oresult"), 10)
        Oscore.innerHTML = sessionStorage.getItem("Oresult")
    }


    // the default state is 'disabled'
    formButton.disabled = true;
    if (formInput1.value !== "" && formInput2.value !== "") {
        formButton.disabled = false
    }
    // alternative is to use "change" - explained below
    formInput1.addEventListener("keyup", buttonState);
    formInput2.addEventListener("keyup", buttonState);

    function buttonState() {
        if (document.querySelector("#Xname").value === "" || document.querySelector("#Oname").value === "") {
            formButton.disabled = true; // return disabled as true whenever the input field is empty
        } else {
            formButton.disabled = false; // enable the button once the input field has content
        }
    }

    formButton.addEventListener("click", closeNameEntry)

    function closeNameEntry() {

        var x = formInput1.value
        var o = formInput2.value
        sessionStorage.setItem("PlayerX", x)
        sessionStorage.setItem("PlayerO", o)
        player1.forEach(item => item.innerHTML = sessionStorage.getItem("PlayerX"))/* sessionStorage.getItem("playerX") */
        player2.forEach(item => item.innerHTML = sessionStorage.getItem("PlayerO")) /* sessionStorage.getItem("playerO") */
        document.querySelector(".inputName").style.display = "none"
    }
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">' + sessionStorage.getItem("PlayerO") + '</span> Won';
                Oresult += 1
                sessionStorage.setItem("Oresult", Oresult)
                Oscore.innerHTML = sessionStorage.getItem("Oresult")
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">' + sessionStorage.getItem("PlayerX") + '</span> Won';
                Xresult += 1
                sessionStorage.setItem("Xresult", Xresult)
                Xscore.innerHTML = sessionStorage.getItem("Xresult")
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'X') {
            playerDisplay.innerText = sessionStorage.getItem("PlayerX");
        }
        else {
            playerDisplay.innerText = sessionStorage.getItem("PlayerO");
        }

        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    const resetScore = () => {
        sessionStorage.removeItem("Xresult")
        sessionStorage.removeItem("Oresult")
        Xresult = 0
        Oresult = 0
        Xscore.innerHTML = 0
        Oscore.innerHTML = 0
        resetBoard()
    }
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
    resetScoreButton.addEventListener('click', resetScore)



}