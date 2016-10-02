
const WALL_THICKNESS = 20;
const PADDLE_WIDTH = 100;
const PADDLE_SPEED = 16;
const PUCK_SPEED = 5;
const PADDLE_HITS_FOR_NEW_LEVEL = 5;
const SCORE_BOARD_HEIGHT = 50;
const ARROW_KEY_LEFT = 37;
const ARROW_KEY_RIGHT = 39;
const SPACE_KEY = 32;


var canvas, stage, paddle, puck, board, scoreTxt, livesTxt, messageTxt, messageInterval;
var leftWall, rightWall, ceiling, floor;

var leftKeyDown = false;
var rightKeyDown = false;

var bricks = [];
var paddleHits = 0;
var combo = 0;
var lives = 5;
var score = 0;
var level = 0;

var gameRunning = true;

var levels = [
        {color: '#705000', points: 1},
        {color: '#743fab', points: 2},
        {color: '#4f5e04', points: 3},
        {color: '#1b5b97', points: 4},
        {color: '#c6c43b', points: 5},
        {color: '#1a6d68', points: 6},
        {color: '#aa7223', points: 7},
        {color: '#743fab', points: 8},
        {color: '#4f5e04', points: 9},
        {color: '#1b5b97', points: 10},
        {color: '#c6c43b', points: 11},
        {color: '#1a6d68', points: 12},
];

//init the game
//
function init() {
    canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    newGame();
    startGame();
}

function newGame() {
    buildWalls();
    buildMessageBoard();
    buildPaddle();
    buildPuck();
    setControls();
    newLevel();
    newLevel();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(e){
        if (!e.paused) {
            stage.update();
        }
    });
}

function buildWalls() {
    var wall = new createjs.Shape();
    wall.graphics.beginFill('#333');
    wall.graphics.drawRect(0, 0, WALL_THICKNESS, canvas.height);
    stage.addChild(wall);

    wall = new createjs.Shape();
    wall.graphics.beginFill('#333');
    wall.graphics.drawRect(0, 0, WALL_THICKNESS, canvas.height);
    wall.x = canvas.width - WALL_THICKNESS;
    stage.addChild(wall);

    wall = new createjs.Shape();
    wall.graphics.beginFill('#333');
    wall.graphics.drawRect(0, 0, canvas.width, WALL_THICKNESS);
    stage.addChild(wall);

    leftWall = WALL_THICKNESS;
    rightWall = canvas.width - WALL_THICKNESS;
    ceiling = WALL_THICKNESS;
}


function buildMessageBoard() {
    board = new createjs.Shape();
    board.beginFill('#333');
    board.graphics.drawRect(0, 0, canvas.width, SCORE_BOARD_HEIGHT);
    board.y = canvas.height - SCORE_BOARD_HEIGHT;
    stage.addChild(board);

    livesTxt = new createjs.Text('lives: ' + lives, '20px Times', '#fff');
    livesTxt.y = board.y + 10;
    livesTxt.x = WALL_THICKNESS;
    stage.addChild(livesTxt);

    scoreTxt = new createjs.Text('score: ' + score, '20px Times', '#fff');
    scoreTxt.textAlign = "right";
    scoreTxt.y = board.y + 10;
    scoreTxt.x = canvas.width - WALL_THICKNESS;
    stage.addChild(scoreTxt);


}
