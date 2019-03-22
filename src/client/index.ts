import './assets/styles/main.css';
import image from './assets/image/books01.png';

const axios = require("axios");

const undesiredElements = [
    "id",
    "image_url"
]
/*
let img:HTMLImageElement = document.createElement('img');
img.src = image;
img.style.width = "25%";
document.getElementById("header").appendChild(img);
*/
document.getElementById("fakeSubmit").addEventListener("click", () => sendObject());
document.getElementById("titleInput").addEventListener("input", (e) => autocomplete(e.target));
document.getElementById("authorInput").addEventListener("input", (e) => autocomplete(e.target));

let sendObject = ():void => {
    clearDiv("result_table_div");
    let resultObj = createObject();    
    axios.post(
        "http://localhost:8080/submit-form",
        resultObj
    ).then(res => document.getElementById("result_table_div").appendChild(createOutput(res.data))
    ).catch(err => console.log(err));
    
}

let createObject = ():{} => {
    let resultObj = {};
    let inputArr = document.getElementsByClassName("inputFields");

    for (let field of inputArr) {        
        if(document.getElementById(field["name"] + "_Check")["checked"]) {
            resultObj[field["name"]] = field["value"];
        }
    }    
    return resultObj;
}

let createOutput = (resultArr:Array<Object>):HTMLTableElement => {
    let table:HTMLTableElement = document.createElement('table');

    for (let object of resultArr) {        
            
        let row:HTMLTableRowElement = document.createElement('tr');
        
        let imgTD:HTMLTableCellElement = document.createElement("td");

        let ttDiv:HTMLDivElement = document.createElement("div");
        ttDiv.classList.add("tooltip");

        let ttDivTable:HTMLTableElement = createTableTooltip(object);
        ttDivTable.classList.add("tooltiptext");

        ttDiv.appendChild(ttDivTable);
        /*
        let ttDivSpan:HTMLSpanElement = document.createElement("span");
        ttDivSpan.innerText = "fuck yeah, it works";
        ttDivSpan.classList.add("tooltiptext");
        
        ttDiv.appendChild(ttDivSpan);
        */
        imgTD.appendChild(ttDiv);
        let image:HTMLImageElement = document.createElement('img');
        image.src = object["image_url"];

        

        imgTD.appendChild(image);
        row.appendChild(imgTD);

        let authorTD:HTMLTableCellElement = document.createElement("td");
        authorTD.innerHTML = object["title"] + "<br>by " + object["authors"];
        authorTD.classList.add("author");

        row.appendChild(authorTD);
        
        table.appendChild(row);
    }  
    return table;
}

let createTable = (resultArr:Array<Object>):HTMLTableElement => {
    
    let table: HTMLTableElement = document.createElement('table');       
    
     
        
        let heading: HTMLTableRowElement = document.createElement('tr');  
        
        for (let head of Object.keys(resultArr[0])) {        
            let genericTD:HTMLTableCellElement = document.createElement("th");
            genericTD.innerText = head;
            heading.appendChild(genericTD);
        }
        
        table.appendChild(heading);    
        
        for (let object of resultArr) {        
            
            let row = document.createElement('tr');
            
            for(let value of Object.values(object)) {            
                let genericTD:HTMLTableCellElement = document.createElement('td');
                genericTD.innerText = value;
                row.appendChild(genericTD);
            }
            
            table.appendChild(row);
        }  
    
       

    return table;
};  

let createTableTooltip = (resultObject):HTMLTableElement => {
    
    let table: HTMLTableElement = document.createElement('table'); 
    table.classList.add("tooltiptable");    
        
    for (let key of Object.keys(resultObject)) {        
            
        if (!undesiredElements.includes(key)) {

            let row = document.createElement('tr');
                
            let keyTH:HTMLTableCellElement = document.createElement("td");
            keyTH.innerText = getCleanKey(key) + ":";

            let valueTD:HTMLTableCellElement = document.createElement("td");
            valueTD.innerText = resultObject[key];
            valueTD.classList.add("tooltiptablevalue");

            row.appendChild(keyTH);
            row.appendChild(valueTD);

            table.appendChild(row);

        }
    }

    return table;
};  


let clearDiv = (divId:string) => {
    document.getElementById(divId).innerHTML = "";
} 

let getCleanKey = (myStr:string) => {
    while (myStr.includes("_")) {
        myStr = myStr.replace("_", " ");
    }    
    myStr = getWordsUC(myStr);    
    return myStr;
}

let getWordsUC = (myStr:string) => {
    let wordArr = myStr.split(" ");
    wordArr = wordArr.map(e => 
        e.substr(0,1).toUpperCase() + e.substr(1, e.length)        
    );
    console.log(wordArr);
    return wordArr.join(" ");
}

let autocomplete = (field) => {
    if (field.value.length > 3) {
        axios.post(
            `http://localhost:8080/autocomplete/${field.name}`,
            {value: field.value}
        ).then(res => {            
            let autoArr = createArrayFromResult(res.data, field.name);
            createAutocompleteBox(field, autoArr);
        }).catch(err => console.log(err))
    }
} 

let createArrayFromResult = (arr, fieldName) => {
    let resultArr = [];
    
    for (let e of arr) {
        resultArr.push(e[fieldName]);
    }    
    
    return resultArr;
} 

let createAutocompleteBox = (field, arr) => {
    let id = field.name + "_auto_div";
    let div = document.createElement("div");
    div.id = field.id + "autocomplete-list";
    div.classList.add("autocomplete-items");
    field.appendChild(div); 
    for (let i = 0; i < arr.length; i++) {
        
        let subDiv = document.createElement("div");
        subDiv.innerHTML = arr[i].substr(0, field.value.length);
        subDiv.innerHTML += arr[i].substr(field.value.length);
        subDiv.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        
        subDiv.addEventListener("click", (e) => {
            field.value = subDiv.innerText;
            document.getElementById(id).removeChild(div);
        })
        
        div.appendChild(subDiv);        
    }
    document.getElementById(id).appendChild(div);
}

let closeList = () => {
    document.getElementById("");
}