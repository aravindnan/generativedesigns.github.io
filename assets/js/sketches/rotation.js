function setup(){
    createCanvas(600,600,WEBGL);
    frameRate(100);
}
let x,y;
function draw(){
//normalMaterial();
background(255); 
pointLight(250,250,250,0,0,100);//white
pointLight(100,100,100,-300,-300,100);//gray
pointLight(0,0,0,300,300,100);   //black
pointLight(100,100,100,300,-300,100);//grey
stroke(0);   

for(i=10;i<30;i++){
    const slice=360;
    let angle=slice*i+10;

    x= 100* sin(angle);
    y= 100* cos(angle);
    push();

    translate(x,y);
    rotateX(frameCount*0.05);
    rotateY(-frameCount*0.05);
    rotateZ(frameCount*0.01);
    torus(x+y,5,4);

    rotateX(-frameCount*0.01);
    rotateY(frameCount*0.05);
    rotateZ(-frameCount*0.01);
   
    torus(x+y,5,4);
    rotateX(-frameCount*0.01);
    rotateY(-frameCount*0.09);
    rotateZ(-frameCount*0.01);

    torus(x+i,5,4);

    rotateX(frameCount*0.001);
    rotateY(frameCount*0.009);
    rotateZ(frameCount*0.001);

    torus(y+i,5,4);

    ;

    pop();
}


}