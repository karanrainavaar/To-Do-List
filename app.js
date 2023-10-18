let button = document.querySelector("button");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let h2 = document.querySelector(".quote");
let h4 = document.querySelector(".author");
let url = "https://api.quotable.io/quotes/random";

let addTask = function(){
    if(input.value == ""){
        alert("Add your task! You didn't add anything.");
    }else{
    let list = document.createElement("li");
    ul.appendChild(list);
    list.innerText = input.value;
    let span = document.createElement("span");
    list.appendChild(span);
    span.innerHTML = "\u00d7";
    }
    input.value = "";
    saveTask();
};

button.addEventListener("click",addTask);

ul.addEventListener("click",(event) => {
    if(event.target.nodeName === 'LI'){
        let list = event.target;
        list.classList.toggle("checked");
        saveTask();   
    }else if(event.target.nodeName === "SPAN"){
        let deleteList = event.target.parentElement;
        deleteList.remove();
        saveTask();   
    }
});

function saveTask(){
    localStorage.setItem("data",ul.innerHTML);
};

function showTask(){
    ul.innerHTML = localStorage.getItem("data");
};

showTask();

async function randomQuote() {
    try{
      let result = await axios.get(url);
        h2.innerText = `"${result.data[0].content}"`;
        h4.innerText = `- ${result.data[0].author}`;
    }catch(error){
        console.log(error);
    }
};

setInterval(() => {
    randomQuote();
},30000);
 