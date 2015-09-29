var $canvas=$('.mainCanvas');
var ctx;
var canvasHeight;
var canvasWidth;
var fireworkAll;
$(document).ready(function(){
    $('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    $canvas=$('.mainCanvas');
    $canvas.attr({
        height:$(window).height(),
        width:$(window).width()
    });
    canvasHeight=$canvas.height();
    canvasWidth=$canvas.width();
    ctx=$canvas.get(0).getContext('2d');
    fireworkAll=new fireworkManager(new InputManager());
    fireworkAll.init();
});
