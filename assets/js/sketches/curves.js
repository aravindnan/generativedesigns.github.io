let bg=255;
function setup(){
    createCanvas(600,600);
    background(bg);
    //noLoop();
}

function draw(){
    noFill();
    background(bg);
stroke(255, 102, 0);
//line(85, 20, 10, 10);
//line(90, 90, 15, 80);
stroke(0, 0, 0);
let c1x=mouseX;
let c1y=mouseY;

let c2x=mouseY;
let c2y=mouseX;
for(i=0,j=300;i<300;i+=20,j+=10){
    stroke(0);
    bezier(i, 0, c1x, c1y, c2x,c2y,300, 300);
    bezier(j, 600, c1x, c1y, c2x,c2y,300, 300);
    bezier(600, i, c1x, c1y, c2x,c2y,300, 300);
    bezier(0, j, c1x, c1y, c2x,c2y,300, 300);
    stroke(100,100,100);
    bezier(0, i, c1x, c1y, c2x,c2y,300, 300);
    bezier(i, 600, c1x, c1y, c2x,c2y,300, 300);
    bezier(600, j, c1x, c1y, c2x,c2y,300, 300);
    bezier(j, 0, c1x, c1y, c2x,c2y,300, 300);
    
    


}

}