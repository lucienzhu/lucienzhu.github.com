$(document).ready(function(){
    $('.slideshow-wrapper').slick({
        autoplay: true,
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        draggable: true,
        variableWidth: true
    });
});