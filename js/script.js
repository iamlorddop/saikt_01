/* -------------------- change day -------------------- */
const today = String((new Date()).getDate()).padStart(2, '0');

const dayStartElements = document.querySelectorAll(".js-text");
dayStartElements.forEach((el) => { el.innerText = `${today}` });

/* -------------------- certificate -------------------- */
function hoverOnBtn(){
  document.getElementById('js-image').classList.add('scale');
}
function hoverOffBtn(){
  document.getElementById('js-image').classList.remove('scale');
}

/* -------------------- slider for blocks -------------------- */
if(window.matchMedia("(max-width: 1414px)").matches){
  let slider = document.querySelector(".blocks__items"),
  sliderList = slider.querySelector(".blocks__slider"),
  sliderTrack = slider.querySelector(".blocks__track"),
  slides = slider.querySelectorAll(".block__item"),
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function () {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  },
  slide = function () {
    if (transition) {
      sliderTrack.style.transition = "transform .5s";
    }
    sliderTrack.style.transform = `translate3d(-${
      slideIndex * slideWidth
    }px, 0px, 0px)`;
  },
  swipeStart = function () {
    let evt = getEvent();

    if (allowSwipe) {
      swipeStartTime = Date.now();

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = "";

      document.addEventListener("touchmove", swipeAction);
      document.addEventListener("mousemove", swipeAction);
      document.addEventListener("touchend", swipeEnd);
      document.addEventListener("mouseup", swipeEnd);

      sliderList.classList.remove("grab");
      sliderList.classList.add("grabbing");
    }
  },
  swipeAction = function () {
    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (
        (posInit > posX1 && transform < nextTrf) ||
        (posInit < posX1 && transform > prevTrf)
      ) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${
        transform - posX2
      }px, 0px, 0px)`;
    }
  },
  swipeEnd = function () {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener("touchmove", swipeAction);
    document.removeEventListener("mousemove", swipeAction);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd);

    sliderList.classList.add("grab");
    sliderList.classList.remove("grabbing");

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (
        Math.abs(posFinal) > posThreshold ||
        swipeEndTime - swipeStartTime < 300
      ) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }
    } else {
      allowSwipe = true;
    }
  },
  setTransform = function (transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function () {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

  sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
  sliderList.classList.add("grab");

  sliderTrack.addEventListener("transitionend", () => (allowSwipe = true));
  slider.addEventListener("touchstart", swipeStart);
  slider.addEventListener("mousedown", swipeStart);
};

/* -------------------- slider for review -------------------- */
let position = 0;
const slidesToShow = 3;
const slidesToScroll = 1;
const container = document.querySelector(".review__row");
const track = document.querySelector(".review__track");
const items = document.querySelectorAll(".review__item");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
items.forEach((item) => {
  item.style.width = `${itemWidth}px`;
});
btnPrev.addEventListener("click", () => {
  position += movePosition;
  setPosition();
});
btnNext.addEventListener("click", () => {
  position -= movePosition;
  setPosition();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

/* -------------------- form -------------------- */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector(".js-form");  
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    
    let error = formValidate(form);

    let formData = new FormData(form);

    if(error === 0){
      let response = await fetch('sendemail.php',{
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        document.querySelector('.training__thanks').style.display = 'flex';
        form.reset();
      } else {
        alert('Ошибка');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('email')){
        if (emailTest(input)){
          formAddError(input);
          error ++;
        }
      } else if(input.classList.contains('phone')) {
        if (phoneTest(input)){
          formAddError(input);
          error ++;
        }
      } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error ++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  }
  // --------------------- Validate -------------------- //
  function emailTest(input) {
    return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
  }
  
  function phoneTest(input) {
    return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
  }
});