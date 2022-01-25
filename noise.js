const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = { 
  dimensions: [ 1080, 1080 ],
  animate : true
};

const params = {
  cols:10,
  rows:10,
  scaleMin:1,
  scaleMax:30,
  freq:0.001,
  amp:0.2,
  frame:0,
  animate:true,
  lineCap:'butt'
};

const sketch = () => {
  return ({ context, width, height,frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const rows=params.rows;
    const cols=params.cols;
    const numCells = cols * rows;

    const gridw = 0.8* width;
    const gridh = 0.8* height;

    const cellw = gridw/cols;
    const cellh = gridh/rows;

    const margx = (width-gridw)/2;
    const margy = (height-gridh)/2;

    for(let i=0; i<numCells; i++)
    {
      const col=i%cols;
      const row= Math.floor(i/cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate? frame:params.frame;

      const n= random.noise3D(x,y,f*10,params.freq);
      const angle= n * Math.PI * params.amp;

      //const scale = (n * 0.5 +0.5)*30;
      const scale = math.mapRange(n,-1,1,params.scaleMin,params.scaleMax);


      
      context.save();
      context.translate(x,y);
      context.translate(margx,margy);
      context.translate(cellw/2,cellh/2);
      context.rotate(angle);

      context.lineWidth=scale;
      context.strokeStyle='black';
      context.lineCap=params.lineCap;

      context.beginPath();
      context.moveTo(-w/2,0);
      context.lineTo(w/2,0);
      context.stroke();
      context.restore();


    }
  }; 
};
const createPane = () =>{
  const pane = new Tweakpane.Pane();
  let folder;
  folder= pane.addFolder({title:'Grid'});
  folder = pane.addInput(params,'lineCap',{options:{butt:'butt',round:'round'}})
  folder = pane.addInput(params,'cols',{min:2,max:50,step:1});
  folder = pane.addInput(params,'rows',{min:2,max:50,step:1});
  folder = pane.addInput(params,'scaleMin',{min:1,max:100});
  folder = pane.addInput(params,'scaleMax',{min:1,max:100});

  folder= pane.addFolder({title:'Noise'});
  folder = pane.addInput(params,'freq',{min:-0.01,max:0.01});
  folder = pane.addInput(params,'amp',{min:0,max:1});
  folder = pane.addFolder({title:'Animation'});
  folder = pane.addInput(params,'frame',{min:0,max:999});
  folder = pane.addInput(params,'animate');


};
createPane();
canvasSketch(sketch, settings);
