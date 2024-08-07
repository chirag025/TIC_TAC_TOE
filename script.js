const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector(".game-status");
const newGameBtn = document.querySelector(".newBtn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // Diagonal winning positions
    [2, 4, 6]  // Diagonal winning positions
]


// let's create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // UI pr empty bhi krna pdega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing
        boxes[index].classList.remove("win");
        // or....set to default properties of class
        // box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameStatus.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        hangleClick(index);
    })
});

function hangleClick(index){
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        // swap kro turn ko
        swapTurn();

        // check koi win to nhi kr gya
        checkWin();

    }
}

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // UI Update
    gameStatus.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin(){    // most important func.
    let answer = "";

    winningPositions.forEach((position) => {
        const first = gameGrid[position[0]];
        const second = gameGrid[position[1]];
        const third = gameGrid[position[2]];
        // all 3 boxes should be non-empty and exactly same in value
        if((first !== "" && second !== "" && third !== "") && (first === second && second === third && third === first)){

            // check if winner is X
            if(first === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    // UI pr show krne ka kaam
    if(answer !== ""){  
        gameStatus.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");

        // jb winner mil gya to further click events ko stop krdo
        boxes.forEach(box => box.style.pointerEvents = "none");

        return;
    }
    else if(!gameGrid.includes("")){    // when there is a tie
        gameStatus.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }

    // OR
    // for game tie check

    // let fillCount = 0;
    // gameGrid.forEach(box => {
    //     if(box !== "") fillCount++;
    // })

    // if(fillCount == 9) {
    //     gameStatus.innerText = `Game Tied !`;
    //     newGameBtn.classList.add("active");
    // }
}


newGameBtn.addEventListener('click', initGame);