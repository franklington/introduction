const width = 1000;
const height = 1000;
let step = 2; // time step
let xDistance;
let data;
let strasse = [], 
    bahn = [],
    flugzeug = [],
    header = [],
    colorsBahn,
    colorsStrasse,
    colosFlugzeug;





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

  //Erstelle das Menü 
  //p5js intern nicht möglich weil 3D 
  //deshalb kleiner Render
  for(let i = 1; i < data.getColumnCount(); i++){


  
      header.push(convert(data.get(0,i)));
      bahn.push(convert(data.get(1,i)));
      strasse.push(convert(data.get(2,i)));
      flugzeug.push(convert(data.get(3,i)));
    
   
  }

  console.log(bahn);


  xDistance = (width/header.length);
  colorsBahn = d3.range(height).map(i => color(0, 0, map(i,0,height, 50, 200).toFixed(0)));
  colorsStrasse = d3.range(height).map(i => color(0,map(i,0,height, 50, 200).toFixed(0),0));
  colorsFlugzeug = d3.range(height).map(i => color(map(i,0,height, 50, 200).toFixed(0),0,0));
  //let lights = new Checkbox("lights", "lights", true, "#ff0000", "#types");
 
}

let drawHeader = [],
    drawBahn = [],
    drawStrasse = [],
    drawFlugzeug = [];

let showDataPoint = 0; 
let fy = _ => map(_, 0, 300, height, 10);

function draw() {
  background(255);

    
    // length of data list -1 (to access last item of data list)

  
    // frameCount
    let f = frameCount;
    
    //console.log(step);
    if(f%step == 0 && showDataPoint < header.length-1){
      showDataPoint++;
     
    }
    
      
    // iterate over data list to rebuild curve at each frame

    drawGraph(bahn, showDataPoint, colorsBahn, "Schiene");
    drawGraph(strasse, showDataPoint, colorsStrasse, "Straße");
    drawGraph(flugzeug, showDataPoint, colorsFlugzeug, "Flugzeug");
    // draw ellispe at last data point


}

function drawGraph(data, dataPointsToDraw, colors, caption){
  for (let i = 0; i < dataPointsToDraw; i++) {
    
    y1 = fy(data[i]);
    y2 = fy(data[i+1]);
    x1 = (xDistance*i);
    x2 = (xDistance*(i+1));

    
    // vertical lines (x-values)
    strokeWeight(1);
    //line(x1, height, x1, y1 + 2);
    
    // polyline
    strokeWeight(2);
    stroke(colors[Math.floor(map(y1, height, 10, height, 0))]);
    line(x1, y1, x2, y2);


    if (dataPointsToDraw-1 == i) {
      ellipse(x2, y2, 4, 4);

      noStroke();
      fill(colors[Math.floor(map(y1, height, 10, height, 0))]);
      textSize(20);
    
      text(caption, x2, y2, 100,100);
    }
    
  }
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

