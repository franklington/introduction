const width = 1200;
const height = width;


function setup() {
  createCanvas(width, height);

  
}

function draw() {

  const d = new Date();
  let millis = d.getUTCMilliseconds();
  let second = d.getSeconds();
  let minute = d.getMinutes();
  let hour = d.getHours();

  background(230);
  rectMode(CENTER);
  translate(width/2, height/2);


  ellipse(posX,posY,50,50);
  stroke(20, 20, 20, 1);
  strokeWeight(10);

  DC.circle(550);

  
  // Clear Backgorund
  
  /*strokeWeight(0);
  let i = 0;
  for(i = 0; i<10; i++){
    fill(255,0,0,i*10);

    let posX = mouseX + 40 * sin(((frameCount+i)%3600)*0.3); 
    let posY = mouseY + 40 * cos(((frameCount+i)%3600)*0.3); 
    ellipse(posX,posY,50,50);
  } 
  text("X:" + mouseX + " Y:" + mouseY, 1100, 600, 1200, 800);
*/

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