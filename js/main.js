const player1 = 'X';
const player2 = 'O';

const COMBOS = [
    // Rows
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    // Cols
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    // Diagonals
    [0,5,10,15],
    [3,6,9,12],
    // Corners
    [0,3,12,15],
    // Squares
    [0,1,4,5],
    [1,2,5,6],
    [2,3,6,7],
    [4,5,8,9],
    [5,6,9,10],
    [6,7,10,11],
    [8,9,12,13],
    [9,10,13,14],
    [10,11,14,15]
]

// const EASYBLOCKS = [
//     [0,6,9,15],
//     [3,5,10,12]
// ]

const CELLS = $(".cell");
var boardArray;
var limit = 0;
var isPlayer1;

startGame();

$("button").click(function(){
    startGame();
    $("button").blur();
});

function startGame() {
    isPlayer1 = true;
    $(".endgame").hide();
    boardArray = Array.from(Array(16).keys());
    for (i = 0; i <= CELLS.length; i++){
        $(CELLS[i]).text('');
        $(CELLS[i]).css("background-color", "");
        if(limit == 0) {
            $(CELLS[i]).click({param1: event}, turnClick);
        }
    };
    limit++;
}

function turnClick(square){
    if (typeof boardArray[square.target.id] == 'number'){
        isPlayer1 == true ? turn(square.target.id, player1) : turn(square.target.id, player2);
        isPlayer1 = !isPlayer1;
        checkTie();
    }
    console.log(square.target.id);
}

function turn(squareId, player){
    boardArray[squareId] = player;
    $(`#${squareId}`).text(player);
    let gameWon = checkWin(boardArray, player);
    if(gameWon){
        gameOver(gameWon);
    }
}

function checkWin(board, player){
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of COMBOS.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for (let index of COMBOS[gameWon.index]) {
        color = gameWon.player == player1 ? "#7c94e4" : "#e4726b";
        $(`#${index}`).css("background-color", color)
    }
    for (var i = 0; i < CELLS.length; i++){
        $(CELLS[i]).off();
        limit = 0;
    }
    declareWinner(gameWon.player == player1 ? "Player 1 wins!" : "Player 2 wins!");
}

function declareWinner(player){
    $(".endgame").show();
    $(".endgame").text(`${player}`);
}

function checkTie() {
    if (emptySquares().length == 0){
        for (var i = 0; i < CELLS.length; i++){
            $(CELLS[i]).css("background-color", "#bad169");
            $(CELLS[i]).off();
            limit = 0;
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function emptySquares(){
    return boardArray.filter(s => typeof s == 'number');
}