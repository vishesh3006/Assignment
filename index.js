import images from "./images.js"

const list = document.querySelector(".list")
const listContentWithHTML = images.map(image => {
    return(
        `<div class="list-content ${image.title.split('/\W/')[0]}">
                <img style="width: 45px; height: 45px; object-fit: cover; display: inline-block; border-radius: 5px;" src=${image.previewImage} alt=""></img>
                <p style="display: inline-block; padding-left: 7px;">${image.title}</p>
        </div>`
    )
}).join(" ")
console.log(listContentWithHTML);
list.innerHTML = listContentWithHTML;

const bigImg = document.querySelector("div.image img");
bigImg.setAttribute("src", images[0].previewImage);

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
    })
})

window.addEventListener("keydown", function(e){
    if(e.key === "ArrowDown"){
        listContents[active].classList.remove("active");
        active = (active+1)%images.length;
        listContents[active].classList.add("active");
        bigImg.setAttribute("src", images[active].previewImage)
    }else if(e.key === "ArrowUp"){
        listContents[active].classList.remove("active");
        active = active-1;
        if(active == -1)
            active = images.length-1;
        listContents[active].classList.add("active");
        bigImg.setAttribute("src", images[active].previewImage)
    }
})
