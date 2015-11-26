'use strict';

var $canvas=$('.mainCanvas');
var ctx;
//var canvasHeight;
//var canvasWidth;
var fireworkAll;
var wordAll;
var sideBarOpen;
var startAction;
var myInputManager;
var recordTime;
$(document).ready(function(){
    $('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    //$canvas=$('.mainCanvas');
    //$canvas.attr({
        //height:$(window).height(),
        //width:$(window).width()
    //});
    //canvasHeight=$canvas.height();
    //canvasWidth=$canvas.width();
    ctx=$canvas.get(0).getContext('2d');
    fireworkAll=new fireworkManager();
    fireworkAll.init();
    myInputManager=new inputManager(fireworkAll);

    wordAll=new wordManager();
    sideBarOpen=true;
    startAction=false;
    setInterval(function(){
        if(!startAction)
            $('.startActionInstruction').children().removeClass('active');
        else
            $('.startActionInstruction').children().toggleClass('active');
    },800);
});


function clearScreen(){
    sideBarOpen=!sideBarOpen;
    $('.sideBarBtn').toggleClass('active');
    $('.sidePanel').toggleClass('active');
    $('.navbar').toggleClass('active');
}


