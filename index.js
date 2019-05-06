const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

const floorHeight = Math.floor(window.innerHeight * 0.8);
const gravityValue = 5;
const speedValue = 5;
let animationFrame;

let playerPosX = canvas.width / 2;
let playerPosY = canvas.height / 2;

//Create floor

ctx.beginPath();
ctx.fillRect(0, Math.floor(window.innerHeight * 0.8),window.innerWidth, 20);
ctx.stroke();

//Create Player Draw function
const player = () => {
  animationFrame = requestAnimationFrame(player);
  ctx.clearRect(0, 0, canvas.width, floorHeight);
  ctx.beginPath();
  ctx.strokeRect(playerPosX, playerPosY, 25, 100);
  ctx.stroke();
  gravityFunction();
};

const gravityFunction = () => {
  if(playerPosY + 100 < floorHeight) {
    playerPosY += gravityValue;
  }
};
const playerMovement = e => {
  if(e.key === 'd') {
    playerPosX += speedValue;
  } else if(e.key === 'a') {
    playerPosX -= speedValue;
  }
};

document.addEventListener('keydown', playerMovement);

//Handle start and pause of game
let start = false;
window.addEventListener('click', () => {
  if(start) {
    cancelAnimationFrame(animationFrame);
    start = false;
    ctx.clearRect(0, 0, canvas.width, floorHeight);
    ctx.font = '50px ZCOOL KuaiLe';
    ctx.fillText('Stopped', (canvas.width / 2) - 100, canvas.height / 2, 500);
  } else if(!start){
    player();
    start = true;
  }
});