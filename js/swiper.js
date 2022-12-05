const swiper = new Swiper('.swiper', {
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
 
	pagination: {
	  el: '.swiper-pagination',
	},
 
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
 
	scrollbar: {
	  el: '.swiper-scrollbar',
	},
});