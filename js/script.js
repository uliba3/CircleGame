import { WIDTH, HEIGHT, dotSpeed, BLACK, WHITE } from './config.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Screen size
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Dot properties
let dot = { x: 250, y: 500 };
let dotSpeed = 1;
let dotCount = 0;

// Game state
let gameState = "dot_update";

// Circles array
let circles = [];

// Checking array for collisions
let checking = [];

// Colors
let backgroundColor = black;
let oppositeBackgroundColor = white;

function drawCircles() {
    for (const circle of circles) {
        ctx.beginPath();
        ctx.arc(circle[0], circle[1], circle[2], 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${circle[3]}, ${circle[4]}, ${circle[5]})`;
        ctx.fill();
        ctx.closePath();
    }
}

function drawGameover() {
    if (gameState === "gameover") {
        backgroundColor = white;
        ctx.fillStyle = black;
        ctx.fillText(`${score}\nPress Space`, 200, 200);
    }
}

function drawDot() {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = oppositeBackgroundColor;
    ctx.fill();
    ctx.closePath();
}

function drawTextbox() {
    ctx.fillStyle = oppositeBackgroundColor;
    ctx.fillText(score, 0, 20);
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = backgroundColor;

    if (gameState === "dot_update") {
        drawDot();
        drawTextbox();
        drawCircles();
    } else if (gameState === "circle_update") {
        drawCircles();
    } else if (gameState === "gameover") {
        drawGameover();
        drawTextbox();
        drawCircles();
    }
}

function dotUpdate() {
    if (dot.y < HEIGHT - 10) {
        spawnCircle({ x: dot.x, y: dot.y });
        dot.x = Math.floor(Math.random() * (WIDTH - 30)) + 15;
        dot.y = HEIGHT;
        gameState = "circle_update";
        dotCount = 0;
        const r = Math.floor(Math.random() * 3) + 1;
    }
    dot.y -= dotSpeed;

    if (dot.y <= 0) {
        dotCount += 1;
        if (dotCount > 2) {
            gameState = "gameover";
        }
        dot.y = HEIGHT;
        dot.x = Math.floor(Math.random() * (WIDTH - 10)) + 5;
        dotSpeed += 0.5;
    }
}

function circleUpdate() {
    const circle = circles[circles.length - 1];
    circle[2] += 1;
    sec += 1;
    score += 1;
    backgroundColor = white;
    circleUpdateCheck();

    if (keyboard.space && sec > 15) {
        checking.push([circle[0], circle[1], circle[2]]);
        backgroundColor = black;
        gameState = "dot_update";
        sec = 0;
        const r = Math.floor(Math.random() * 3) + 1;
    }
}

function circleUpdateCheck() {
    const circle = circles[circles.length - 1];
    for (const check of checking) {
        const lxly = Math.pow(circle[0] - check[0], 2) + Math.pow(circle[1] - check[1], 2);
        if (Math.pow(circle[2] + check[2], 2) >= lxly && Math.pow(circle[2] - check[2], 2) <= lxly) {
            gameState = "gameover";
        }
    }
}

function update() {
    if (gameState === "circle_update") {
        circleUpdate();
    } else if (gameState === "dot_update") {
        dotUpdate();
    } else if (gameState === "gameover" && keyboard.space && sec > 100) {
        startGame();
        sec = 0;
    } else {
        sec += 1;
    }
}

function startGame() {
    sec = 0;
    gameState = "dot_update";
    dotSpeed = 1;
    dotCount = 0;
    circles = [];
    dot = { x: WIDTH / 2, y: HEIGHT };
    score = 0;
    checking = [];
    backgroundColor = black;
    oppositeBackgroundColor = white;

    for (let i = 0; i < WIDTH; i++) {
        checking.push([i, 0, 0]);
        checking.push([i, WIDTH, 0]);
    }

    for (let j = 0; j < HEIGHT; j++) {
        checking.push([0, j, 0]);
        checking.push([HEIGHT, j, 0]);
    }
}

canvas.addEventListener('mousedown', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
});

function spawnCircle(position) {
    let r = 250;
    let g = 250;
    let b = 250;

    while (Math.max(r, g, b) - Math.min(r, g, b) < 25) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    const circle = [position.x, position.y, 0, r, g, b];
    circles.push(circle);
}

function drawExit() {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(450, 0);
    ctx.lineTo(500, 50);
    ctx.moveTo(450, 50);
    ctx.lineTo(500, 0);
    ctx.stroke();
    ctx.closePath();
}

function drawCredits() {
    timer += 1;
    if (timer < 50) {
    } else if (timer < 100) {
    } else if (timer < 150) {
    } else if (timer < 200) {
    } else {
        timer = 0;
    }
}

function drawHowToPlay() {
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
