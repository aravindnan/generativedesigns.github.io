let pattern = new Array(360);
let dd=0;
let cnv;
function setup() {
  cnv=createCanvas(600, 600);
   for (let i = 0; i < pattern.length; i+=1) {
     pattern[i] = floor(randomGaussian(0, 100));
   }
 }

function draw() {
    cnv.mousePressed(refreshPage);
    drawPattern();
    
   
 }

 function refreshPage(){
    window.location.reload();
    
  }

  function drawPattern(){
    background(255);
   translate(width / 2, width / 2);
   for (let i = 0; i < pattern.length; i++) {
      rotate(TWO_PI / pattern.length);
      stroke(0);
      let dist = abs(pattern[i]);
      dist+=dist*dd; 
      dd+=0.0007;
      line(0, 0, dist/100, 0);
     fill('red');
     noStroke();
     ellipse(dist/100,0,2,2);
     
    }
  }