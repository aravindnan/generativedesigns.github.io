const CSIZE=200;
const SIDES =10;
let PALETTE=[];
let bg=255;

/*rgb(0, 11, 73),
rgb(155, 0, 0),
rgb(255, 114, 114),
rgb(255, 181, 181)
color(180,37,112),color(36,28,45),color(116,119,119)  ,color(181,183,180)*/
function setup() {
  // put setup code here
  PALETTE=[
color(0, 11, 73),
color(155, 0, 0),
color(255, 114, 114),

    
    
  ]
  
  let cnv=createCanvas(600,600);
  angleMode(DEGREES);
  rectMode(RADIUS);
  frameRate(1);
}

function draw() {
  // put drawing code here
  background(bg);
  testline();
  circles();
  simpleLines();
  outlineShape();

}

function testline()
{
  let numlines= randomSelectTwo()?SIDES:SIDES*2;
  let strokeColor=getRandomFromPalette();
  
  noFill();
  push();
  translate(width/2,height/2);
  stroke(strokeColor);
  strokeColor=getRandomFromPalette();
  ellipse(0,0,random(CSIZE*1.2),random(CSIZE*1.2));
  stroke(strokeColor);
  const angle =360/numlines;
  const linelen=int(random(CSIZE/2,CSIZE*1.3));
  const picker=floor(random(0,3));
  for(let i=0;i<numlines;i++){
    line(0,0,0,linelen);
    fill(strokeColor);
    if(picker==0)ellipse(linelen,0,int(random(20)),int(random(20)));
    if(picker==1)poly(linelen,0,int(random(15)),3);
    if(picker==2)poly(linelen,0,int(random(15)),4);

    rotate(angle);
  }
  pop();
   
}
function outlineShape(){
  noFill();
  const strokeColor=getRandomFromPalette();
  const weight = randomSelectTwo()?1:4;
  strokeWeight(1);
  
  const hexagonTrue = randomSelectTwo();

  push();
  translate(width/2,height/2);
  if(hexagonTrue)
    {poly(0,0,random(CSIZE/2,CSIZE),int(random(10))); }
  else
    {ellipse(0,0,CSIZE,CSIZE);console.log("circle")}
  pop();
}

function simpleLines(){
  noFill();

  const stepsOut=8;
  const numSteps= randomSelectTwo()?stepsOut:int(stepsOut*1.25)
  const step=(CSIZE/2)/numSteps;
  const start=floor(random(0,numSteps));
  const stop = floor(random(start,numSteps+1));
  
  let numlines= randomSelectTwo()?SIDES:SIDES*2;
  let strokeColor=getRandomFromPalette();
  const weight= randomSelectTwo()?1:3;
  const angle =360/numlines; 

  noFill();
  strokeWeight(2);
  stroke(strokeColor);
  push();
    translate(width/2,height/2);
    for(let i=0;i<numlines;i++){
      line(start*step,0,stop*step,0);
      rotate(angle);
    }

  pop(); 
}

function circles(){

  noFill();
  const numCircles=SIDES;
  const angle=360/numCircles;
  const circleSize= (CSIZE/2);
  const position = (CSIZE/2) - (circleSize/2);
  const strokeColor= getRandomFromPalette();
  stroke(strokeColor);
  strokeWeight(1);
  push();
  let c1=random(1)*circleSize+random(100);
  let c2=random(1)*circleSize+random(100);
  const cent= random(position,position*2);
  translate(width/2,height/2);
  for(let i = 0;i<numCircles;i++){
    ellipse(cent,0,c1,c2);
    rotate(angle);

  }
  pop();

}







