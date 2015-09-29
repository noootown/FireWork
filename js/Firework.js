var $canvas=$('.mainCanvas');
var ctx;
var canvasHeight;
var canvasWidth;
var firework1s=[];
var firework2s=[];
var acceler=new vector(0,0.0003);
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
    bindEvents();
    times=0;
    setInterval(function(){
        times++;
        ctx.fillStyle="rgba(0,0,0,0.3)";
        ctx.beginPath();
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.fill();
        for(var i=0;i<firework1s.length;i++){
            var fire=firework1s[i];
            if(fire.update())
        fire.draw();
            else{
                var num=Math.floor(Math.random()*8)+1;
                console.log(num);
                var tmpFirework2=new firework2(fire.endPos.x,fire.endPos.y,num);
                tmpFirework2.init();
                firework2s.push(tmpFirework2);
                firework1s.splice(i,1);
                i--;
            }
        }
        for(var i=0;i<firework2s.length;i++){
            var fire=firework2s[i];
            if(fire.checkFinish()){
                firework2s.splice(i,1);
                i--;
            }
            else{
                fire.update();
                fire.draw();
            }
        }
    },30);
});
function vector(x,y){
    this.x=x;
    this.y=y;
    this.setVector=function(x,y){
        this.x=x;
        this.y=y;
    }
}
function firework1(x,y){
    this.startPos=new vector(x,canvasHeight);
    this.endPos=new vector(x,y);
    this.curPos=new vector(this.startPos.x,this.startPos.y);
    this.time=Math.random()*20+20;
    this.velocity=new vector( (this.endPos.x-this.startPos.x)/this.time , (this.endPos.y-this.startPos.y)/this.time);
    this.color="#FFFFFF";
    this.update=function(){
        if(this.curPos.y>this.endPos.y){
            this.curPos.x+=this.velocity.x;
            this.curPos.y+=this.velocity.y;
            return true;
        }
        else
            return false;
    }

    this.draw=function(){
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.curPos.x,this.curPos.y);
        ctx.lineTo(this.curPos.x-0.8*this.velocity.x,this.curPos.y-0.8*this.velocity.y);
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.strokeStyle = '#FFE0A4';
        ctx.moveTo(this.curPos.x-0.8*this.velocity.x,this.curPos.y-0.8*this.velocity.y);
        ctx.lineTo(this.curPos.x-2*this.velocity.x,this.curPos.y-2*this.velocity.y);
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 1;
        for(var i=0;i<5;i++){
            ctx.beginPath();
            ctx.strokeStyle = '#CE7A38';
            ctx.moveTo(this.curPos.x-(2+0.4*i)*this.velocity.x,this.curPos.y-(2+0.4*i)*this.velocity.y);
            ctx.lineTo(this.curPos.x-(2.2+0.4*i)*this.velocity.x,this.curPos.y-(2.2+0.4*i)*this.velocity.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
function firework2(x,y,type){
    this.startPos=new vector(x,y);
    this.fireworkPoints=[];
    this.type=type;
    this.init=function(){
        var x=this.startPos.x;
        var y=this.startPos.y;
        var tmpColor=getRandomColor();
        var tmpNum;

        if(this.type==1){//正常
            tmpNum=Math.random()*200+200;
            for(var i=0;i<tmpNum;i++){
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.2,Math.random()*2*Math.PI,tmpColor,Math.random()*2,Math.random()*400+800,0));
            }
        }
        else if(this.type==2){//同心圓
            tmpNum=360;
            for(var i=0;i<6;i++){
                for(var j=0;j<tmpNum/6;j++){
                    this.fireworkPoints.push(new fireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),tmpColor,Math.random()*2,Math.random()*200+800,0));
                }
            }
        }
        else if(this.type==3){//圓
            tmpNum=360;
            for(var i=0;i<tmpNum;i++){
                this.fireworkPoints.push(new fireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,tmpColor,Math.random()*2,Math.random()*200+800,0));
            }
        }
        else if(this.type==4){//大煙火
            tmpNum=3000;
            for(var i=0;i<tmpNum;i++){
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor,Math.random()*2,Math.random()*1000+600,0));
            }
        }
        else if(this.type==5){//破碎圓
            tmpNum=1800;
            for(var i=0;i<8;i++){
                for(var j=0;j<tmpNum/8;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,tmpColor,Math.random()*2,Math.random()*200+800,0));
            }
        }
        else if(this.type==6){//太陽
            tmpNum=1200;
            for(var i=0;i<20;i++){
                for(var j=0;j<tmpNum/20;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.3,2*Math.PI*i/20 ,tmpColor,Math.random()*2,Math.random()*200+800,0));
            }
        }
        else if(this.type==7){//放射狀
            tmpNum=6000;
            for(var i=0;i<150;i++){
                    var angle=2*Math.PI*Math.random();
                    var speedMax=Math.random()*0.15+0.25;
                for(var j=0;j<tmpNum/150;j++){
                    this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*speedMax,angle ,tmpColor,1.5,Math.random()*1000+600,0));
                }
            }
        }
        else if(this.type==8){//小炮
            tmpNum=200;
            for(var i=0;i<200;i++){
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),tmpColor,Math.random()*2,Math.random()*100+200,0));
            }
        }
        
    }
    this.checkFinish=function(){
        if(this.fireworkPoints[0] && this.fireworkPoints[0].time>=1600){
            if(this.type==4){
            for(var i=0;i<500;i++){
                var self=this;
                setTimeout(function(){
                    ctx.fillStyle="#FFFFFF";
                    ctx.beginPath();
                    ctx.arc(self.startPos.x-500+Math.random()*1000,self.startPos.y+Math.random()*600,Math.random()*2,0,Math.PI*2,true);
                    ctx.fill();
                    ctx.closePath();},Math.random()*700+500);
            }

            }
            return true;
        }
        else
            return false;
    }
    this.update=function(){
        _.each(this.fireworkPoints,function(fire){
            fire.update();
        });
    }
    this.draw=function(){
        _.each(this.fireworkPoints,function(fire){
            fire.draw();
        });
    }
}
function fireworkPoint(x,y,speed,angle,color,radius,timeMax,delay){
    this.startPos=new vector(x,y);
    this.curPos=new vector(x,y);
    this.speed=speed;
    this.angle=angle;
    this.color=color;
    this.time=0;
    this.delay=delay;
    this.timeMax=timeMax;
    this.radius=radius;
    this.update=function(){
        if(this.delay>0)
            this.delay-=10;
        else{
            var speedx=this.speed*Math.cos(this.angle);
            var speedy=this.speed*Math.sin(this.angle);
            this.curPos.x=this.startPos.x+speedx*this.time;
            this.curPos.y=this.startPos.y+speedy*this.time+acceler.y*this.time*this.time;
        }
        this.time+=10;
    }
    this.draw=function(){
        if(this.time>=this.timeMax || this.delay>0)
            return;
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.curPos.x,this.curPos.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.closePath();
    }
}
function bindEvents(){
    $canvas.on('click',function(e){
        firework1s.push(new firework1(e.pageX,e.pageY));
    });
    $canvas.on('touchdown',function(e){
        firework1s.push(new firework1(e.pageX,e.pageY));
    });
}
function getRandomColor(){
    return 'hsl(' + Math.random()*360 + ',100%, 70%)';
}
