var angle=30;
var branchAngleSlider;
var branchAngleValue;
function setup(){
    createCanvas(600,600);
    angleMode(DEGREES);
    branchAngleSlider=document.getElementById('branch-angle-slider');
    branchAngleValue=document.getElementById('branch-angle-value');
    branchAngleSlider.addEventListener('input', updateBranchAngle);
    updateBranchAngle();
    strokeCap(SQUARE);
}

function updateBranchAngle(){
    angle=Number(branchAngleSlider.value);
    branchAngleValue.textContent=angle+'°';
    const progress=(branchAngleSlider.value-branchAngleSlider.min)/(branchAngleSlider.max-branchAngleSlider.min)*100;
    branchAngleSlider.style.setProperty('--p',progress+'%');
}

function draw(){
    background(255);
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
