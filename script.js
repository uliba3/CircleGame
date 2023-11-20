// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let dotSpeed = 2;

let player = {
    x: canvas.width / 2,
    y: canvas.height,
    radius: 5,
    circleSpeed: 1,
    dotSpeed: dotSpeed,
    rgb: "rgb(0, 0, 0)"
};

let circles = [];

let score = 0;

// To get the score from localStorage
let highestScore = parseInt(localStorage.getItem('highestScore'));
if (isNaN(highestScore)) {
    highestScore = 0;
}

function getRandomColor() {
    // Generate random values for red, green, and blue
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    
    // If the color is too close to white, recursively call the function again
    if (red > 200 && green > 200 && blue > 200) {
        return getRandomColor();
    }

    // Return the RGB color string
    return `rgb(${red}, ${green}, ${blue})`;
}

function checkBorders() {
    if (player.x + player.radius > canvas.width
        || player.x - player.radius < 0
        || player.y + player.radius > canvas.height
        || player.y - player.radius < 0) {
        gameOver();
    }
}

function checkCircles() {
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const distance = (player.y-circle.y)*(player.y-circle.y) + (player.x-circle.x)*(player.x-circle.x);
        const minRadiusDistance = (player.radius-circle.radius)*(player.radius-circle.radius);
        const maxRadiusDistance = (player.radius+circle.radius)*(player.radius+circle.radius);
        if (distance < maxRadiusDistance && distance > minRadiusDistance) {
            gameOver();
        }
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.strokeStyle = player.rgb;
    ctx.stroke();
    ctx.closePath();
}

function drawCircles() {
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.strokeStyle = circle.rgb;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 8, 40);
    ctx.fillText("Highest Score: " + Math.max(highestScore, score), 8, 20);
}

function updatePlayer() {
    if(condition == "circleUpdate"){
        player.radius += player.circleSpeed;
        score += 1;
        checkCircles();
        checkBorders();
    }else if(condition == "dotUpdate"){
        player.y -= player.dotSpeed;
        if(player.y < 0){
            playerSpawn();
            player.dotSpeed += 1;
        }
    }
}

function playerSpawn() {
    player.y = canvas.height;
    player.x = Math.random() * (canvas.width-30) + 15;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer(); 
    drawCircles();
    drawScore();

    updatePlayer();

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);

let condition = "dotUpdate";

function mouseDownHandler(e) {
    console.log(e);
    if (e.button === 0) {
        if(condition == "circleUpdate"){
            circles.push({
                x: player.x,
                y: player.y,
                radius: player.radius,
                rgb: player.rgb
            });   
            player = {
                x: canvas.width / 2,
                y: canvas.height - 30,
                radius: 5,
                circleSpeed: 1,
                dotSpeed: dotSpeed,
                rgb: getRandomColor()
            };
            playerSpawn();
            condition = "dotUpdate";
        }else{
            condition = "circleUpdate";
        }
    }
}

function keyDownHandler(e) {
    console.log(e);
    if (e.key === ' '|| e.key === 'Enter'||e.button === 0) {
        if(condition == "circleUpdate"){
            circles.push({
                x: player.x,
                y: player.y,
                radius: player.radius,
                rgb: player.rgb
            });   
            player = {
                x: canvas.width / 2,
                y: canvas.height - 30,
                radius: 5,
                circleSpeed: 1,
                dotSpeed: dotSpeed,
                rgb: getRandomColor()
            };
            playerSpawn();
            condition = "dotUpdate";
        }else{
            condition = "circleUpdate";
        }
    }
}

function gameOver() {
    alert("Game Over");
    // To set the score in localStorage
    localStorage.setItem('highestScore', Math.max(score, highestScore));
    highestScore = Math.max(score, highestScore);
    reset();
}

function reset() {
    score = 0;
    circles = [];
    player = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        radius: 5,
        circleSpeed: 1,
        dotSpeed: dotSpeed,
        rgb: "rgb(0, 0, 0)"
    };
    condition = "dotUpdate";
}

draw();