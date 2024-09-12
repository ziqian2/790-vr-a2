const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let carX = 0;
let wheelAngle = 0;  
const carSpeed = 2;  
const wheelSpeed = 0.1; 
let angle = 0; 
const swaySpeed = 0.02; 

const balloons = [
  { x: 150, y: 600, color: 'red', speed: 1.5 },
  { x: 350, y: 600, color: 'blue', speed: 2 },
  { x: 550, y: 600, color: 'green', speed: 1.2 },
  { x: 750, y: 600, color: 'yellow', speed: 1.7 }
];

// Draw tree 
function drawTree(x, y, angle) {
  ctx.save();
  ctx.translate(x, y); 

  ctx.rotate(Math.sin(angle) * 0.05);
  ctx.fillStyle = 'brown';
  ctx.fillRect(-10, -150, 20, 150);

  drawBranch(-50, -100, 30, -100); 
  drawBranch(-10, -150, 30, -100); 
  drawBranch(30, -100, 30, -100);   

  ctx.restore();
}

function drawBranch(x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(angle) * 0.1);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, width, height);


  ctx.restore();
}


// Car
function drawCar() {
  ctx.save();
  ctx.translate(carX, 300); 

  ctx.fillStyle = 'blue';
  ctx.fillRect(-50, -20, 100, 40);  
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(-30, -15, 40, 20);

  ctx.save();
  ctx.translate(30, 20);  
  ctx.rotate(wheelAngle);  
  drawWheel();
  ctx.restore();  

  ctx.save();
  ctx.translate(-30, 20);  
  ctx.rotate(wheelAngle); 
  drawWheel();
  ctx.restore(); 

  ctx.restore();
}


function drawWheel() {

  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();


  ctx.strokeStyle = 'white'; 
  ctx.lineWidth = 2;


  ctx.beginPath();
  ctx.moveTo(-5, 0);  
  ctx.lineTo(5, 0);  
  ctx.moveTo(0, -5);  
  ctx.lineTo(0, 5);   
  ctx.stroke();
}

function drawBalloon(balloon) {
  ctx.save();

  // Draw the string
  ctx.beginPath();
  ctx.moveTo(balloon.x, balloon.y);
  ctx.lineTo(balloon.x, balloon.y + 50);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw the balloon (circle)
  ctx.beginPath();
  ctx.arc(balloon.x, balloon.y, 30, 0, 2 * Math.PI);
  ctx.fillStyle = balloon.color;
  ctx.fill();

  ctx.restore();
}

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angle += swaySpeed;
  carX += carSpeed;
  if (carX > canvas.width) {
    carX = -100;  
  }
  wheelAngle += wheelSpeed;

  balloons.forEach(balloon => {
    balloon.y -= balloon.speed;
    if (balloon.y + 30 < 0) {
      balloon.y = canvas.height + 30; 
    }
    drawBalloon(balloon);
  });


  drawTree(100, 250, angle);  
  drawTree(300, 250, angle); 
  drawTree(500, 250, angle);  
  drawTree(700, 250, angle);  

  drawCar();

 
  requestAnimationFrame(animate);
}

animate();
