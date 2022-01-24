const width = 1800;
const height = 900;
let file;
let data;
let radius = 400;
let ufoTypes;
let menu;
let minDuration;
let maxDuration;






function preload() {
  img = loadImage('dnb_land_ocean_ice.2012.3600x1800.jpg');
  //Lade die Tabelle
  data = loadTable("../../datasets/02_UFO_sightings_selection.csv", 'ssv', 'header');
  myFont = loadFont('fonts/VT323-Regular.ttf');
}



function setup() {
  //Stelle die Ansicht auf 3D um
  createCanvas(windowWidth, windowHeight, WEBGL);

  //Erstelle das Menü 
  //p5js intern nicht möglich weil 3D 
  //deshalb kleiner Render
  menu ={
    autoRotate: new Checkbox("autorotate", "auto rotate", true, "#0ff00", "#settings"),
    showEarth: new Checkbox("showearth", "show earth (experimental)", false, "#0ff00", "#settings"),
    showDuration: new Checkbox("duration", "scale based on duration", false, "#0ff00", "#filters"),
    showLabels: new Checkbox("label", "show label", false, "#0ff00", "#filters"),

  };
 
  let durations = data.getColumn("duration (seconds)");

  let durationsNumbers = durations.filter(Number);
  minDuration = parseInt(min(durationsNumbers));
  maxDuration = parseInt(max(durationsNumbers));
  console.log(maxDuration);
  console.log(minDuration);

  let rows = data.getRowCount();

  ufoTypes = {
    circle: new UFOType("circle", "#0FFF00", "circle / disks / cylinder"),
    light: new UFOType("ligth", "#FFFF00", "lights"),
    fireball: new UFOType("fireball", "#FF0000", "fireball"),
    formation: new UFOType("formation", "#00ff00", "formation"),
    triangle: new UFOType("triangle", "#00ffff", "triangle"),
    unkown: new UFOType("unkown", "#aaaaaa", "unkownn")
  }


  
  //Setup 3D Points
  for(var r = 0; r < rows; r++){
      
    var lat = radians(data.getString(r, "Latitude"));
    var lon = radians(data.getString(r, "Longitude"));

    var duration = data.getString(r, "duration (seconds)");
    var city  = data.getString(r, "city");
    var type  = data.getString(r, "shape");



    var x = radius * sin(lon ) * cos(lat);
    var y = radius * sin(lon) * sin(lat);
    var z = radius * cos(lon);

    ufo = new UFOSight(x,y,z,type,parseInt(duration),city);

    switch(type){
      case "cylinder": 
      case "circle":
      case "disk":
        ufoTypes.circle.addUFO(ufo)
        break;
      case "light":
        ufoTypes.light.addUFO(ufo)
        break;
      case "fireball":
        ufoTypes.fireball.addUFO(ufo)
        break
      case "formation":
        ufoTypes.formation.addUFO(ufo)
        break;
      case "triangle":
        ufoTypes.triangle.addUFO(ufo)
        break;
      default:
        ufoTypes.unkown.addUFO(ufo)
    }
  }

  

  //let lights = new Checkbox("lights", "lights", true, "#ff0000", "#types");
 
}


function draw() {
  background(0);
  //lights();
  orbitControl(.8,.8,.01);


  if(menu.autoRotate.value){
    Earth.rotate();
  }
  else{
    Earth.stopRotate();
  }

  //camera(0, 0, 1000);
  //directionalLight(250, 250, 250, width, height, -1);

  if(menu.showEarth.value){
    Earth.showEarth();
  }
  
  for (var key in ufoTypes) {
    let typeItem = ufoTypes[key];

    if(typeItem.isShow){
      let ufos = typeItem.ufoList;
      let color = typeItem.color;
      let type = typeItem.type;
     

      fill(color);
      noStroke();
      for (var r = 0; r < ufos.length; r++) {
        push();
      
        translate(ufos[r].x, ufos[r].y, ufos[r].z)
       
        let size = 3;
        if(menu.showDuration.value){
          size = map(ufos[r].duration, minDuration, 3600 ,3 ,8 ,true);
          //console.log(size);
        }
        sphere(size);
        //rotateY();

        if(menu.showLabels.value){
          
          translate(5, 5, 5);
          textFont(myFont);
          textSize(5);
          textAlign(CENTER, RIGHT)
          text(ufos[r].city, 0, 0);
        }
       
        pop();
      }

    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



class Earth{
  static rotationConst = 0;
  static rotationVelo = 0.005;
  static showEarth(){
    push();
    fill(250);
    noStroke();
    fill(250);
    noStroke();
    rotateY(radians(175));
    texture(img);
    sphere(radius);
    pop();
  }
  static rotate(){
    rotateY(Earth.rotationConst += Earth.rotationVelo);
  }
  static stopRotate(){
    rotateY(Earth.rotationConst);
  }
}

class UFOSight{
  x;y;z;
  type;
  duration;
  city;

  constructor(x,y,z,type,duration,city){
    this.x = x;
    this.y = y;
    this.z = z;
    this.type =type;
    this.duration=duration;
    this.city=city;
  }
  hoverd = (px,py) =>{
    let d = dist(px,py, this.x,this,y);
    if(d <= 10){
      console.log(this.city);
    }
  }
}

class UFOType{
  ufoList;
  ufoType; 
  controlElem;
  label;
  color;
  isShow;

  constructor(ufotype, color, label, isshow = true){
    this.ufoType = ufotype;
    this.color = color; 
    this.label = label;
    this.isShow = isshow;
    this.ufoType = ufotype;
    this.controlElem = new Checkbox(ufotype, label, isshow, color);
    this.controlElem.bindCheckState(this.checkStateChanged);
    this.ufoList = new Array();
  }
  addUFO = ufo =>{
    this.ufoList.push(ufo);
    this.controlElem.addCount(this.ufoList.length);
  }
  checkStateChanged = e => {
    this.isShow = e.currentTarget.checked;
  }
}