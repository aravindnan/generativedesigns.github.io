let mic;
let bg=255
function setup()
{createCanvas(600,600);
  mic = new p5.AudioIn();
  mic.start();
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);
}

function draw()
{
  background(bg);
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, 0, height);
  
  //rectangles(h);
  //noFill();
  strokeWeight(2);
  
  stroke(100);
  fill(205);
  h=h*1.5;
  poly(300,300,h,h/10);
  fill(210);
  poly(300,300,h-20,h/10);
  fill(215);
  poly(300,300,h-30,1+h/10);
  fill(220);
  poly(300,300,h-40,2+h/10);
  fill(225);
  poly(300,300,h-50,3+h/10);
  fill(230);
  poly(300,300,h-60,4+h/10);
  fill(235);
  poly(300,300,h-70,5+h/10);
  fill(240);
  poly(300,300,h-80,6+h/10);
  fill(245);
  poly(300,300,h-90,7+h/10);
  fill(250);
  poly(300,300,h-100,8+h/10);
  
  
  
  }
   






function touchStarted() {
  getAudioContext().resume();
}





function rectangles(oo){
  let inc=true;
  let dec=false;

  for(let i=1,j=0,k=0;i<=30;i++,j+=19)
  {
    if(inc==true && k<= 50 ){
      rect(25+j,200,10,k+oo,20);
      if(k==50) 
        {inc=false;dec=true;continue;}
      else 
        {k=k+10;}  
    }
    if(dec==true && k>=10){
      rect(25+j,200,10,k+oo,20);
      if(k==10) 
        {inc=true;dec=false;continue;}
      else 
        k=k-10;  
    }
  }
}
/*
let mic;

let c=300;



function setup() {
  let cnv= createCanvas(600, 600);

  // Create an Audio input
  mic = new p5.AudioIn();   

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  angleMode(DEGREES);
  cnv.mouseClicked(togglePlay);
  touchStarted();

}

function touchStarted() {
  getAudioContext().resume();
}

function draw() {
  
  background(200);
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, 0, height);
  ellipse(c,c,h,h);
   
}

function toggleSong(){
  if(song.isPlaying()) song.pause();
  else song.play();
}
*/
