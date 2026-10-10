const agents=[]; 
let bg=255;
let nodeCountSlider;
let nodeCountValue;
function setup(){
    createCanvas(600,600);
    frameRate(60);
    angleMode(DEGREES);
    nodeCountSlider=document.getElementById('node-count-slider');
    nodeCountValue=document.getElementById('node-count-value');
    nodeCountSlider.addEventListener('input', updateNodeCount);
    updateSliderFill();
    updateNodeCount();
}

function updateNodeCount(){
    const count=Number(nodeCountSlider.value);
    while(agents.length<count){
        agents.push(new Agent(random(0,width),random(0,height)));
    }
    agents.length=count;
    nodeCountValue.textContent=String(count);
    updateSliderFill();
}

function updateSliderFill(){
    const progress=(nodeCountSlider.value-nodeCountSlider.min)/(nodeCountSlider.max-nodeCountSlider.min)*100;
    nodeCountSlider.style.setProperty('--p',progress+'%');
}
  
  function draw(){
    background(bg);
    

      for(let i=0;i<agents.length;i++){
        const agent =agents[i];
        for(let j=i+1;j<agents.length;j++){
          
            const other=agents[j];
  
            const dist=agent.pos.getDistance(other.pos);
            if(dist>200)continue;
  
            strokeWeight(map(dist,0,200,5,1));
  
            
            //stroke(0);
            line(agent.pos.x,agent.pos.y,other.pos.x,other.pos.y);
          
        }
      }

      agents.forEach(agent => 
        {
          
          agent.update();
          agent.draw();
          agent.bounce(height,width);
          
        })

}

class Vector {
    constructor(x,y){
      this.x=x;
      this.y=y;
    }
  
    getDistance(v){
      const dx=this.x-v.x;
      const dy=this.y-v.y;
      return Math.sqrt(dx*dx+dy*dy);
    }
  }

  class Agent{
    constructor(x,y)
    {
      const speed=1;
      this.pos=new Vector(x,y);
      this.vel=new Vector(random(-speed,speed),random(-speed,speed));  
      this.radius=random(10,12);
    }
  
    update()
    {
      this.pos.x+=this.vel.x;
      this.pos.y+=this.vel.y;
    }
  
    bounce(width,hieght){
      if(this.pos.x<=0+this.radius||this.pos.x>=width-this.radius+1)this.vel.x*=-1;
      if(this.pos.y<=0+this.radius||this.pos.y>=hieght-this.radius+1)this.vel.y*=-1;
    }
  
    draw()
    { 
      push();
      stroke('#1d1e1e');
      strokeWeight(2);
      fill('#3d3e3e');
      translate(this.pos.x,this.pos.y);
      ellipse(0,0,this.radius,this.radius,360);
      pop();
    }
  }