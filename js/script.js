let btnMetrika = document.getElementsByClassName('f-btn')
for(let i=0; i<btnMetrika.lenght; i++){
 btnMetrika[i].addEventListner('click',() => {
       
       console.log('GOAL');
   })
 }
	
/* -------------------- popup -------------------- */
const headerNone = document.querySelector('.header');

$(document).mouseleave(function(e){
  if (e.clientY < 10) {
      $(".exitblock").fadeIn("fast");
  }    
});
$(document).click(function(e) {
  if (($(".exitblock").is(':visible')) && (!$(e.target).closest(".exitblock .modaltext").length)) {
      $(".exitblock").remove();
  }
});

/* -------------------- cookie -------------------- */
let cookie = document.querySelector('.cookie');
document.querySelector('.sub').addEventListener( "click" , () => {
  cookie.classList.add('is-show');
});
document.querySelector('.res').addEventListener( "click" , () => {
  cookie.classList.add('is-show');
});
document.querySelector('.cookie-link').addEventListener( "click" , () => {
  cookie.classList.toggle('is-show');
});

/* -------------------- certificate -------------------- */
function hoverOnBtn(){
  document.getElementById('js-image').classList.add('scale');
}
function hoverOffBtn(){
  document.getElementById('js-image').classList.remove('scale');
}

/* ---------------- slider for video -------------------- */
let positionV = 0;
const slidesToShowV = 1;
const slidesToScrollV = 1;
const containerV = document.querySelector(".slider");
const trackV = document.querySelector(".slider__track");
const itemsV = document.querySelectorAll(".slide");
const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");
const itemsCountV = itemsV.length;
const itemWidthV = containerV.clientWidth / slidesToShowV;
const movePositionV = slidesToScrollV * itemWidthV;
const maxPositionV = itemsCountV;

itemsV.forEach((item) => {
  item.style.minWidth = `${itemWidthV}px`;
});