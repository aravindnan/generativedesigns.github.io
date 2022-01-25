var angle=60;
function setup(){
    createCanvas(600,600);
    angleMode(DEGREES);
    slider=createSlider(0,360,180,0.0001);
    slider.position(windowWidth/1.55,windowHeight/2+height/2+10);
    slider.style('width','300px');
    strokeCap(SQUARE);
  
}

function draw(){
    background(255);
    angle=slider.value();
    stroke(0);
    translate(300,height/1.15);
    branchup(160);
   
}

function branchup(length)
{
    strokeWeight(length/9);
    line(0,0,0,-length);
    noFill();
    //ellipse(0,0,length,length);
    translate(0,-length);
    if( length>3){
        push();
        rotate(angle);
        branchup(length*0.68);
        pop();
        push();
        rotate(-angle);
        branchup(length*0.68);
        pop();
    }
    
}

