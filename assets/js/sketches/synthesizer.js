let bg=255;
let C=[];
var synth;
var ch;
let note;
function setup(){
    createCanvas(600,600);
    background(bg);
    rectMode(CENTER);
    textSize(40);
    textAlign(CENTER);

    synth = new p5.MonoSynth();

    C =[color(130, 0, 82),color(7, 0, 15)]
}


function draw(){
    document.addEventListener('keypress',sound);
    document.addEventListener('keyup',synth.triggerRelease());
    background(bg);
    stroke(30)
    noFill();
    let c=0;
    
    for(let i =0; i<3; i++)
	{
        for(let j =0; j<3; j++)
		{
            c++;
			let s=150;
			let gap=20;
			let x=135+(s+gap)*j;
			let y=135+(s+gap)*i;
            strokeWeight(5);
            if(ch==c)
            drawRect(x,y,s,c,'#1d1e1e',1);
            else
            drawRect(x,y,s,c,'#1d1e1e',0);
            

		}
	}

}

function drawRect(x,y,side,num,colo,flag){
    if(flag==1){
        push()
        fill(colo)
        stroke(colo);
        rect(x,y,side,side,1);
        pop();
        push();
        strokeWeight(2);
        fill(255);
        text(num,x,y+12);
        textSize(20);
        text(note,x+40,y+48);
        pop();
        flag=0;
    }
    else{
        stroke(colo);
        rect(x,y,side,side,1);
        push();
        strokeWeight(2);
        fill(colo);
        text(num,x,y+12);
        pop();

    }
    
}

function sound(e){
  ch=e.key;
  userStartAudio();
  
  switch(ch){
      case '1':note="B4";break;
      case '2':note="A5";break;
      case '3':note="C6";break;
      case '4':note="D4";break;
      case '5':note="C5";break;
      case '6':note="D6";break;
      case '7':note="F4";break;
      case '8':note="E5";break;
      case '9':note="F6";break;
      default:note="";

    }
    synth.triggerAttack(note,0.8,1/6);return;

}