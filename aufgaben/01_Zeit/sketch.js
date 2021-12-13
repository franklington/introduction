const WIDTH = 800;
const HEIGHT = WIDTH;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(60);
}

function draw() {

  const d = new Date();
  let now = clock();

  background('black');

  //Time in degrees with 2 floats
  let millis = map(d.getMilliseconds(), 0, 1000, 0.00, 360.00);
  let second = map((now.sec * Math.pow(10, 3) + d.getMilliseconds()), 0, 60000, 0.00, 360.00);
  let minute = map((now.min* 60 + now.sec), 0, 3600, 0.00, 360.00);
  let hour = map((((now.hours % 12) || 12) * 60 + now.min), 0, 720, 0.00, 360.00);;

  //Circles and runcycles
  let biggestCircle = 550;
  let gapBetween = 150;


  let time = [millis, second, minute, hour];

  //Change position inner to outer 
  time.reverse();

  //setup canvas and clear
  background(230);
  rectMode(CENTER);
  translate(WIDTH / 2, HEIGHT / 2);

  //draw helping text 
  textSize(20);
  textAlign(CENTER);
  text(now.hours + "h " + now.min + "'' " + now.sec + "'", 0, 350);

  //draw lines 
  noFill();
  stroke(180);
  strokeWeight(1);

  for (var i = 0; i < 4; i++) {
    let diameter = biggestCircle - (gapBetween * i);
    circle(0, 0, diameter);
  }

  //roate canvas to set 12h and 60minutes to top
  rotate(radians(-90));

  // draw each point
  for (var i = 0; i < 4; i++) {

    let offset = (biggestCircle / 2) - ((gapBetween / 2) * i)
    let posX = offset * cos(radians(time[i]));
    let posY = offset * sin(radians(time[i]));

    noStroke();
    fill(0)
    circle(posX, posY, 10 * (Math.abs(i - 4)));
  }
}

