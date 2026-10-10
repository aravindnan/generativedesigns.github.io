let vid;
let samplingSlider;

function setup(){
    createCanvas(600,450);
    vid=createCapture(VIDEO);
    background(255);
    frameRate(100);
    angleMode(DEGREES);

    samplingSlider=document.getElementById('video-sampling-level');
    samplingSlider.addEventListener('input', updateSliderFill);
    updateSliderFill();
}

function draw(){
    for(let k=0;k<100;k++){
        var xpos=random(width);
        var ypos=random(height);
        var colo=vid.get(xpos,ypos);
        noStroke();
        fill(colo,25);
        let side=35-Number(samplingSlider.value);
        poly(xpos,ypos,side,6);
        vid.hide();
    }
}

function updateSliderFill(){
    samplingSlider.style.setProperty('--p', ((samplingSlider.value-samplingSlider.min)/(samplingSlider.max-samplingSlider.min)*100)+'%');
}