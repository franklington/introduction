const width = 800;
const height = width;


function setup() {
  createCanvas(width, height);
  frameRate(60);

  
}

function draw() {

  const d = new Date();
  let millis = map(d.getMilliseconds(), 0 , 1000, 0.00, 360.00); 
  let second = map((d.getSeconds()*Math.pow(10,3) + d.getMilliseconds()), 0 , 60000, 0.00, 360.00);
  let minute = map((d.getMinutes()*60 + d.getSeconds()), 0 , 3600, 0.00, 360.00);
  let hour = map((d.getHours()*60 + d.getMinutes()), 0 , 3600, 0.00, 360.00);;
  let time = [millis, second, minute, hour];
  time.reverse();
  let biggestCircle = 550;
  let gapBetween = 150; 

  background(230);

  
  rectMode(CENTER);
  translate(width/2, height/2);
  textSize(20);
  textAlign(CENTER);
  text(d.getHours() + "h " + d.getMinutes() + "'' "+ d.getSeconds() + "'" , 0, 350);

  noFill();
  stroke(180);
  strokeWeight(1);

  for(var i = 0; i < 4; i++){
    DC.circle(biggestCircle - (gapBetween*i));
  }
  rotate(radians(-90));
  for(var i = 0; i < 4; i++){
    //position of pointer
    let offset = (biggestCircle/2) - ((gapBetween/2)*i)

    let posX = offset * cos(radians(time[i])); 
    let posY = offset * sin(radians(time[i])); 
    
    noStroke();
    fill(0)
    circle(posX, posY, 10*(Math.abs(i-4)));
  }
}




changeBg = ()=>{
  let val = random(255);
  background(val);
}

class DC{
  static circle(diameter){
    ellipse(0,0,diameter,diameter);
  }
}