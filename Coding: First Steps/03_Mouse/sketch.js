function setup() {
  createCanvas(1200, 800);
  translate(0, 0);

}
let button;

function draw() {
background(255);
  
  strokeWeight(0);
  let i = 0;
  for(i = 0; i<10; i++){
    fill(255,0,0,i*10);

    let posX = mouseX + 40 * sin(((frameCount+i)%3600)*0.3); 
    let posY = mouseY + 40 * cos(((frameCount+i)%3600)*0.3); 
    ellipse(posX,posY,50,50);
  } 
  text("X:" + mouseX + " Y:" + mouseY, 1100, 600, 1200, 800);

  //LEARNINGS
  //zeige draw spezifikationen 
  // console log zeigen
  // random werte zeigen
  // random werte aufrunden (floor) zeigen


  button = createButton('click me');
  button.position(0, 0);
  button.mousePressed(changeBg);
}




changeBg = ()=>{
  let val = random(255);
  background(val);
}

class DrawingFuctions{
  
  static drawText(text, pos){

  }
}