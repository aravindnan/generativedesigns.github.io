
let x = 1;
let y = 1;
let i=0;
let easing = 0.1;
let spread_radius=100;
let nodes=[];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  frameRate(1000);
  angleMode(DEGREES);
}

function draw() {
    
  background(255);
  grid();
  ball();
}



function ball(){
  
  grid();
  stroke(200);
  //background(220);
  let targetX = mouseX;
  let dx = (targetX - x)/1.2;
  x += dx * easing;

  let targetY = mouseY;
  let dy = (targetY - y)/1.2;
  y += dy * easing;
  
 
  fill(255);
  let c  =Math.sqrt(dx*dx + dy*dy)/2;
  ellipse(x,y,c,c);
}

function grid()
{
  
  for (var x = 5; x < width; x += width / 50) {
		for (var y = 5; y < height; y += height / 50) {
			noStroke(255);
			
            fill(200);
            ellipse(x,y,5,5);           
		}
	}
}



/*
code 


let x = 1;
let y = 1;
let i=0;
let easing = 0.09;
const spread_radius=100;
let nodes=[];

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
    
  background(220);
  ball();
  grid();
  
  
	
	
  

}



function ball(){
  

  background(220);
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;
  fill('red');
  ellipse(x, y, 5, 5);
}

function grid()
{
  for (var x = 15; x < width; x += width / 20) {
		for (var y = 15; y < height; y += height / 20) {
			stroke(0);
			strokeWeight(1);
			//line(x, 0, x, height);
			//line(0, y, width, y);
            fill(0);
            ellipse(x,y,5,5);
            nodes[i]=new node(x,y);
            console.log(nodes[i].x);
            
            
		}
	}
}

class node{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

*/ 