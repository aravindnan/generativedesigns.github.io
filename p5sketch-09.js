function setup(){
    createCanvas(600,600);
    background(220);

}

let flag =0;
let num=0;
let ch='n';
let front= -1;
let rear=-1;
let max=15;
let q = new Array(10);
let bg=255;

function draw(){
    background(bg);
    document.addEventListener('keypress',action)
    drawCircle(num,flag);
    fill(50);


}

function action(e)//Queue operation
{
  ch=e.key;
  console.log(ch);
  if(ch=='a')//Enque
  {
    if(front==0 && rear==max-1 || front==rear+1)
      {flag=1;console.log("Overflow");return;}
    else
    {
      if(front==-1)
        front=rear=0;
      else if(rear==max-1)
        rear=0;
      else
        rear++;
    }  
    flag=0;  
    q[rear]=rear;
    num++;
    console.log(q);
  }

  if(ch=='d')//Deque
  {
    if(front==-1)
      {flag=-1;console.log("underflow");return;}
    else
    {
      if(front==rear)
        front=rear=-1;
      else if(front==max-1)
        front=0;
      else 
        front++;
    }  
    flag=0;  
    num--; 
    console.log(q);
  }

}


function drawCircle(num,flag)
{
  const cx=width*0.5;
  const cy=height *0.5;
  textSize(32);
  if(flag==-1){ text("Empty",cx-50,cy); }
  if(flag==1) { text("Full",cx-25,cy+10);  }
  if(flag==0) { text(num,cx-12,cy+10);}
  let x,y;
  const radius = width * 0.35;
  for( let i=0;i<num;i++)
  {
    
    const slice=degToRad(360/num);
    const angle=slice*i;

    x=cx + radius * Math.sin(angle);
    y=cy + radius * Math.cos(angle);

    push();
    translate(x,y);
    rotate(angle);
    stroke('#1d1e1e');
    strokeWeight(6);
    fill(50,50,50,255); 
    ellipse(0,0,30,30);
    //strokeWeight(8);
    pop();
    fill(80,80,80,7);
    noStroke();
    ellipse(300,300,35*i,35*i);
  }
}