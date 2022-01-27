const width = 1000;
const height = 1000;
const bufferWidth = width*24;
let step = 1; // time step
let xDistance;
let data;
let strasse = [], 
    bahn = [],
    flugzeug = [],
    header = [],
    colorsBahn,
    colorsStrasse,
    colosFlugzeug,
    colorsBackground = "#F1f1f1";

let bufferCanvas, legendCanvas;




function preload() {

  //Lade die Tabelle
  data = loadTable("./VerbraucherpreisIndex.csv", 'ssv');

}

function convert(val){
  return parseFloat(val);
  //return parseFloat(val.replace(",", "."));
}
function iR(row, column){
  let items = [];
  for(var i = 0; i < 12; i++){
    items.push(convert(data.get(row,column)));
  }
  return items;
  //return d3.range(12).map(i =>  map(i,0,11, convert(data.get(row,column)), convert(data.get(row,column+1))));
}

function setup() {
  //Stelle die Ansicht auf 3D um
  createCanvas(width, height);
  bufferCanvas = createGraphics(bufferWidth, height);
  legendCanvas = createGraphics(bufferWidth,height);
  //Erstelle das Menü 
  //p5js intern nicht möglich weil 3D 
  //deshalb kleiner Render
  for(let i = 1; i < data.getColumnCount(); i++){
      header.push(convert(data.get(0,i)));
      bahn.push(convert(data.get(1,i)));
      strasse.push(convert(data.get(2,i)));
      flugzeug.push(convert(data.get(3,i)));
  }

  xDistance = (bufferWidth/header.length);
  colorsBahn = "#F23F41";
  colorsStrasse = "#F2AB25";
  colorsFlugzeug = "#0C3891";

  drawLegend(header.length, colorsFlugzeug, legendCanvas);


  

  //let lights = new Checkbox("lights", "lights", true, "#ff0000", "#types");

}

let drawHeader = [],
    drawBahn = [],
    drawStrasse = [],
    drawFlugzeug = [];

let dataPointsToDraw = 300; 
let fy = _ => map(_, 0, 250, height-200, 40);

function draw() {
  // length of data list -1 (to access last item of data list)
  // frameCount
  let f = frameCount;
  //console.log(step);

  if(f%step == 0 && dataPointsToDraw < header.length-1){
    dataPointsToDraw++;
  }
    
      
  // iterate over data list to rebuild curve at each frame
  //bufferCanvas.background(colorsBackground);




  // draw ellispe at last data point
 /* let xPos = (showDataPoint*xDistance - (width-100))*-1;
  if(xPos >0){
    xPos = 0; 
  }*/

  let leftgap = 800;

  background(colorsBackground);
  bufferCanvas.clear();
  drawGraph(bahn, dataPointsToDraw, colorsBahn, "Train", bufferCanvas, f);
  drawGraph(strasse, dataPointsToDraw, colorsStrasse, "Car", bufferCanvas,f);
  drawGraph(flugzeug, dataPointsToDraw, colorsFlugzeug, "Airplane", bufferCanvas,f);

  
  //Start without moving
  if(dataPointsToDraw*xDistance < leftgap){
    image(legendCanvas,0,0,width,height, 0 , 0, width, height);
    image(bufferCanvas,0,0); 
  }
  //Move
  else{
    let posX = (dataPointsToDraw*xDistance - leftgap) + (f%step)/step * xDistance;
    let maxPosX = (header.length*xDistance - leftgap) + (f%step)/step * xDistance;

    if (posX < maxPosX-200){
        image(bufferCanvas,0,0,width,height, posX , 0, width, height);
        image(legendCanvas,0,0,width,height, posX , 0, width, height);
      
    }
    //Stop MOvig
    else{
      image(bufferCanvas,0,0,width,height, bufferWidth-(width+20 ), 0, width, height);
      image(legendCanvas,0,0,width,height, bufferWidth-(width+20) , 0, width, height);
    }


  }
  /*if(f < 1500){
    save(`vpi_animation_${f}.png`);
  }*/

  


}

function drawLegend(dataPointsToDraw, color, gB){
   gB.clear();
  let startingYear = 1991;
  let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let monthsColor = ["#256AA822", "#5FA4CC22", "#B1D5E622", "#E0786122",  "#B82D3522", "#7E082322"];
  monthsColor = monthsColor.concat(monthsColor.slice().reverse());

  for (let i = 0; i < (dataPointsToDraw+4); i++) {

    gB.push();
    gB.noStroke();
    gB.fill(color);
    gB.textSize(25);

    gB.text(months[i%12], xDistance*i+7, height-200, 100,100);

    gB.fill(monthsColor[i%12]);
    //gB.stroke(monthsColor[i%12]);
   // gB.line(xDistance*i, 0, xDistance*i, height);
    gB.rect(xDistance*i, 0,xDistance,height);

    if(i%12 ==0){
      gB.stroke(color);
      gB.line(xDistance*i,0,xDistance*i,height);
      gB.noStroke();
      gB.fill(color);
      gB.textSize(100);
      gB.text(startingYear, xDistance*i+10,height-150, 100,100);
      startingYear++;
    }
    gB.pop();

  }

  
  
}

function drawGraph(data, dataPointsToDraw, colors, caption, gB,time){
  
  let interpolPoint = (time%step)/step;
  for (let i = 0; i < dataPointsToDraw; i++) {
    
    y1 = fy(data[i]);
    y2 = fy(data[i+1]);
    x1 = (xDistance*i);
    x2 = (xDistance*(i+1));
    
    // vertical lines (x-values)
    gB.strokeWeight(1);
    // line(x1, height, x1, y1 + 2);
    
    // polyline
    gB.strokeWeight(5);
    gB.stroke(colors);
    gB.line(x1, y1, x2, y2);
    


    if (dataPointsToDraw-1 == i ) {
      //extrapolate

     var  x3 = lerp(x2, (xDistance*(i+2)),interpolPoint);
      var  y3 = lerp(y2, fy(data[i+2]),interpolPoint);
      if(dataPointsToDraw == data.length-1){
        gB.ellipse(x1, y1, 4, 4);
        gB.noStroke();
        gB.fill(colors);
        gB.textSize(30);
        gB.text(caption, x1+10, y1+10, 100,100);
        gB.textSize(25);
        let percent = data[i-2].toFixed(2) + "%";
        gB.text(percent, x1+10, y1+40, 100,100);
      }

      else{
        gB.line(x2, y2, x3, y3);
        gB.ellipse(x3, y3, 4, 4);
        gB.noStroke();
        gB.fill(colors);
        gB.textSize(30);
        gB.text(caption, x3+10, y3+10, 100,100);
        gB.textSize(25);
        let percent = data[i].toFixed(2) + "%";
        gB.text(percent, x3+10, y3+40, 100,100);
      }
     
      
      
    }
  }
}



function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

