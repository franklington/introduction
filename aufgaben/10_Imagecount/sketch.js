const width = 2000;
const height = 800;
let img;
let artboard;
let detections;
let fileSelect;
let filePathForDrawing;
let fileName = "unknown";
let markerColor = "#ff0000";
let imgResizeDivider = 5;

function setup() {
  createCanvas(width, height);
  createMenu();
  imgLoad();
  detections = new Array(); 
  artboard = createArtboard();
  
}

function draw() {
  clear();
  image(img, 0, 0,img.width/imgResizeDivider, img.height/imgResizeDivider);
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
  if(mouseX < img.width/imgResizeDivider && mouseY < img.height/imgResizeDivider){
    detections.push({x:mouseX, y:mouseY});
  }
  renderArtboard();
}

function renderArtboard(){
  artboard = createArtboard();
}
function revertDetections(){
  detections.pop();
  renderArtboard();
}
function resetDetections(){
  detections = new Array();
  renderArtboard();
}

function createArtboard(svg = false){
  let buffer;
  if(svg){
    buffer = createGraphics(width, height, SVG);
  }
  else{
    buffer = createGraphics(width, height);
  }
  buffer.push();
  buffer.fill(markerColor);
  buffer.noStroke();
  buffer.textSize(20);
  detections.forEach(item => {
    buffer.text("x", item.x, item.y);
    //buffer.ellipse(item.x, item.y, 10);
  });
  
  buffer.text(fileSelect.selectedLabel +" | "+ fileName +" | "+ detections.length, 20,20);
  buffer.noFill();
  buffer.stroke(markerColor);
  buffer.rect(0,0,img.width/imgResizeDivider, img.height/imgResizeDivider);
  buffer.pop();
  
  return buffer;
}

function exSVG(){
  
  let file = prompt("Please enter your category", fileName);
  fileName = file;
  if(file == null)
    return;
  let pgr = createArtboard(true);
  var fname = fileSelect.selectedLabel +"_"+ file
  pgr.save( fname +".svg");
  download_csv(detections, fname);



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


  labelInput = new Input("filename", "Set category:", "filename", fileName, "text", "#container", fileName);
  labelInput.bindOnChange(changeFilename);

}
function fileChanged(){
  filePathForDrawing = fileSelect.value;
  resetDetections();
  imgLoad();
}

function changeFilename(){
 fileName = labelInput.value;

 renderArtboard();
}

function imgLoad(){
  img = loadImage(filePathForDrawing);
}

function changeColor(){
  markerColor = colorInput.value;
  renderArtboard();
}

var data = [
  ['Foo', 'programmer'],
  ['Bar', 'bus driver'],
  ['Moo', 'Reindeer Hunter']
];


function download_csv(data,name) {
   var csv = 'X,Y\n';
   data.forEach(function(row) {
           csv += row.x +","+ row.y;
           csv += "\n";
   });

   console.log(csv);
   var hiddenElement = document.createElement('a');
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
   hiddenElement.target = '_blank';
   hiddenElement.download = name+'.csv';
   hiddenElement.click();
}