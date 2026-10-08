var weather;
var api='https://api.weatherapi.com/v1/current.json?q=';
var apiKey='&key=2327c15e7594408db6652928220102&aqi=no';
var city;

let temparature_img;
let humidity_img;
let location_img;
let lonlan_img;
let rain_img;
let wind_img;
let pressure_img;


var input;
function setup()
{
    createCanvas(600,600);
    var button=select('#btn');
    button.mousePressed(askCity);
    input=select('#city');
    textAlign(CENTER);
    textSize(32);
    imageMode(CENTER);
    ellipseMode(CENTER);
}

function askCity(){
    var url=api+input.value()+apiKey;
    loadJSON(url,gotData);
}

function preload(){
    temparature_img=loadImage('temp.svg');
    humidity_img=loadImage('humidity.svg');
    location_img=loadImage('location.svg');
    lonlan_img=loadImage('globe.svg');
    rain_img=loadImage('rain.svg');
    wind_img=loadImage('wind.svg');
    pressure_img=loadImage('pressure.svg');

}
function gotData(data){
    weather=data;
}

function draw(){
    if(weather){

    
    var img_size=45;
    background(255);
    fill('#1d1e1e');
    textSize(36);textStyle(BOLD);
    image(location_img,300,50,img_size,img_size);
    text(weather.location.name,300,115);
    textSize(17);textStyle(NORMAL);
    text(weather.location.region+","+weather.location.country,300,145);
    textSize(25);
    text(weather.current.condition.text,300,200);
    textSize(13);
    image(temparature_img,100,300,img_size,img_size);
    text("Temprature",100,270);

    image(humidity_img,300,300,img_size,img_size);
    text("Humidity",300,270);

    image(rain_img,500,300,img_size,img_size);
    text("Precipitation",500,270);

    image(lonlan_img,100,475,img_size,img_size);
    text("Coordinates",100,445);

    image(wind_img,300,475,img_size,img_size);
    text("Wind Speed",300,445);

    image(pressure_img,500,475,img_size,img_size);
    text("Pressure",500,445);
     fill(0);
    textStyle(BOLD);
    textSize(17)
    text(weather.current.temp_c,100,350);
    noFill();
    ellipse(120,335,5,5);
    fill(0);
    text(weather.current.humidity+" %rh",300,350);
    text(weather.current.precip_mm+"mm",500,350);
    text("lat:"+weather.location.lat,100,530);
    text("lon:"+weather.location.lon,104,555);
    text(weather.current.wind_kph+" kph",300,530);
    text(weather.current.pressure_mb+" mb",500,530);



    }
    

    
   

}



/*
 if(weather){
        push();
        textSize(20);
        text("Longitude "+ weather.location.lon,100,100);
        text("Lattitude "+ weather.location.lat,100,125);
        text("Temparature "+ weather.current.temp_c,100,150);
        text("Humidity "+ weather.current.humidity,100,175);
        text("Air Pressure "+ weather.current.pressure_in,100,200);
        text("Wind Speed "+ weather.current.wind_kph,100,225);
        text("Description "+ weather.current.condition.text,100,245);
        text("Precipitation "+ weather.current.precip_mm + "mm",100,270);
        pop();
    }
*/