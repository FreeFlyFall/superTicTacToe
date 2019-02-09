const player1 = 'X';
const player2 = 'O';

const Combos = [
    // Rows
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
    // Cols
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [4,8,12,16],
    // Diagonals
    [1,6,11,16],
    [4,7,10,13],
    // Corners
    [1,4,13,16],
    // Squares
    [1,2,5,6],
    [2,3,6,7],
    [3,4,7,8],
    [5,6,9,10],
    [6,7,10,11],
    [7,8,11,12],
    [9,10,13,14],
    [10,11,14,15],
    [11,12,15,16]
]

const cells = $(".cell");
var boardArray;
startGame();
$("button").click(startGame);

function startGame() {
    $(".endgame").hide();
    boardArray = [];
    for (i = 0; i <= cells.length; i++){
        boardArray.push(i);
        $(cells[i]).text('');
        $(cells[i]).css("background-color", "");
        $(cells[i]).click(turnClick(cells[i]));
    };
    boardArray.shift();
}

function turnClick(square){
    turn(square.target.id, player1);
}
function turn(squareId, player){
    boardArray[squareId - 1] = player;
    $(`#${squareId}`).text(player);
    console.log(boardArray);
}

