console.log("Welcome to dancing balls");

//setting the width and height of the canvas
const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");
const tx = window.innerWidth;
const ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;


//setting the initial mouse coordinates
let mousex = 0;
let mousey = 0;

//updating the mouse coordinates whenever the mouse moves

addEventListener('mousemove',(event)=>{
    mousex = event.clientX;
    mousey = event.clientY;
})

const grav = 0.99;
c.strokeWidth=5;

//function for generating random color
const randomColor = ()=>{
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
};
//constructor for ball object
function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() /5;
    this.update = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      c.fillStyle = this.color;
      c.fill();
    };
}

//generating 50 random balls
let bal = [];
for (var i=0; i<50; i++){
    bal.push(new Ball());
}

function animate() {    
    if (tx != window.innerWidth || ty != window.innerHeight) {
      tx = window.innerWidth;
      ty = window.innerHeight;
      canvas.width = tx;
      canvas.height = ty;
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, tx, ty);
    for (var i = 0; i < bal.length; i++) {
      bal[i].update();
      bal[i].y += bal[i].dy;
      bal[i].x += bal[i].dx;
      if (bal[i].y + bal[i].radius >= ty) {
        bal[i].dy = -bal[i].dy * grav;
      } else {
        bal[i].dy += bal[i].vel;
      }    
      if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
          bal[i].dx = -bal[i].dx;
      }
      if(mousex > bal[i].x - 20 && 
        mousex < bal[i].x + 20 &&
        mousey > bal[i].y -50 &&
        mousey < bal[i].y +50 &&
        bal[i].radius < 70){
          bal[i].radius +=5; 
        } else {
          if(bal[i].radius > bal[i].startradius){
            bal[i].radius += -5;
          }
        }
      }
  }
  
  animate();
  
setInterval(function() {
    bal.push(new Ball());
    bal.splice(0, 1);
  }, 400);
