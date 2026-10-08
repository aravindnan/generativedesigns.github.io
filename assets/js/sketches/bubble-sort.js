let elements=[];
let i=0,j=0;
let limit= 590/8;
let flag=0;
var start,end;
let complete=0;

function setup(){
    createCanvas(600,600);
    background(255);
    textSize(32);
    frameRate(10);
    start= createButton('Sort Now');
    start.style('color:white;font-size:20px;border:2px solid #2d2e2e;border-radius:5px;box-shadow:3px 5px 8px grey;background-color:#2d2e2e');
    start.position(windowWidth/1.65,windowHeight/2-220);
    start.size(160,40);

    end= createButton('Reset');
    end.style('color:white;font-size:20px;border:2px solid #2d2e2e;border-radius:5px;box-shadow:3px 5px 8px grey;background-color:#2d2e2e');
    end.position(windowWidth/1.65+200,windowHeight/2-220);
    end.size(160,40);

    makearray();
    
}

function draw(){
    end.mousePressed(refreshPage);
    background(255);
    fill('#2d2e2e');
    stroke('#2d2e2e')
    strokeWeight(1);
    if(flag==0)
    {
    showfirst();
    start.mousePressed(bsort);}
    else{
    bsort();
    printsort();
    }
    


}

function makearray(){
    for(let i=0;i<limit;i++)
        elements.push(random(height-150));

}

function refreshPage(){
    window.location.reload();
}

function bsort(){
    flag=1;
    for(let k=0;k<8;k++){
        if(i<elements.length){
            let temp=elements[j];
            if(elements[j]>elements[j+1]){
                elements[j]=elements[j+1];
                elements[j+1]=temp;
            }
            j++;
            if(j>=elements.length-i-1){
                j=0;i++;
            }
        }
        else{noLoop();
             text('Sorting Complete',180,200);
        }
    }
    printsort();
}

function printsort(){
    for(let i=0;i<elements.length;i++){
        stroke('white');
        strokeWeight(2);
        fill('#2d2e2e');
        rect(i*8+5,600,8,-elements[i],20);
    }
}

function showfirst(){
    for(let i=0;i<elements.length;i++){
        strokeWeight(2);
        stroke('white');
        fill('#2d2e2e');
        rect(i*8,600,8,-elements[i],20);
    }
}