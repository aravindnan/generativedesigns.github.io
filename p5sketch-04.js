let osc, playing, freq, amp;
let flag=true;
let bg=255;

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.mouseOver(playOscillator);
  cnv.mouseOut(mouseOut);
  osc = new p5.Oscillator('cos');
}

function draw() {

if(flag==false){
  background(bg)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  circles(freq,amp);
  fill('#8a8a8a');
  noStroke();
  text('Frequency: ' + freq, 210, 290);
  text('Amplitude: ' + amp, 210, 310);
  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.5);
    osc.amp(amp, 0.1);
    
  }
}
}


function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
  flag=false;
}

function mouseOut(){
  osc.amp(0,0.1);
  playing = false;
  osc.stop();
  flag=true;
}



function circles(c1,c2){
    
    c1=int(c1/1.95);
    c2= int(c2*255);
    fill('#2d2e2e');
    c3= 100+ int(Math.sqrt(c1*c1+c2*c2));
        stroke(255);
        strokeWeight(2);

        ellipse(c1,c2/10,(c3+c1)/10,(c3+c1)/10);
        ellipse(c2,c1,(c3+c2)/5,(c3+c2)/5);
        ellipse(600-c1,600-c2,c3/2,c3/2);
        ellipse(600-c2,600-c1,c3/3,c3/3);
        ellipse(500-c1+c2,500-c2,c3-c2,c3-c2);
        ellipse(500-c1,500-c1+c2,c3-c1,c3-c1);
        ellipse(0,c2,c3-c2,c3-c2);
        ellipse(c3,0,c3-c1,c3-c1);
        ellipse(c1,500-c2,c3/2,c3/2);
        ellipse(c1,600-c2*2,c3/4,c3/4);
        ellipse(400+c1-c3,c2,c3-c2,c3-c2);
        ellipse(600+c1-c3,c2/2,c3-c1,c3-c1);
}