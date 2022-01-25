let bg=255;
function setup(){
    createCanvas(600,600);
    rectMode(CENTER);
    frameRate(2);
    //noLoop();
}


function draw(){

    background(bg);
    stroke(30)
    noFill();

    for(let i =0; i<6; i++)
	{
		for(let j =0; j<6; j++)
		{
			let s=60;
			let gap=20;
			let x=100+(s+gap)*i;
			let y=100+(s+gap)*j;
            strokeWeight(5);
			rect(x,y,s,s);
            
			if(random(1)>0.6)
			{
				strokeWeight(10);
				rect(x,y,s,s);

			}
		}
	}



}

