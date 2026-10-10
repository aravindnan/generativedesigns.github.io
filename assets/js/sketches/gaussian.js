const pattern = new Array(360);
let patternIndex=0;
let patternStartedAt=0;
let patternStatus;
let patternCount;

function setup() {
  createCanvas(600, 600);
  patternStatus=document.getElementById('gaussian-pattern-status');
  patternCount=document.getElementById('gaussian-pattern-count');
  document.getElementById('new-gaussian-pattern').addEventListener('click', generatePattern);
  generatePattern();
}

function draw() {
  drawPattern();
}

function mousePressed(){
  if(mouseX>=0&&mouseX<=width&&mouseY>=0&&mouseY<=height){
    generatePattern();
  }
}

function generatePattern(){
  patternIndex++;
  patternStartedAt=millis();
  for(let i=0;i<pattern.length;i++){
    pattern[i]=randomGaussian(0,1);
  }
  const message='Pattern '+patternIndex+' · Click to generate another';
  patternStatus.textContent=message;
  patternCount.textContent='Pattern '+patternIndex;
}

function drawPattern(){
  background(255);
  translate(width/2,height/2);
  const maxRadius=min(width,height)*0.5;
  const cycleProgress=((millis()-patternStartedAt)%12000)/6000;
  const progress=cycleProgress<=1?cycleProgress:2-cycleProgress;
  const easedProgress=progress*progress*(3-2*progress);
  const growth=0.08+0.92*easedProgress;
  for(let i=0;i<pattern.length;i++){
    const angle=TWO_PI*i/pattern.length;
    const sample=constrain(abs(pattern[i]),0,2.5);
    const radius=map(sample,0,2.5,8,maxRadius)*growth;
    push();
    rotate(angle);
    stroke(0);
    strokeWeight(map(sample,0,2.5,0.7,2.5));
    line(0,0,radius,0);
    noStroke();
    fill(0);
    circle(radius,0,map(sample,0,2.5,2,5));
    pop();
  }
}