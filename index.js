const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const a = document.querySelector("#a");
const s = document.querySelector("#s");

const d = document.querySelector("#d");
const w = document.querySelector("#w");

const nitroSpeed = document.querySelector("#nitroSpeed");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSIze = 25;
let running = false;
let xVelocity = unitSIze;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSIze*4,y:0},
    {x:unitSIze*3,y:0},
    {x:unitSIze*2,y:0},
    {x:unitSIze,y:0},
    {x:0,y:0}
];
// window.addEventListener("keydown",changeDirection);
// Window.addEventListener("keydown",increaseSpeed);
a.addEventListener("click",changeDirection1);
s.addEventListener("click",changeDirection2);
d.addEventListener("click",changeDirection3);
w.addEventListener("click",changeDirection4);

resetBtn.addEventListener("click",resetGame);
nitroSpeed.addEventListener("hold",increaseSpeed);
gameStart();
function gameStart(){
    running=true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGamerOver();
            nextTick();
        },75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSIze)*unitSIze;
        return randNum;
    }
    foodX = randomFood(0,gameWidth - unitSIze);
    console.log(foodX);
    foodY = randomFood(0,gameWidth - unitSIze);

};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSIze,unitSIze);
};
function moveSnake(){
    const head = {x: snake[0].x+ xVelocity,
                  y: snake[0].y+yVelocity};
                  snake.unshift(head);
                  //if food is eaten
                  if(snake[0].x == foodX && snake[0].y == foodY){
                    score+=1;
                    scoreText.textContent = score;
                    createFood();
                  }
                  else{
                    snake.pop();
                  }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSIze,unitSIze);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSIze,unitSIze);


    })
};
function increaseSpeed(){
    const goingUp = (yVelocity==-unitSIze*unitSIze/2);
    const goingDown = (yVelocity==unitSIze*unitSIze/2);
    const goingRight = (xVelocity==unitSIze*unitSIze/2);
    const goingLeft = (xVelocity==-unitSIze*unitSIze/2);
    if(!goingUp){
        xVelocity =0;
        yVelocity =  -unitSIze*unitSIze/2;
    }
    if(!goingDown){
        xVelocity = 0;
        yVelocity = unitSIze*unitSIze/2;
    }
    if(!goingLeft){
        xVelocity = -unitSIze*unitSIze/2;
        yVelocity = 0;
    }
    if(!goingRight){
        xVelocity = unitSIze*unitSIze/2;
        yVelocity = 0;
    }
    
};
// function increaseSpeed(event){
//     const keyPressed = event.keyCode;
//     const SHIFT = 16;
//     const LEFT = 37;
//     const RIGHT =39;
//     const UP = 38;
//     const DOWN = 40;
//     const goingUp = (yVelocity==-unitSIze);

//     const goingDown = (yVelocity==unitSIze);
//     const goingRight = (xVelocity==unitSIze);
//     const goingLeft = (xVelocity==-unitSIze);
//     switch(true){
//         case(keyPressed == SHIFT && keyPressed == UP && !goingDown):
//         xVelocity =0;
//         yVelocity =  -unitSIze*2;
//         break;
//     case(keyPressed == SHIFT && keyPressed == DOWN && !goingUp):
//         xVelocity = 0;
//         yVelocity = unitSIze*2;
//         break;
//     case(keyPressed == SHIFT && keyPressed == LEFT && !goingRight):
//         xVelocity = -unitSIze*2;
//         yVelocity = 0;
//         break;
//     case(keyPressed == SHIFT && keyPressed == RIGHT && !goingLeft):
//         xVelocity = unitSIze*2;
//         yVelocity = 0;
//         break;
//     }
// };  


// function changeDirection(event){
//     const keyPressed = event.keyCode;
//     const LEFT = 37 ;
//     const RIGHT =39;
//     const UP = 38;
//     const DOWN = 40;
//     const goingUp = (yVelocity==-unitSIze);
//     const goingDown = (yVelocity==unitSIze);
//     const goingRight = (xVelocity==unitSIze);
//     const goingLeft = (xVelocity==-unitSIze);
//     switch(true){
//         case(keyPressed == LEFT && !goingRight):
//             xVelocity = -unitSIze;
//             yVelocity = 0;
//             break;
//         case(keyPressed == UP && !goingDown):
//             xVelocity =0;
//             yVelocity =  -unitSIze;
//             break;
//         case(keyPressed == DOWN && !goingUp):
//             xVelocity = 0;
//             yVelocity = unitSIze;
//             break;
//         case(keyPressed == RIGHT && !goingLeft):
//             xVelocity = unitSIze;
//             yVelocity = 0;
//             break;

//     }



// };
function changeDirection1(){
    // const goingUp = (yVelocity==-unitSIze);
    // const goingDown = (yVelocity==unitSIze);
    const goingRight = (xVelocity==unitSIze);
    // const goingLeft = (xVelocity==-unitSIze);
    if(!goingRight){
        xVelocity = -unitSIze;
        yVelocity = 0;
    }
};
function changeDirection2(){
    const goingUp = (yVelocity==-unitSIze);
    if(!goingUp){
        xVelocity =0;
        yVelocity =  unitSIze;
    }
};
function changeDirection3(){
    const goingLeft = (xVelocity==-unitSIze);
    if(!goingLeft){
        xVelocity = unitSIze;
        yVelocity = 0;
    }
};
function changeDirection4(){
    const goingDown = (yVelocity==unitSIze);
    if(!goingDown){
        xVelocity = 0;
        yVelocity = -unitSIze;
    }
};




function checkGamerOver(){
    switch(true){
     case(snake[0].x <0):
        running=false;
        break;
    case(snake[0].x >=gameWidth):
        running=false;
        break;
    case(snake[0].y <0):
        running=false;
        break;
    case(snake[0].y >=gameHeight):
        running=false;
        break;
    }
    for(let i =1; i<snake.length; i+=1){
        if(snake[i].x == snake[0].x&&snake[i].y == snake[0].y){
        running = false;
        }

    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAllign = "center";
    ctx.fillText("GAME OVER!",gameWidth/5,gameHeight/2);
    running = false;
};
function resetGame(){
    score= 0;
    xVelocity = unitSIze;
    yVelocity = 0;
    snake = [
        {x:unitSIze*4,y:0},
        {x:unitSIze*3,y:0},
        {x:unitSIze*2,y:0},
        {x:unitSIze,y:0},
        {x:0,y:0}
    ];
    gameStart();
};