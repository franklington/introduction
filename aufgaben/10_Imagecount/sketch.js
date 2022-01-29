const width = 2000;
const height = 800;
let img;
let artboard;
let detections;
let fileSelect;
let filePathForDrawing;
let fileName = "unknown";
let markerColor = "#ff0000";

function setup() {
  createCanvas(width, height);
  createMenu();
  imgLoad();
  artboard = createGraphics(width, height);
  detections = new Array(); 
}

function draw() {
  clear();
  image(img, 0, 0,img.width/5, img.height/5);
  image(artboard,0,0);
}


function keyPressed(e) {
  console.log(e);
  if(e.ctrlKey && e.key === "z"){
    e.preventDefault();
    console.log("backwards");
    revertDetections();
  }
  if(e.ctrlKey && e.key === "s"){
    console.log("save");
    e.preventDefault();

    exSVG();
   
  }
  if(e.ctrlKey && e.key === "r"){
    console.log("reset");
    e.preventDefault();

    resetDetections();
   
  }

  if(e.key === "Tab"){
    console.log("next");
    e.preventDefault();
    fileSelect.selectNext();
    fileChanged();
   
  }
}
let timer;
let result;
let timeTaken;


function mousePressed() {

}

function mouseReleased() {
  if(mouseX < img.width/5 && mouseY < img.height/5){
    detections.push({x:mouseX, y:mouseY});
  }
  renderArtboard();
}

function renderArtboard(){
  artboard.clear();
  artboard.push();
  artboard.fill(markerColor);
  artboard.textSize(20);
  artboard.text(fileName +" "+ detections.length, 20,20);

  artboard.noStroke();
  detections.forEach(item => {
    artboard.ellipse(item.x, item.y, 10);
  });
  artboard.pop();
}
function revertDetections(){
  detections.pop();
  renderArtboard();
}
function resetDetections(){
  detections = new Array();
  renderArtboard();
}

function exSVG(){
  let pgr = createGraphics(width, height);
  let file = prompt("Please enter your filename", fileName);
  if(file == null)
    return;

  pgr = createGraphics(width, height, SVG, file);
  pgr.push();
  pgr.fill(255,0,0);
  pgr.noStroke();
  detections.forEach(item => {
    pgr.ellipse(item.x, item.y, 10);
  });
  pgr.textSize(20);
  pgr.text(fileName +" "+ detections.length, 20,20);
  pgr.pop();
  pgr.save(filePathForDrawing+" "+file+" "+detections.length+".svg");
}

let saveBtn, 
    resetBtn,
    revertBtn,
    labelInput,
    colorInput;

function createMenu(){
  let options = new Array();
  options.push(new sBOption("./Panos/Pano Ort1.jpeg", "Ort 1", true));
  options.push(new sBOption("Panos/Pano Ort2.jpeg", "Ort 2"));
  options.push(new sBOption("./Panos/Pano Ort3.jpeg", "Ort 3"));
  options.push(new sBOption("./Panos/Pano Ort4.jpeg", "Ort 4"));
  options.push(new sBOption("./Panos/Pano Ort5.jpeg", "Ort 5"));

  filePathForDrawing = options[0].value;

  fileSelect = new SelectBox("fileSelect", "Select  a file:", options, "fileselect", "#container");
  fileSelect.bindOnChange(fileChanged);

  saveBtn = new Button("saveBtn", "Save (s)", "saveBtn", "#container");
  saveBtn.bindClick(exSVG);


  resetBtn = new Button("resetButton", "Reset (r)", "resetButton", "#container");
  resetBtn.bindClick(resetDetections);
  revertBtn = new Button("revertBtn", "Revert (y)", "revertBtn", "#container");
  revertBtn.bindClick(revertDetections);


  colorInput = new Input("colorIO", "Change color:", "colorIO", markerColor, "color", "#container", markerColor);
  colorInput.bindOnChange(changeColor);


  labelInput = new Input("filename", "Set filename:", "filename", fileName, "text", "#container", fileName);
  labelInput.bindOnChange(changeFilename);

}
function fileChanged(){
  filePathForDrawing = fileSelect.value;
  imgLoad();
}

function changeFilename(){
 fileName = labelInput.value;
 renderArtboard
}

function imgLoad(){
  img = loadImage(filePathForDrawing);
}

function changeColor(){
  markerColor = colorInput.value;
  renderArtboard();
}