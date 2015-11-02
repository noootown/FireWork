function wordManager(){
    this.words=[];
    var pro=wordManager.prototype;
    this.addWord=function(str){
        this.words.push(new pro.word(100,"#FFFFFF",str));
    }
    this.draw=function(){
        _.each(this.words,function(fire){
            fire.draw();
        });
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
