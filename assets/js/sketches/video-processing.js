let vid;
let slider;

function setup(){
    createCanvas(600,450);
    vid=createCapture(VIDEO);
    background(255);
    frameRate(100);
    angleMode(DEGREES);

    slider=createSlider(5,30,30,0.5);
    slider.position(windowWidth/1.55,600);
    slider.style('width','300px');
}

function draw(){
    for(let k=0;k<100;k++){
        var xpos=random(width);
        var ypos=random(height);
        var colo=vid.get(xpos,ypos);
        noStroke();
        fill(colo,25);
        let side=slider.value();
        poly(xpos,ypos,side,6);
        vid.hide();
    }

}