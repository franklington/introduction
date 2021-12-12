

class Checkbox{
   name; 
   label;
   defaultValue;
   color; 
   elem;
   value;
   count=0;
   
   constructor(name, label, defaultValue = true, color,  parent = "#types", count = 0){
      this.color = color;
      this.name = name;
      this.label = label;
      this.defaultValue = defaultValue;
      this.value = this.defaultValue;
      this.parent = parent;
      this.render();
      
   }
   render = () => {

      XD(this.parent).insertAdjacentHTML("beforeend", this.template());
      this.elem =  document.getElementById(this.name);
      this.elem.addEventListener("change", this.change, false);
   }
   change = e =>{
      this.value = e.currentTarget.checked;
   }
   bindCheckState = eventHandler =>{
      this.elem.addEventListener("change", eventHandler, false);
   }

   template = () =>{
      return `
      <style>
         #${this.name}:checked{background-color:${this.color} !important;}
         #${this.name}{border-color:${this.color} !important;} 
      </style>
      <div class="control">
           <input type="checkbox"  ${(this.defaultValue ? "checked" : "")} name="${this.name}<" id="${this.name}"><label for="${this.name}<">${this.label} </label>
      </div>
      `;
   }
   addCount = counter =>{
      this.count = counter;
      for (let i = 0; i < this.elem.parentElement.children.length; i++) {
         if(this.elem.parentElement.children[i].tagName == "LABEL"){
            this.elem.parentElement.children[i].innerHTML = `${this.label} (${this.count})`;
         }
      }
   }

}


let XD = elem => {
   switch(elem.charAt(0)){
      case ".":
         return document.getElementsByClassName(elem.substring(1));
      case "#":
         return document.getElementById(elem.substring(1));
      default:
         return document.getElementsByTagName(elem);    
   }
}



class SelectBox{
   name; 
   label;
   defaultValue;
   options; 
   elem;
   value;
   
   constructor(name, label, options, defaultValue, parent = "#types"){
      this.options = options;
      this.name = name;
      this.label = label;
      this.defaultValue = defaultValue;
      this.value = this.defaultValue;
      this.parent = parent;
      this.render();
      
   }
   render = () => {

      XD(this.parent).insertAdjacentHTML("beforeend", this.template());
      this.elem =  document.getElementById(this.name);
      this.elem.addEventListener("change", this.change, false);
   }
   change = e =>{
      this.value = e.currentTarget.value;
   }
   bindChange = eventHandler =>{
      this.elem.addEventListener("change", eventHandler, false);
   }

   template = () =>{
      let template = `
      <label for="${this.name}">${this.label}</label>
      <select id="${this.name}" name="${this.name}">
      `;
      for(var i = 0; i < this.options.length; i++){
         let option = this.options[i];
         if(option == this.defaultValue){
            template += `<option selected value="${option}"">${option}</option>`;
         }
         else{
            template += `<option value="${option}"">${option}</option>`;
         }
       
      }
      template += `</select>`;
      return template;
   }

}


class Input{
   name; 
   label;
   defaultValue;
   elem;
   value;
   
   constructor(name, label, defaultValue, parent = "#types"){
      this.name = name;
      this.label = label;
      this.defaultValue = defaultValue;
      this.value = this.defaultValue;
      this.parent = parent;
      this.render();
      
   }
   render = () => {

      XD(this.parent).insertAdjacentHTML("beforeend", this.template());
      this.elem =  document.getElementById(this.name);
      this.elem.addEventListener("change", this.change, false);
   }
   change = e =>{
      this.value = e.currentTarget.value;
   }
   bindChange = eventHandler =>{
      this.elem.addEventListener("change", eventHandler, false);
   }

   template = () =>{
      let template = `
      <label for="${this.name}">${this.label}</label>
      <input type="number" id="${this.name}" name="${this.name}"
       min="0" max="120" value="${this.defaultValue}">
      `;

      return template;
   }

}