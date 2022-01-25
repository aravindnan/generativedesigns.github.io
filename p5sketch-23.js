let vid;
let model;
function setup(){
vid=createCapture(VIDEO);
vid.position(CENTER);
createCanvas(600,600);
vid.style('width','600px');
vid.size(600,600);
vid.hide();

console.log('loading model');
cocoSsd.load().then(cocoSsd => {
    model=cocoSsd;
});

}
function draw(){
    clear();
    image(vid,0,0);
    if(vid.width>0&&model !==undefined){
        const imgData=drawingContext.getImageData(0,0,width,height);
        model.detect(imgData).then(predictions =>{
        console.log(predictions);
        for(let k of predictions){

                let xpos=k.bbox[0];
                let ypos=k.bbox[1];
                let w=k.bbox[2];
                let h=k.bbox[3];
                stroke(255);
                strokeWeight(2);
                noFill();
                rect(xpos-100,ypos-50,w-100,h);

                fill(255);
                noStroke();
                //text(k.class+':'+nf(k.score,0,4),xpos+10,ypos+15);
                push();
                textSize(30);
                textAlign(CENTER);
                fill(0);
                let data=k.class;
                text(data.toUpperCase()+':'+nf(k.score,0,4),300,550);
                pop();


            }
        });
    }
    
}