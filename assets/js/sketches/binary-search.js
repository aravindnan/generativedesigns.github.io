var elements=[];
var limit=29;
  var value=null;
  var lb,ub,mid=-1;
  var w=15,off=15;
  var searching=false;
  var searchComplete=false;
  var foundIndex=-1;
  var searchInput;
  var setValueButton;
  var searchButton;
  var statusMessage;
  let bg=255;


  function setup(){
    createCanvas(600,600);
    textSize(32);
    rectMode(CENTER);
    frameRate(0.8);

    searchInput=document.getElementById('inp');
    setValueButton=document.getElementById('set-value');
    searchButton=document.getElementById('search-now');
    statusMessage=document.getElementById('search-value-status');

    searchInput.addEventListener('input', function(){
      setValueButton.disabled=!searchInput.validity.valid;
      searchButton.disabled=true;
      value=null;
      searching=false;
      searchComplete=false;
      foundIndex=-1;
      mid=-1;
      statusMessage.textContent='';
    });
    setValueButton.addEventListener('click', getVal);
    searchButton.addEventListener('click', startSearch);
    document.getElementById('reset-search').addEventListener('click', refreshPage);

    while(elements.length<limit){
      var r=int(random(1,100));
      if(elements.indexOf(r)==-1)elements.push(r);
    }
    elements.sort(function(a,b){return a-b});
    lb=0;
    ub=elements.length-1;
  }

  function getVal(){
    if(!searchInput.validity.valid){
      searchInput.reportValidity();
      return;
    }
    value=Number(searchInput.value);
    lb=0;
    ub=elements.length-1;
    mid=-1;
    foundIndex=-1;
    searching=false;
    searchComplete=false;
    searchButton.disabled=false;
    statusMessage.textContent='Search value set to '+value+'.';
  }

  function startSearch(){
    if(value===null)return;
    lb=0;
    ub=elements.length-1;
    mid=-1;
    foundIndex=-1;
    searchComplete=false;
    searching=true;
  }



  function draw(){
    textAlign(CENTER);
    background(bg);
    if(searching){
      if(!searchComplete)bsearch();
      drawSearchState();
    } else {
      showfirst();
    }

    fill('#2d2e2e');
    noStroke();
    strokeWeight(1);
    textSize(25);
    text('Search Value : '+(value===null?'Not set':value),300,500);
  }

function bbox(data,xpos,h,cc,ss){
   fill(cc);
   strokeWeight(3)
   stroke(ss);
   rect(xpos+off,300,w,h,10);

   push();
   fill('#2d2e2e');
   textSize(12);
   stroke('#2d2e2e');
   strokeWeight(1);
   text(data,xpos+16,415);
   pop();
}

function bsearch(){
  if(lb<=ub){
    mid=Math.floor((lb+ub)/2);
    if(value===elements[mid]){
      foundIndex=mid;
      searchComplete=true;
      statusMessage.textContent='Found at position '+(foundIndex+1)+'.';
    } else if(value<elements[mid]){
      ub=mid-1;
    } else {
      lb=mid+1;
    }
  } else {
    searchComplete=true;
    statusMessage.textContent='Value not found in this data set.';
  }
}

function drawSearchState(){
  for(let i =0,j=8;i<elements.length;i++,j+=20){
    var h=map(elements[i],0,100,50,200);
    if(i==mid)
      bbox(elements[i],j,h,'#2d2e2e','#2d2e2e');
    else if(i==mid-1||i==mid+1)
      bbox(elements[i],j,h,'#8f8f8f','#2d2e2e');    
    else
      bbox(elements[i],j,h,'white','#2d2e2e');       
    }
    
    if(foundIndex!==-1)
    {
      var pos =foundIndex+1;
      push();textSize(25);fill('#4b8f24');noStroke();
      
      text('Found At Position '+pos,300,200);
      pop();
    }
    else if(searchComplete){
      push();textSize(25);fill('#2d2e2e');noStroke();
      text('Not in List',300,200);
      pop();
    }
}

function refreshPage(){
  window.location.reload();
}


function showfirst()
{ 
  for(let i =0,j=8;i<elements.length;i++,j+=20){
   var h=map(elements[i],0,100,50,200);
   fill(100,100,100,0.5);
   strokeWeight(3)
   stroke('#2d2e2e');
   rect(j+off,300,w,h,10);

   push();
   fill('#2d2e2e');
   textSize(12);
   stroke('#2d2e2e');
   strokeWeight(1);

   text(elements[i],j+16,415);
   pop();
  }
}




/*
var elements=[];
var limit=29;
var value;
var flag=5;
var lb,ub,mid;
var mode;
var w=15,off=15;
let col=[];
let gg=0;
let bg=255;


function setup(){
  col=[
    color(230,168,0,50),//yellow
    color(10,200,0,50),//green
    color(230,168,0),//darkyellow
    color(10,200,0),//darkgreen
    color(200,0,0,50),//red
    color(200,0,0)//darkred
  ]
    createCanvas(600,600);
    textSize(32);
    rectMode(CENTER);
    frameRate(0.8);

    start= createButton('Search Now');
    start.style('color:white;font-size:20px;border:2px solid #2d2e2e;border-radius:5px;box-shadow:4px 5px 8px grey ;background-color:#2d2e2e;');
    start.position(windowWidth/1.65,windowHeight/2-210);
    start.size(160,40);

    end= createButton('Reset');
    end.style('color:white;font-size:20px;border:2px solid #2d2e2e;border-radius:5px;box-shadow:4px 5px 8px grey;background-color:#2d2e2e');
    end.position(windowWidth/1.65+200,windowHeight/2-210);
    end.size(160,40);

    while(elements.length<limit){
        var r=int(random(1,100));
        if(elements.indexOf(r)==-1)elements.push(r);
    }
    elements.sort(function(a,b){return a-b});
    console.log(elements);

    lb=0;ub=elements.length-1;
    //noLoop();
    value=int(random(elements.length));

    //value=document.getElementById("inp").value;
}

function getVal(){
  value=document.getElementById("inp").value;
}



function draw(){
  
  textAlign(CENTER);
  background(bg);
  if(gg==0)
    showfirst(); 
  fill('#2d2e2e');
  noStroke()
  strokeWeight(1);
  textSize(25);
  text('Search Value : '+elements[value],300,500);
  end.mousePressed(refreshPage);
  start.mousePressed(bsearch)
  if(gg==1)
  bsearch();
  }

function bbox(data,xpos,h,cc,ss){
   fill(cc);
   strokeWeight(3)
   stroke(ss);
   rect(xpos+off,300,w,h,10);

   push();
   fill('#2d2e2e');
   textSize(12);
   stroke('#2d2e2e');
   strokeWeight(1);
   text(data,xpos+16,415);
   pop();
}

function bsearch(){
  background(bg);

  textSize(25);
  text('Search Value : '+elements[value],300,500);
 
  if(lb<=ub){
    mid=parseInt((lb+ub)/2);
    if(elements[value]==elements[mid]) 
      flag=0;
    else if(elements[value]<elements[mid])
      {ub=mid-1;}
    else
      {lb=mid+1;}
  }

  for(let i =0,j=8;i<elements.length;i++,j+=20){
    var h=map(elements[i],0,100,50,200);
    if(i==mid)
      bbox(elements[i],j,h,'#2d2e2e','#2d2e2e');
    else if(i==mid-1||i==mid+1)
      bbox(elements[i],j,h,'#8f8f8f','#2d2e2e');    
    else
      bbox(elements[i],j,h,'white','#2d2e2e');       
    }
    
    if(elements[mid]===elements[value])
      {
        var pos =mid+1;
        push();textSize(25);fill('#2d2e2e');noStroke();
        text('Found At Position '+pos,300,200);
        pop();
      }
  

      gg=1;
}

function refreshPage(){
  window.location.reload();
}


function showfirst()
{ 
  for(let i =0,j=8;i<elements.length;i++,j+=20){
   var h=map(elements[i],0,100,50,200);
   fill(100,100,100,0.5);
   strokeWeight(3)
   stroke('#2d2e2e');
   rect(j+off,300,w,h,10);

   push();
   fill('#2d2e2e');
   textSize(12);
   stroke('#2d2e2e');
   strokeWeight(1);

   text(elements[i],j+16,415);
   pop();
  }
}



*/ 