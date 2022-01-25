var cam=null;
var trac=null;
var feat=null;
let des;
let i=13;
function setup(){
createCanvas(600,600);
cam=createCapture(VIDEO);
cam.size(width,height);
imageMode(CENTER);
cam.hide();
trac=new clm.tracker();
trac.init();
trac.start(cam.elt);
ellipseMode(CENTER);
rectMode(CENTER);
}
function draw (){
clear();
    translate(width,0);
    scale(-1,1);
    //image(cam,300,300);
    feat=trac.getCurrentPosition();
    if(feat.length>0){
        
        for(let i=0;i<feat.length;i+=2){
            stroke(0);
            line(600,300,feat[i][0]-20,feat[i][1]-10);
            line(0,300,feat[i][0]-20,feat[i][1]-10);
            line(300,0,feat[i][0]-20,feat[i][1]-10);
            line(300,600,feat[i][0]-20,feat[i][1]-10);
        }

    }

}