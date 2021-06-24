// const images = require('./images')
import images from "./images.js";
// import {puppeteer} from '/puppeteer';
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params)
    var active = 0; //Active element position
const list = document.querySelector(".list") //get element with class list

/**
 * Created the inner Html content
 * using images imported which contains array of objects
 * objects having title and previewImage
 */
const listContentWithHTML = images.map((image, index) => {
    // if(image.title.length <= 31){   
        return(
            `<div class="list-content">
                    <img src=${image.previewImage} alt="${image.title}"></img>
                    
                    <p>${image.title.slice(0, image.title.length/2)}</p>
                    <p>${image.title.slice(image.title.length/2)}</p>
                
            </div>`
        );
}).join(" ")

// console.log(listContentWithHTML);

list.innerHTML = listContentWithHTML; //Applied innerHtml to listContentWithHTML to list element

const bigImg = document.querySelector("div.image img"); //get image element
bigImg.setAttribute("src", images[active].previewImage); //set image url to current active element's url

const belowText = document.querySelector(".image p"); //get below text element

const listContents = document.querySelectorAll('.list-content'); //Get all children under .list-content class
// console.log(listContents)

/**
 * Added Click Event Listener to all list items
 * Remove active class from current active element
 * Apply active class to clicked Element 
 */
listContents[active].classList.add("active")
listContents.forEach((listContent, index) => {
    listContent.addEventListener("click", function(){
        listContents[active].classList.remove("active");
        active = index;
        listContents[index].classList.add("active");
        bigImg.setAttribute("src", images[index].previewImage)
        belowText.textContent = images[active].title;
    })
})

/**
 * Added ArrowUp and ArrowDown Event Listener
 * Remove active class from current active element
 * Apply active class to next element if ArrowDown and previous if ArrowUp
 */
window.addEventListener("keydown", function(e){
    if(e.key === "ArrowDown"){
        listContents[active].classList.remove("active");
        active = (active+1)%images.length;
        
    }else if(e.key === "ArrowUp"){
        listContents[active].classList.remove("active");
        active = active-1;
        if(active == -1)
            active = images.length-1;
    }

    listContents[active].classList.add("active");
    bigImg.setAttribute("src", images[active].previewImage)
    belowText.textContent = images[active].title;
})

// console.log(images[3].title.length)
// }


