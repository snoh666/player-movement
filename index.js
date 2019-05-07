const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
let scoreBox = document.getElementById('score');
let score = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

const floorHeight = Math.floor(window.innerHeight * 0.8);
let gravityValue = 5;
const speedValue = 7.5;
let animationFrame = [];

let playerPosX = canvas.width / 2;
let playerPosY = canvas.height / 2;

//Draw a floor

ctx.beginPath();
ctx.fillRect(0, Math.floor(window.innerHeight * 0.8),window.innerWidth, 200);
ctx.stroke();

//Create Player Draw function
const player = () => {
  animationFrame[0] = requestAnimationFrame(player);
  ctx.clearRect(0, 0, canvas.width, floorHeight);
  ctx.beginPath();
  ctx.strokeRect(playerPosX, playerPosY, 25, 100);
  ctx.stroke();
};

const gravityFunction = () => {
  animationFrame[1] = requestAnimationFrame(gravityFunction);
  if(playerPosY + 101 < floorHeight) {
    playerPosY += gravityValue;
  }
};

const playerMovement = e => {
  if (e.key === 'd' || e.key === 'ArrowRight') {
    if(playerPosX + speedValue + 25 < canvas.width) {
      playerPosX += speedValue;
      score += speedValue;
      scoreBox.innerHTML = Math.floor(score);
    }
  } else if (e.key === 'a' || e.key === 'ArrowLeft') {
    if(playerPosX - speedValue > 0) {
      playerPosX -= speedValue;
      score += speedValue;
      scoreBox.innerHTML = Math.floor(score);
    }
  }
};

document.addEventListener('keydown', playerMovement);

//Handle start and pause of game
let start = false;
window.addEventListener('click', () => {
  if(start) {
    cancelAnimationFrame(animationFrame[0]);
    cancelAnimationFrame(animationFrame[1]);
    start = false;
    ctx.clearRect(0, 0, canvas.width, floorHeight);
    ctx.font = '50px ZCOOL KuaiLe';
    ctx.fillText('Stopped', (canvas.width / 2) - 100, canvas.height / 2, 500);
  } else if(!start){
    player();
    gravityFunction();
    start = true;
  }
});