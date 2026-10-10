
let img;
let cnv;
let resolutionSlider;
function preload(){
img=loadImage('../assets/images/image2re.jpg');
}
function setup(){
    cnv=createCanvas(img.width,img.height);
    resolutionSlider=document.getElementById('resolution-level');
    resolutionSlider.addEventListener('input', updateSliderFill);
    updateSliderFill();
}


function draw()
{
    background(255);
    imageReso();
}
function imageReso(){
    let size=26-Number(resolutionSlider.value);
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

function updateSliderFill(){
    resolutionSlider.style.setProperty('--p', ((resolutionSlider.value-resolutionSlider.min)/(resolutionSlider.max-resolutionSlider.min)*100)+'%');
}



