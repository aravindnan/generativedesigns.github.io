var realimg;
var edgeimg;

function preload(){

    realimg=loadImage('image2re.jpg');

}


function setup(){
    createCanvas(600,600);
    edgeimg=createImage(realimg.width,realimg.height);
    pixelDensity(10);
}

function draw(){
    realimg.loadPixels();
    edgeimg.loadPixels();

    for(let x=1;x<realimg.width;x++){
        for(let y=1;y<realimg.height;y++){
            var pos=(x+y*realimg.width)*4;
            var rvalue=realimg.pixels[pos];
            var gvalue=realimg.pixels[pos+1];
            var bvalue=realimg.pixels[pos+2];

            var rpos=((x+1)+y*realimg.width)*4;
            var rRight=realimg.pixels[rpos];
            var gRight=realimg.pixels[rpos+1];
            var bRight=realimg.pixels[rpos+2];

            var Colochange=abs((rvalue+gvalue+bvalue)/3-(rRight+gRight+bRight)/3);
            edgeimg.pixels[pos]=Colochange;
            edgeimg.pixels[pos+1]=Colochange;
            edgeimg.pixels[pos+2]=Colochange;
            edgeimg.pixels[pos+3]=255;
            

        }
    }
    edgeimg.updatePixels();
    imageMode(CENTER);
    image(edgeimg,300,300);
    realimg.resize(110,140);
    image(realimg,90,527);
    noLoop();

}