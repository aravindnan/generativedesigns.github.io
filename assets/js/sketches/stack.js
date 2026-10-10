let of,uf,no;
let bg=255;
function setup(){
    createCanvas(600,600,WEBGL);
    background(bg);
    rectMode(CENTER);
    angleMode(DEGREES);
    of = createGraphics(600, 600);
    of.textFont('Helvetica');
    of.textAlign(CENTER);
    of.textSize(35);
    of.fill(200, 0, 0);
    of.noStroke();
    of.text('OverFlow',300,60);
    
    uf = createGraphics(600, 600);
    uf.textFont('Helvetica');
    uf.textAlign(CENTER);
    uf.textSize(35);
    uf.fill(200,0,0);
    uf.noStroke();
    uf.text('Underflow',300,60);

    document.getElementById('push-stack').addEventListener('click', pushStack);
    document.getElementById('pop-stack').addEventListener('click', popStack);
}

let num=0;
let t=-1;
const s=new Array;


function draw(){
    pointLight(100,100,100,300,100,0);
    pointLight(60,70,80,-300,-100,0);
    pointLight(10,30,20,-300,0,10);
    
    fill(250);
    //rotateY(frameCount);
    stroke(250);
}

function pushStack(){
    addElement();
}

function action(e){
    const key=e.key.toLowerCase();
    if(key=='a') addElement();
    if(key=='d') removeElement();
}

function popStack(){
    removeElement();
}

function addElement(){
    const speed=frameCount;
    if(num==10){
        console.log("OverFlow");console.log(s);
        texture(of);
        noStroke();
        plane(600, 600);
        return;
    }
    s.push(int(random(10)));console.log(s);
    background(bg);
    num++;
    for(let i=220,j=0;j<num;i-=40,j++){
        push();
        translate(0,i);
        rotateY(speed*2);
        box(100,20,100);
        pop();
    }
}

function removeElement(){
    if(num==0){
        console.log("UnderFlow");console.log(s);
        texture(uf);
        noStroke();
        plane(600, 600);
        return;
    }
    s.pop();console.log(s);
    background(bg);
    num--;
    for(let i=220,j=0;j<num;i-=40,j++){
        push();
        translate(0,i);
        rotateY(frameCount);
        box(100,20,100);
        pop();
    }
}

document.addEventListener('keypress', action);
