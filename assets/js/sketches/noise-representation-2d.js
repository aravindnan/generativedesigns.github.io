let densitySlider;
let gridCount;
let markCount;

function setup(){
    createCanvas(600,600);
    frameRate(5);
    angleMode(DEGREES);

    densitySlider=document.getElementById('noise-density-slider');
    gridCount=document.getElementById('noise-grid-count');
    markCount=document.getElementById('noise-mark-count');
    densitySlider.addEventListener('input', updateDensity);
    updateDensity();
}

function updateDensity(){
    const density=Number(densitySlider.value);
    gridCount.textContent=density+' × '+density;
    markCount.textContent=String(density*density);
    const progress=(densitySlider.value-densitySlider.min)/(densitySlider.max-densitySlider.min)*100;
    densitySlider.style.setProperty('--p',progress+'%');
}

function draw(){
    const rows=Number(densitySlider.value);
    const cols=rows;
    const numCells=cols*rows;

    const gridw=0.9*width;
    const gridh=0.9*height;
    const cellw=gridw/cols;
    const cellh=gridh/rows;

    const margx=(width-gridw)/2;
    const margy=(height-gridh)/2;
    background(255);
    strokeCap(SQUARE);
    noiseDetail(3,0.9);

    for(let i=0;i<numCells;i++){
        const col=i%cols;
        const row=Math.floor(i/cols);
        const x=col*cellw;
        const y=row*cellh;
        const w=cellw*0.8;
        const h=cellh*0.8;

        let n=noise(x*0.001+frameCount*0.05,y*0.001+frameCount*0.05);
        n=map(n,0,1,-1,1);
        const angle=180*n;
        const lineWeight=map(n,1,-1,1,25);
        strokeWeight(lineWeight);
        stroke('#1d1e1e');
        push();
        translate(x,y);
        translate(margx,margy);
        translate(cellw/2,cellh/2);
        rotate(angle);
        line(-w/2,0,w/2,0);
        pop();
    }
}
