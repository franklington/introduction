const width = 1800;
const height = 900;
let file;
let data;

function preload(){
  data = loadTable("../../datasets/02_UFO_sightings_selection.csv", 'ssv', 'header');
  file = new Data(data);
}

function setup() {
  createCanvas(width, height);
  background(240);
  text(`Hallo  ${data.getColumnCount()}`, 0, 0, width, height);
  //translate(width / 2, height / 2);


  let columns = data.getColumnCount();
  let rows = data.getRowCount();
  let fontSize = 12;

  let minDuration;
  
  for(var r = 0; r < rows; r++){
      
      var lat = data.getString(r, "Latitude");
      var lng = data.getString(r, "Longitude");

      var x = map(lat, -90, 90, 0, height);
      var y= map(lng, -180, 180, 0, width);

      var duration = data.getString(r, "duration (seconds)");

      var name  = data.getString(r, "city");
      var shape  = data.getString(r, "shape");

      switch(shape){
        case "circle": 
          fill(0,255,0);
          noStroke();
          circle(x,y, 10)

        break; 

        default:{

        } 
      }
      //rotate(0);
      //text(data.getString(c,r), c*width/columns, r*fontSize,  (++c)*width/columns,  (++r)*fontSize);
  }

  //CREATE GUI
  
}

function draw() {


}



class Data{
  data;

  constructor(data){
    data = data;
  }
  static circle(diameter){
    ellipse(0,0,diameter,diameter);
  }
}