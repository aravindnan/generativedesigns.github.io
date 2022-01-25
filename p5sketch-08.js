let size;
function setup(){
    createCanvas(600,600);
    frameRate(5); 
    angleMode(DEGREES); 
    size=createSlider(5,30,1);
    size.position(windowWidth/1.55, 650);
    
    size.style('width','300');
}


function draw(){
    let rows=size.value();
    let cols=size.value();
    const numCells = cols * rows;
    
    const gridw =  0.9*width;
    const gridh =  0.9*height;
    const cellw = gridw/cols;
    const cellh = gridh/rows;
    
    const margx = (width-gridw)/2;
    const margy = (height-gridh)/2;
    background(255);

    strokeCap(SQUARE);


    for(let i=0; i<numCells; i++)
    {
      const col=i%cols;
      const row= Math.floor(i/cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

     

      let n= noise(x*0.001+frameCount*0.05,y*0.001+frameCount*0.05);
      noiseDetail(3, 0.9);
      n=map(n,0,1,-1,1);
      let angle= 180*n;
      
      const size=map(n,1,-1,1,25);
      strokeWeight(size);
     
      stroke('#1d1e1e')
      push();
      translate(x,y);
      translate(margx,margy);
      translate(cellw/2,cellh/2);
      rotate(angle);
      line(-w/2,0,w/2,0);
      pop();
        

    }}
