
let img;
let cnv;
let reso;
function preload(){
img=loadImage('image2re.jpg');
}
function setup(){
    cnv=createCanvas(img.width,img.height);
    reso=createSlider(1,25,25,-1);
    reso.style('width','300');
    reso.position(windowWidth/1.55, 670);

}


function draw()
{
    background(255);
    imageReso();
}
function imageReso(){
    let size=reso.value();
for(let col=0;col<img.width;col+=size){
    for(let row=0;row<img.height;row+=size){
        let xpos=col;
        let ypos=row;

        let c=img.get(xpos,ypos);
        push();
        translate(xpos,ypos);
        //strokeWeight(5);
        //stroke(color(c));
        noStroke();
        fill(color(c));
        rect(0,0,size,size);
        pop();

        
    }
}

}





