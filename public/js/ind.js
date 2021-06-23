const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if(params.pdf){
    document.querySelector('script').setAttribute('src', 'js/index2.js');
}else{
    document.querySelector('script').setAttribute('src', 'js/index.js');
}
console.log(params);