let vid;
let handpose;
let hands;

function modelReady() {
  console.log('hand pose loaded');
  handpose.on('predict', gotPose);
}

function mousePressed() {
    console.log(hands);
}


function gotPose(results) {
  // do something with the results
  hands = results;
};


function setup() {
  createCanvas(600, 600);
  vid = createCapture(VIDEO);
  vid.hide();
  // vid.size(320, 240);
  handpose = ml5.handpose(vid, modelReady);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  translate(width,0);
    scale(-1,1);
  if (vid) {
    //image(vid, 0, 0);
  }
  if (hands && hands.length > 0) {

    let hand = hands[0];


    let landmarks = hand.landmarks;
    colorMode(RGB);
    //fill(255, 100);
    stroke(0);
    for (let i = 0; i < landmarks.length; i++) {
        let [x, y, z] = landmarks[i];
        noFill();
        // z is depth
        //poly(x,y,10,(x+y)/4);
        //line(0,0,x,y);
        //line(0,600,x,y);
        //line(600,600,x,y);
        //line(600,0,x,y);
        
      push();
      stroke('#1d1e1e');
      strokeWeight(2);
      ellipse(300,300,x,y);
      ellipse(300,300,y/2,x/2);
      pop();
     

      
    }

  //
  }
}