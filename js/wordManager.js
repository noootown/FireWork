'use strict';
function wordManager(){
    var FADEOUTTIME=2000;
    var FADEINTIME=2000;
    this.words=[];
    //var pro=wordManager.prototype;
    this.ptr=0;
    this.draw=function(){
        this.ptr=0;
        var self=this;
        var drawWord= function(){
            if(self.ptr===self.words.length)
                return;
            else{
                $('.showWord').html(self.words[self.ptr]).addClass('active');
                self.ptr++;
                setTimeout(removeWord,FADEOUTTIME);
            }
        };
        var removeWord=function(){
            $('.showWord').removeClass('active');
            setTimeout(drawWord,FADEINTIME);
        };
        drawWord();
    };
}

