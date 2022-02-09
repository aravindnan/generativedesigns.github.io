let bg=255;
let sound;
let cnv;
let inp;

function preload(){
  sound = loadSound('sound1.mp3');
  }


  
  function setup(){
    changeTrack();

    cnv = createCanvas(600,600);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT();
   
    angleMode(DEGREES);
    colorMode(RGB,255,255,255,1);
  }
  
  function draw(){
    cnv.mouseClicked(togglePlay);
    inp=select('pbtn');
    inp.mousePressed(togglePlay);
    background(255);
    spec();
    wav();
    cwav();
    textSize(32)
    noStroke();
    fill('#2d2e2e')
    text('Wave', 20, 200);
    text('Spectrum',400,400)
    inp.mousePressed(togglePlay);
    cnv.mouseClicked(togglePlay);
  }
  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  }

  function spec(){
    
    let spectrum = fft.analyze();
    stroke(255);
    strokeWeight(0.05);
    fill(220);
    for (let i = 0; i< spectrum.length; i++){
      let x = map(i, 0, spectrum.length,i, width)+i;
      let h = -height/1.2 + map(spectrum[i], 0, 255, height, 0);
      let c1=x;let c2= h; let c3=(x+h)/2-x;
      fill(c1/10,c2*6,c3*5,0.8);
      rect(x, height, width / spectrum.length+5, h/1.5,10 )
    }
  }

  function wav(){
    let waveform = fft.waveform();
    noFill();
    beginShape();
    

    for (let i = 0; i < waveform.length; i++){

      strokeWeight(3);  
      stroke(random(0,5),0,0);
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 10, height);
      vertex(x,y-40);
    }
    endShape();

  }
  
  
  function cwav(){
    let waveform = fft.waveform();
    let spectrum = fft.analyze();
    
    beginShape();
    
    
    for (let i = 0,j=(waveform.length+spectrum.length)/2;i<361&&j>0;j--, i++){
      let r = map( (waveform[i]+spectrum[j])*5, -3, 3, 0, height/6);
      let r1 = map( (waveform[i]+spectrum[j])*6, -3, 3, 0, height/5);
      
      var x=500+r*cos(i);
      var y=120+r*sin(i);
      var x1=500+r1*cos(i);
      var y1=120+r1*sin(i);
      strokeWeight(2);  
      fill(random(0,5),0,0,0.7);
      vertex(x,y);
      fill(random(0,5),0,0,0.8);
      vertex(x1,y1);
      point(x+1,y+1);
      
      
    }
    endShape();
    
  }
  
   function changeTrack(){
   
    sound.pause();
     waveform=[];
     spectrum=[];
     sound=null;
     selectElement = document.querySelector('#mtype');
     let ch = selectElement.options[selectElement.selectedIndex].value;
     if(ch==='v')
     sound=loadSound("violin.mp3");
     else if(ch==='p')
     sound=loadSound("piano.mp3");
     else if(ch==='s')
     sound=loadSound("saxaphone.mp3");
     else
     sound=loadSound("flute.mp3");
     if (sound.isPlaying()) {
       sound.pause();
       sound=null;
     }

     sound.amp(0.2);
     inp.select('pbtn');
     inp.mousePressed(togglePlay);
     
  }
