var mySwiper1 = new Swiper ('.swiper-container1', {
    loop: true,
    autoplay:3000,
    effect : 'cube'
});
var timer1=window.setTimeout(function () {
    window.clearTimeout(timer1);
    var mySwiper2 = new Swiper ('.swiper-container2', {
        loop: true,
        autoplay:3000,
        effect : 'cube'
    });
    var timer2=window.setTimeout(function () {
        window.clearInterval(timer2);
        var mySwiper3 = new Swiper ('.swiper-container3', {
            loop: true,
            autoplay:3000,
            effect : 'cube',
            pagination: '.swiper-pagination',
            paginationClickable :false,
            autoplayDisableOnInteraction : false
        })
    },100);
},50);


