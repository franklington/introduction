const width = 1800;
const height = 900;
let data;
let menu;
let statistics;







function preload() {
  //img = loadImage('dnb_land_ocean_ice.2012.3600x1800.jpg');
  data = loadTable("lifetime.csv", 'ssv', 'header');

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  let countries = data.getColumn("Country");
  let genders = ["female", "divers", "male"];
  menu ={
    country: new SelectBox("countries", "country",countries, "Austria"),
    genders: new SelectBox("genders", "gender",genders, "female"),
    age: new Input("age", "age", 27),


  };
 
  


  statistics = new Array();
  let rows = data.getRowCount();
  //Setup 3D Points
  for(var r = 0; r < rows; r++){
      

    var country = data.getString(r, "Country");
    var divers  = data.getString(r, "Both sexes");
    var male  = data.getString(r, "Male");
    var female = data.getString(r, "Female");

    statistics[country] = { "female": female, "male": male, "divers": divers};

  }

  

  //let lights = new Checkbox("lights", "lights", true, "#ff0000", "#types");
 
}


function draw() {
  background(230);
  let selectedCountry = menu.country.value;
  let selectedSex = menu.genders.value;
  let age = menu.age.value;

  let averageLifespan = statistics[selectedCountry][selectedSex];
  let boxes = parseInt(averageLifespan * 52.1786);
  let agedBoxes = parseInt(age * 52.1786);
  
  let boxCount = 0;
  let padding = 50;
  let spacing = 2;
  let size = 12; 
  let step = size+spacing;
  let calcBoxSize = parseInt(sqrt((windowHeight-(2*padding))*(windowWidth-(2*padding)))/100);
  console.log(calcBoxSize);
  size = calcBoxSize;
 step = size+spacing;

  stroke(0);
  for(var y = 0+padding; y+padding < windowHeight; y+= step){
    for(var x = 0+padding; x+padding < windowWidth; x+= step){
      if(boxCount >= boxes){
        break;
      }
      //current age
      if(boxCount >= agedBoxes){
        noFill();
      }
      // 18 
      else{
        fill(255, 24, 70);
      }

      rect(x,y,size,size);
      boxCount++;
    }
    if(boxCount >= boxes){
      break;
    }
  }
  noStroke();
  fill(41);
  textSize(40);
  text("average age "+ averageLifespan, windowWidth - (padding+400), windowHeight - 100, 400, 400)
  

  


  


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


