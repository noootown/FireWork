'use strict'
function wordManager(){
    this.words=[];
    var pro=wordManager.prototype;
    this.ptr=0;
    this.draw=function(){
        words[ptr].draw();
        
    }
}


wordManager.prototype={
    word:
        function(y,color,str){
            this.size=10;
            this.x=canvasWidth-100;
            this.y=y;
            this.color=color;
            //this.str=str;
            this.draw=function(){
                ctx.font=this.size+"px Verdana";
                ctx.fillStyle=this.color;
                ctx.beginPath();
                ctx.fillText(str,this.x,this.y);
            }

        },
}
