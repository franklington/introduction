

let width = 400;
 let   height = 400;
let speed = 10;
let pg;
let circleSize = 30;

function setup() {
  createCanvas(width, height);
  pg = createGraphics(width,height);
  loop();
  imageMode(CENTER,CENTER);

}

function draw() {
  background(220);
  
  let f = (frameCount/speed) % 180;
  
  let x = cos((f))*50;
  let y = sin((f))*50;
  //pg.background(240);
  dst = createGraphics(pg.width,pg.height);
  //setImageAlpha(pg,dst, 180);
  dst.tint(255, 220);
  dst.image(pg,0,0,width,height);

  pg.clear();
  pg.image(dst,0,0,width,height);

  pg.push();
  pg.fill(0);
  pg.translate(width/2,width/2);
  pg.circle(x,y,circleSize);
  pg.pop();

  var size = 25;
  for(var i = 0; i <= height/size; i++){

    for(var u = 0; u <= width/size; u++){
      push();
      if(i%2 == 0){
        scale(-1, 1);
        
      }
      image(pg,u*size,i*size,100,100);
      pop();

      
    }
  }
}


function setImageAlpha(src,dst, alpha){
  alpha = constrain(alpha, 0, 255);
  
  src.loadPixels();
  dst.loadPixels();
  const NUM_BYTES = dst.pixels.length;
  // skip every 4 values (r, g, b, a)
  for(let i = 0 ; i < NUM_BYTES; i+= 4){
    // copy R, G, B
    dst.pixels[i + 0] = src.pixels[i + 0];
    dst.pixels[i + 1] = src.pixels[i + 1];
    dst.pixels[i + 2] = src.pixels[i + 2];
    // access alpha (index + 3) and modify
    dst.pixels[i + 3] = alpha;
  }
  dst.updatePixels();
}