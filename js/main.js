'use strict';

var $canvas=$('.mainCanvas');
var ctx;
var canvasHeight;
var canvasWidth;
var fireworkAll;
var wordAll;
var sideBarOpen;
var myInputManager;
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
    fireworkAll=new fireworkManager();
    fireworkAll.init();
    myInputManager=new inputManager(fireworkAll);
    myInputManager.on('shoot',myInputManager.manageInput('shoot'));
    myInputManager.on('switchRocket',myInputManager.manageInput('switchRocket'));

    wordAll=new wordManager();
    wordAll.draw();
});




