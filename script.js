// //your code here
// let gameContainer = document.getElementById('gameContainer')

// let i = 0
// for (let row = 1; row <= 40; row++) {
//     for (let col = 1; col <= 40; col++) {
//         let pixelDiv = document.createElement('div')
//         pixelDiv.id = `pixel${i++}`
//         pixelDiv.classList.add('pixel_div')
//         gameContainer.appendChild(pixelDiv)
//     }
    
// }

// // ========displaying the food=============//
// let foodPosition = {
//     x: 1500
// }
// let food;

// function foodDisplay(){
//     // let foodNumber = Math.round(Math.random() * 1599);
//     food = document.getElementById(`pixel${foodPosition.x}`)
//     food.classList.add('food')

// }

// function collide(sarr){
//     for (let i = 1; i < sarr.length; i++) {
//         if(sarr[i].x === sarr[0].x ){
//             return true
//         }
//     }
// }
// let inputDir = {
//     x: 0
// }

// let snakeHead;
// let snakePosition =[
//     {
//         x: 20,
//     }
// ]
// let inputDirection ={x:0,y:0}
// function gameEngine() {
//     // if(collide(snakePosition)){
        
//     // }
//     if(snakePosition[0].x === foodPosition.x){
//         snakePosition.unshift(
//             {
//                 x: snakePosition[0].x + inputDir.x
//             }
//         )
//         console.log(snakePosition);
//         foodPosition ={
//             x: Math.round(Math.random() * 1599)
//         }
//     }
//     for (let i = snakePosition.length - 2; i >= 0; i--) {
//         snakePosition[i+1] = {...snakePosition[i]}
        
//     }
//     foodDisplay()

//     snakePosition.forEach((e,index)=>{
//         snakeHead = document.getElementById(`pixel${snakePosition[index].x}`)
//         snakeHead.classList.remove('snakeBodyPixel')
//     })
//     snakeHead = document.getElementById(`pixel${snakePosition[0].x}`)
//     snakeHead.classList.remove('snakeBodyPixel')
//     // snakeHead.id = ""
//     snakePosition[0].x += inputDir.x
//     snakePosition.forEach((e,index)=>{
//         snakeHead = document.getElementById(`pixel${snakePosition[index].x}`)
//         snakeHead.classList.add('snakeBodyPixel')
//         snakeHead.id = `pixel${snakePosition[index].x}`
//     })
    
// }

// setInterval(()=>{
//     gameEngine()

// }, 100)

// window.addEventListener("keydown",(e)=>{
//     switch (e.key) {
//         case "ArrowUp":
//             inputDir.x = -40; 
//             console.log("ArrowUp");
//             break;

//         case "ArrowDown":
//             inputDir.x = 40;
//             console.log("ArrowDown");
//             break;

//         case "ArrowLeft":
//             inputDir.x = -1;
//             console.log("ArrowLeft");
//             break;

//         case "ArrowRight":
//             inputDir.x = 1;
//             console.log("ArrowRight");
//             break;
    
//         default:
//             break;
//     }
// })


// All of the declaration ---------------------------------------------//

let score = 0;
let span = document.getElementById('span')
//initial direction of snake when the game starts
let inputDir = {
    x: 0,
    y: 0
}

// All the audios used in this snake game
let foodSound = new Audio('music/food.mp3')   // --------------> this is the food sound
let musicSound = new Audio('music/music.mp3')     // --------------> this is the background music
let gameOver = new Audio('music/gameover.mp3')    // --------------> this is the gameover sound
let moveSound = new Audio('music/move.mp3')   // --------------> this is the moving sound

// this two variables are used to render the screen slowly
let speed = 5;
let lastPaintTime = 0;

// Cordinates of snake
let snakeArr = [
    {
        x:13,
        y: 15
    }
]

// Cordinates of food
let food = {
    x:5,
    y:7
}

let board = document.getElementById('gameBoard')


// all the functions ---------------------------------------------------//
function main(ctime){
    window.requestAnimationFrame(main);
    
    if(((ctime - lastPaintTime)/1000) < (1/speed)){
        return
    }    
    lastPaintTime = ctime
    gameEngine()
}

function isCollide(sarr){
    // if you bump into yourself
    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true
        }
    }

    // if(sarr[0].x > 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0){
    //     return true
    // }
}

function gameEngine(){
    // part1 updating the snake and food
    if(isCollide(snakeArr)){
        gameOver.play()
        // musicSound.pause()
        inputDir = {x:0 , y: 0}
        alert("Press Any Key to continue")
        snakeArr = [
            {
                x:13,
                y: 15
            }
        ]
        // musicSound.play()
        speed = 5
        score = 0;
    }

    // // if the food is eaten updating the score and regenrating the food somewhereelse

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play()
        speed += 0.2
        score += 5
        span.innerText = score
        console.log(inputDir.x);
        console.log(inputDir.y);
        snakeArr.unshift(
            {
                x: snakeArr[0].x + inputDir.x, 
                y: snakeArr[0].y + inputDir.y
            }
        )

        food = {
            x: Math.round(Math.random()*16),
            y: Math.round(Math.random()*16)
        }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
        
    }

    snakeArr[0].x += inputDir.x, 
    snakeArr[0].y += inputDir.y
    // part 2 displaying the snake and food

    // part 2a: sdisplaying the head of the snake
    board.innerHTML = ""
    snakeArr.forEach((e,index) =>{
        snakeHead = document.createElement('div')
        snakeHead.style.gridRowStart = e.y
        snakeHead.style.gridColumnStart = e.x
        if(index === 0){
            snakeHead.classList.add('snakeBodyPixel')
        }else{
            snakeHead.classList.add('snake')

        }
        board.appendChild(snakeHead)
    })

    // part 2b: displaying the food of the snake
    snakeArr.forEach((e,index) =>{
        snakeFood = document.createElement('div')
        snakeFood.style.gridRowStart = food.y
        snakeFood.style.gridColumnStart = food.x
        snakeFood.classList.add('food')
        board.appendChild(snakeFood)
    })
}

// main logic & functions call ---------------------------------------------------//

window.requestAnimationFrame(main);
window.addEventListener("keydown",(e) => {
    // inputDir = {x:0 ,y:1}
    // musicSound.play()
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0; 
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
