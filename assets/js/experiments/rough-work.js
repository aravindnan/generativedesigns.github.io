let img;
function preload(){
img=loadImage('banana.jpg');
let slider;
}

function setup(){
  createCanvas(600,600,WEBGL);
  
  img.resize(400,400);
  frameRate(200);
  angleMode(DEGREES);
  //rectMode(CENTER);
  slider=createSlider(10,150,1);
  slider.position(windowWidth/2.5, 670);
  slider.style('width','300');
}

function draw(){
  background(250);
  noStroke();
  let tiles = slider.value();
  let  tileSize = width/tiles;
  push();
  translate(50,100);
  rotateY(frameCount*5);
  
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {
      //let  c = img.get(int(x*tileSize),int(y*tileSize));
      let cc= img.get(x*tileSize,y*tileSize);
      let b = map(brightness(cc),0,255,1,0);
      let  z = map(b,0,1,350,-350);
      
      push();
     translate(x*tileSize - width/2, y*tileSize - height/2, z);
      fill(color(cc));
      //sphere(tileSize*b*0.3);
      let side=tileSize*b*0.3
      box(side,side,side*3,10,10);
      pop();
      
    }
  }
  pop();
}

