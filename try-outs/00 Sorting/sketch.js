var sorted;

function preload() {
  img = loadImage("test-image.jpeg");
}

function setup() {
  createCanvas(img.width, img.height);
  img.resize(200, 0);
  sorted = img.get();
  sorted.loadPixels();
  let columns = img.width;
  let rows = img.height;
  let hasChanged = true;
  let run = true; 
  do{
    hasChanged= false;
    var offset = 0;
    run = !run;
    if(run){
      offset = 1;
    }
    for (var c = 0; c < columns; c++) {
      
      for (var r = 0; r < rows; r++) {

        let aPix = sorted.pixels[c*r + r];
        let bPix = sorted.pixels[c*r + ++r + offset];
        console.log(aPix);
        console.log(bPix);

        let hA = hue(aPix);
        let hB = hue(bPix);
        //var pix = sorted.pixels[j];
        // Sort by hue
        if (hB > hA) {
          var tempPix = aPix; 
          aPix = bPix;
          bPix = tempPix;
          hasChanged = true;

        }
      }
    }

  }while(hasChanged);
  

  sorted.updatePixels();
}

function draw() {

  background(220);
  //image(img,0,0,500,400);
  image(sorted, 0, 0);

}
