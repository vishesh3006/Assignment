import images from "./images.js"

const list = document.querySelector(".list")
const listContentWithHTML = images.map((image, index) => {
    if(image.title.length <= 31){
        return(
            `<div class="list-content">
                    <img style="width: 45px; height: 45px; object-fit: cover; display: inline-block; border-radius: 5px;" src=${image.previewImage} alt=""></img>
                    <p style="display: inline-block; padding-left: 7px;">${image.title}</p>
            </div>`
        );
    }else{
        return(
            `<div class="list-content">
                    <img style="width: 45px; height: 45px; object-fit: cover; display: inline-block; border-radius: 5px;" src=${image.previewImage} alt=""></img>
                    <p style="display: inline-block; padding-left: 7px;">${image.title.slice(0, 16) + "..." + image.title.slice(image.title.length - 16 + index)}</p>
            </div>`
        )
    }
}).join(" ")
console.log(listContentWithHTML);
list.innerHTML = listContentWithHTML;

const bigImg = document.querySelector("div.image img");
bigImg.setAttribute("src", images[0].previewImage);

const belowText = document.querySelector(".image p")

var active = 0;
const listContents = document.querySelectorAll('.list-content');
console.log(listContents)
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

console.log(images[3].title.length)
