function poly(posX , posY ,radius,sides){
    const rotAngle = 360/sides;
    
    beginShape();
    for(let i =1 ;i<=sides+1;i++){
        const thisVertex=pointOnCircle(posX,posY,radius,i*rotAngle);
        vertex(thisVertex.x,thisVertex.y);
    }
    endShape();
}

function pointOnCircle(posX,posY,radius,angle)
{
    const x = posX + radius * cos(angle);
    const y = posY + radius * sin(angle);
    return createVector(x,y);

}

function randomSelectTwo(){
    const rando= random(1);
    if(rando>0.5) return true;
    else return false;
  }
  
function getRandomFromPalette()
  {
    const rando=floor(random(0,PALETTE.length));
    return PALETTE[rando];
  }

const degToRad =(degrees)=>{return degrees/180*Math.PI;}
