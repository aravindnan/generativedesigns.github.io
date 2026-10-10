let samplingSlider;
let img;
function preload(){
img=loadImage('../assets/images/banana.jpg');
}

function setup(){
  createCanvas(600,600,WEBGL);
  
  img.resize(400,400);
  frameRate(200);
  angleMode(DEGREES);
  samplingSlider=document.getElementById('sampling-level');
  samplingSlider.addEventListener('input', updateSliderFill);
  updateSliderFill();
}

function draw(){
  background(255);
  noStroke();
  let tiles = samplingSlider.value;
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

function updateSliderFill(){
  samplingSlider.style.setProperty('--p', ((samplingSlider.value-samplingSlider.min)/(samplingSlider.max-samplingSlider.min)*100)+'%');
}
