function setup(){
    createCanvas(600,600,WEBGL);

    angleMode(DEGREES);
}
let x,y;

function draw(){
    background(255);
    //normalMaterial();
    pointLight(100,100,100,300,-100,10);
    //pointLight(30,30,30,-300,-50,10);
    pointLight(0,0,0,300,300,300);
    pointLight(20, 0, 0,-300,-50,10);
    translate(0,0);
    anim(5,10,10);
    translate(0,0);
    anim(10,20,30);
    translate(0,0);
    anim(11,40,35);
    translate(0,0);
    anim(12,60,40);
    translate(0,0);
    anim(13,80,45);
    translate(0,0);
    anim(14,100,50);
    translate(0,0);
    anim(15,120,55);
    translate(0,0);
    anim(20,140,60);

}

function anim(side,angle,radius){
    rotateZ(frameCount*0.4);
    rotateX(frameCount*0.2);
    rotateY(frameCount*0.6);
     x = -100+ radius * cos(angle);
     y = -100+radius * sin(angle);
    translate(x,y);
    box(side*2,side,side*2);
    

    rotateX(-frameCount*0.6);
    rotateY(frameCount*0.1);
    rotateZ(frameCount*0.2);
    x = 20+radius * sin(-angle);
     y = 20+radius * cos(-angle);
    translate(2*x,2*y);
    box(side*2,side*2,side);

    rotateY(frameCount*0.6);
    rotateZ(-frameCount*0.5);
    rotateX(frameCount*0.2);
     x =30+radius*2 * cos(angle/4);
     y = 30+radius*2 * sin(-angle/4);
    translate(x+y,x-y);
    box(side*2,side*2,side);

    rotateY(frameCount*0.06);
    rotateZ(-frameCount*0.06);
    rotateX(-frameCount*0.2);
     x =30+radius*2 * cos(angle/4);
     y = 30+radius*2 * sin(-angle/4);
    translate(-angle,-angle);
    box(side*2,side*2,side);

    
    
    

}