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

class Checkbox{
    name; 
    label;
    defaultValue;
    color; 
    elem;
    value;
    count=0;
    
    constructor(name, label, defaultValue = true, color,  parent = "body", count = 0){
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

 class SelectBox{
     label;
     name;
     id;
     options;
     value;
     selectedLabel;

     constructor(id, label, sBOptions, name, parent = "body", value){
        this.id = id;
        this.label = label;
        this.name = name;
        this.options = sBOptions;
        this.value = value;

        sBOptions.forEach(option => {
           if(option.selected){
              this.value = option.value;
              this.selectedLabel = option.label;
           }
        });

        this.parent = parent;
        
        this.render();
        
     }
     render = () => {
 
        XD(this.parent).insertAdjacentHTML("beforeend", this.template());
        this.elem =  document.getElementById(this.id);
        this.elem.addEventListener("change", this.change, false);
     }
     template = () =>{
        return `
        <label for="${this.name}">${this.label}</label>
        <select name="${this.name}" id="${this.id}">
            ${ 
            this.options.map(x => x.template())
            }
        </select>
        `;
     }
     bindOnChange = eventHandler =>{
        this.elem.addEventListener("change", eventHandler, false);
     }
     change = e =>{
        this.value = e.currentTarget.value;
        this.selectedLabel = this.elem.options[ this.elem.selectedIndex].innerHTML;
        console.log(this.selectedLabel);
     }

     selectNext = () =>{
       this.elem.selectedIndex++; // will select Grapes
      this.selectedLabel = this.elem.options[ this.elem.selectedIndex].innerHTML;
      this.value =  this.elem.value;
       return this.value;
    
     }

 }
 


 class sBOption{
     id;
     label;
     value;
     selected;
     constructor(value, label, selected = false){
        this.label = label;
        this.value = value;
        this.selected = selected;
     }
     render = (parent) => {
        XD(parent).insertAdjacentHTML("beforeend", this.template());
        this.elem =  XD(id);
     }
     template = () =>{
        return `
        <option value="${this.value}" ${(this.selected != false) ?  "selected" : ""}>${this.label}</option>
        `;
     }

 }



 class Button{
    label;
    name;
    id;

    constructor(id, label, name, parent = "body"){
       this.id = id;
       this.label = label;
       this.name = name;
       this.parent = parent;
       this.render();
       
    }
    render = () => {
       XD(this.parent).insertAdjacentHTML("beforeend", this.template());
       this.elem =  document.getElementById(this.id);
    }
    template = () =>{
       return `
       <button name="${this.name}" id="${this.id}">
           ${this.label}
       </button>
       `;
    }
    bindClick = eventHandler =>{
       this.elem.addEventListener("click", eventHandler, false);
    }

}



class Input{
    label;
    name;
    type;
    id;
    value;

    constructor(id, label, name, placeholder,type="text", parent = "body", value){
       this.id = id;
       this.label = label;
       this.name = name;
       this.type = type;
       this.placeholder = placeholder;
       this.value = value;
       this.parent = parent;
       this.render();
       
    }
    render = () => {

       XD(this.parent).insertAdjacentHTML("beforeend", this.template());
       this.elem =  document.getElementById(this.id);
       this.elem.addEventListener("input", this.change, false);
    }
    template = () =>{
       return `
       <label for="${this.name}">${this.label}</label>
       <input name="${this.name}" id="${this.id}" type="${this.type}" value="${this.value}" placeholder="${this.placeholder}">
       `;
    }
    bindOnChange = eventHandler =>{
       this.elem.addEventListener("input", eventHandler, false);
    }
    change = e =>{
       this.value = e.currentTarget.value;
       console.log(this.value);
    }

}