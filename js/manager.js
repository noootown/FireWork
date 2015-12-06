'use strict';
export function FireworkManager(){
    this.firework1s=[];
    this.firework2s=[];
    this.rocketOrNot=true;
    this.saveRecord1=[];
    this.saveRecord2=[];
    this.curPos=new vector(-1000,0);
    this.realStartTime;//開始的時間︳會不斷的累積到endTime
    this.endTime;//統計總時間
    this.time;
    this.$canvas;
    this.ctx;
    this.virtualDOM;
    this.init=function(){
        this.time+=25;
        this.ctx.fillStyle='rgba(0,0,0,0.3)';//會透明
        this.ctx.beginPath();
        this.ctx.fillRect(0,0,this.$canvas.width(),this.$canvas.height());
        this.ctx.fill();
        for(var i=0;i<this.firework1s.length;i++){
            var fire=this.firework1s[i];
            if(fire.update() && fire.rocketOrNot)//如果還要繼續畫的話
                fire.draw();
            else{//移除第一段火箭，並新增第二段煙火
                if(!this.virtualDOM.state.replay){
                    let newFire= new Firework2(fire.endPos.x,fire.endPos.y,fire.type,this.ctx,this.time);
                    newFire.init();
                    this.firework2s.push(newFire);
                    this.saveRecord2.push(newFire);
                }
                this.firework1s.splice(i,1);
                i--;
            }
        }
        for(i=0;i<this.firework2s.length;i++){
            fire=this.firework2s[i];
            if(fire.checkFinish()){
                this.firework2s.splice(i,1);
                i--;
            }
            else{
                fire.update();
                fire.draw();
            }
        }
    };

    this.shoot=function(type){
        if(!this.virtualDOM.state.replay){
            let newFire=new Firework1(this.curPos.x,this.curPos.y,type,this.rocketOrNot,this.ctx, this.time);
            this.saveRecord1.push(newFire);
            this.firework1s.push(newFire); 
        }
    };

    this.switchRocket=function(){this.rocketOrNot=!this.rocketOrNot;};
}

function vector(x,y){
    this.x=x;
    this.y=y;
    this.setVector=function(x,y){
        this.x=x;
        this.y=y;
    };
}

function Firework1(x,y,type,rocketOrNot,ctx,startTime){
    this.type=type;//哪一種煙火
    this.startPos=new vector(x,$(window).height());
    this.endPos=new vector(x,y);
    this.curPos=new vector(this.startPos.x,this.startPos.y);
    this.time=Math.random()*20+20;//在1空中發射的時間
    this.velocity=new vector( (this.endPos.x-this.startPos.x)/this.time , (this.endPos.y-this.startPos.y)/this.time);
    this.color='#FFFFFF';
    this.rocketOrNot=rocketOrNot;//是否有火箭，如果沒有，就隱形
    this.startTime=startTime;
    this.update=function(){
        if(this.curPos.y>this.endPos.y){
            this.curPos.x+=this.velocity.x;
            this.curPos.y+=this.velocity.y;
            return true;
        }
        else
            return false;
    };

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
    };
    this.reset=function(){
        this.curPos=new vector(this.startPos.x,this.startPos.y);
    };
}
function Firework2(x,y,type,ctx,time){
    this.startPos=new vector(x,y);
    this.fireworkPoints=[];
    this.startTime=time;
    this.color=getRandomColor();
    this.init=function(){
        var x=this.startPos.x;
        var y=this.startPos.y;
        var tmpNum;
        if(type==1){//正常
            tmpNum=Math.random()*200+200;
            for(var i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,this.color,Math.random()*2,Math.random()*400+800,0,0.0003,ctx));
        }
        else if(type==2){//同心圓
            tmpNum=360;
            for(i=0;i<6;i++)
                for(var j=0;j<tmpNum/6;j++)
                    this.fireworkPoints.push(new FireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),this.color,Math.random()*2,Math.random()*200+800,0,0.00005,ctx));
        }
        else if(type==3){//圓
            tmpNum=360;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new FireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,this.color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
        }
        else if(type==4){//大煙火
            tmpNum=1800;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new FireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,this.color,Math.random()*2,Math.random()*1000+600,0,0.0003,ctx));
        }
        else if(type==5){//破碎圓
            tmpNum=720;
            for(i=0;i<8;i++)
                for(j=0;j<tmpNum/8;j++)
                    this.fireworkPoints.push(new FireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,this.color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
        }
        else if(type==6){//太陽
            tmpNum=720;
            for(i=0;i<20;i++)
                for(j=0;j<tmpNum/20;j++)
                    this.fireworkPoints.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*i/20 ,this.color,Math.random()*2,Math.random()*200+800,0,0.0003,ctx));
        }
        else if(type==7){//放射狀
            tmpNum=3000;
            for(i=0;i<150;i++){
                var angle=2*Math.PI*Math.random();
                var speedMax=Math.random()*0.15+0.15;
                for(j=0;j<tmpNum/150;j++)
                    this.fireworkPoints.push(new FireworkPoint(x,y,Math.random()*speedMax,angle ,this.color,Math.random()*2,Math.random()*400+600,0,0.00005,ctx));
            }
        }
        else if(type==8){//小炮
            tmpNum=200;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new FireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),this.color,Math.random()*2,Math.random()*100+200,0,0.0003,ctx));
        }
        return this;
    };
    this.checkFinish=function(){//檢查是否
        if(this.fireworkPoints[0] && this.fireworkPoints[0].time>=1600){//1600是直接取一個大的值，比所有煙火的時間都還來的長
            if(type==4){//如果是第4種煙火的話，那就要加上之後的螢火蟲效果
                for(var i=0;i<500;i++){
                    var self=this;
                    setTimeout(function(){
                        ctx.fillStyle='#FFFFFF';
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
    };
    this.update=function(){
        _.each(this.fireworkPoints,function(fire){
            fire.update();
        });
    };
    this.draw=function(){
        _.each(this.fireworkPoints,function(fire){
            fire.draw();
        });
    };
    this.reset=function(){
        _.each(this.fireworkPoints,function(fire){
            fire.time=0;
        });
    };
}
function FireworkPoint(x,y,speed,angle,color,radius,timeMax,delay,acce,ctx){//每一個煙火點
    this.startPos=new vector(x,y);
    this.curPos=new vector(x,y);
    this.speed=speed;
    this.angle=angle;
    this.color=color;
    this.time=0;
    this.delay=delay;
    this.timeMax=timeMax;//顯示時間
    this.radius=radius;
    this.acceler=acce;
    this.update=function(){
        if(this.delay>0)
            this.delay-=10;
        else{
            var speedx=this.speed*Math.cos(this.angle);
            var speedy=this.speed*Math.sin(this.angle);
            this.curPos.x=this.startPos.x+speedx*this.time;
            this.curPos.y=this.startPos.y+speedy*this.time+this.acceler*this.time*this.time;
        }
        this.time+=10;
    };
    this.draw=function(){
        if(this.time>=this.timeMax || this.delay>0)
            return;
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.curPos.x,this.curPos.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.closePath();
    };
}
function getRandomColor(){
    return 'hsl(' + Math.random()*360 + ',100%, 70%)';
}
function getTime(startTime){
    return new Date().getTime()-startTime;
}

export function InputManager(){
    var self=this;
    this.firework;
    this.virtualDOM;
    this.fireworkMap={

        //1~8
        49:1, 
        50:2,
        51:3,
        52:4,
        53:5,
        54:6,
        55:7,
        56:8,

        97:1,
        98:2,
        99:3,
        100:4,
        101:5,
        102:6,
        103:7,
        104:8
    };
    document.addEventListener('keydown', function (event) {
        if(event.which==32)
            event.preventDefault();
        let modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
        if (!modifiers) {
            if (self.fireworkMap[event.which] !== undefined) {
                event.preventDefault();
                self.execFunc('shoot',event.which);
            }
        }
        if(!modifiers && event.which==32)
            self.execFunc('switchRocket',event.which);
        if(!modifiers && event.which==80)
            self.execFunc('stopRecord',event.which);
    });
    this.execFunc = function(event,data){
        var callbacks = InputManager.keyDownFunction[event];
        callbacks.call(this,data);
    };
}

InputManager.keyDownFunction={
    checkInputOrNot:
        function(){
            let returnValue=false;
            $('.word-input').each(function(){
                if($(this).is(':focus')){
                    returnValue=true;
                    return false;
                }
            });
            return returnValue;
        },
    getWhichInput:
        function(){
            let returnInput;
            $('.word-input').each(function(){
                if($(this).is(':focus')){
                    returnInput=this;
                    return false;
                }
            });
            return returnInput;
        },
    inputCharacter:
        function(key,input){
            var nowValue = $(input).val();
            $(input).val(nowValue+String.fromCharCode((96 <= key && key <= 105) ? key-48 : key));

            var event = new Event('input', { bubbles: true });//trigger onChange event
            input.dispatchEvent(event);
        },
    shoot:
        function(key){
            if(this.firework!==undefined){
                if(InputManager.keyDownFunction.checkInputOrNot())
                    InputManager.keyDownFunction['inputCharacter'](key,InputManager.keyDownFunction.getWhichInput());
                else if(!this.virtualDOM.state.modal)
                    this.firework.shoot(this.fireworkMap[key]);
            }
        },
    switchRocket:
        function(key){
            if(this.firework!==undefined){
                if(InputManager.keyDownFunction.checkInputOrNot())
                    InputManager.keyDownFunction['inputCharacter'](key,InputManager.keyDownFunction.getWhichInput());
                else if(!this.virtualDOM.state.modal)
                    this.firework.switchRocket();
            }
        },
    stopRecord:
        function(){
            if(InputManager.keyDownFunction.checkInputOrNot())
                InputManager.keyDownFunction['inputCharacter'](key);
            else if(!this.virtualDOM.state.modal && !this.virtualDOM.state.replay){
                if(this.virtualDOM.state.pressRecord){
                    this.virtualDOM.state.modal=true;
                    $('.modal').addClass('active');
                    $('.dialogSave').addClass('active');
                    this.firework.endTime+=getTime(this.firework.realStartTime);
                    this.virtualDOM.state.fireworkRecord.endTime=this.firework.endTime;
                    if(!this.virtualDOM.state.goOver){
                        $('#dialogSaveContinueBtn').addClass('hide');
                        $('#dialogSaveSaveBtn').addClass('hide');
                        $('#dialogSaveReplayBtn').addClass('hide');
                    }

                }
                else{
                    if(!$('#word-input').is(':focus') && !this.modal){
                        $('.sideBarBtn').toggleClass('active');
                        $('.sidePanel').toggleClass('active');
                        $('.navbar').toggleClass('active');
                    }
                }
            }
        }
};

export function WordManager(ctx){
    var FADEOUTTIME=2000;
    var FADEINTIME=2000;

    this.ctx=ctx;
    this.words=[];
    this.ptr=0;
    this.opacity=0;
    this.timeCounter=0;
    this.size=40;
    this.x=$(window).width()/2;
    this.y=$(window).height()*0.9;
    this.color;
    this.$canvas;
    this.init=function(){
        if(!this.checkfinish() ){
            this.update();
            this.draw();
        }
    };

    this.draw=function(){
        //console.log(this.ptr);
        this.color = 'rgba(255,255,255,' + this.opacity + ')';
                this.ctx.font='200 '+this.size+'px Verdana';
                this.ctx.fillStyle=this.color;
                this.ctx.textAlign='center';
                this.ctx.beginPath();
                this.ctx.fillText(this.words[this.ptr],this.x,this.y);
                };

                this.update=function(){
                    this.timeCounter+=25;
                    if(this.timeCounter<=500)
                        this.opacity+=0.05;
                    else if(this.timeCounter>=FADEINTIME && this.timeCounter<FADEINTIME+500)
                        this.opacity-=0.05;
                    else if(this.timeCounter===FADEINTIME+FADEOUTTIME){
                        //this.ptr=(this.ptr+1)%this.words.length;
                        this.ptr=this.ptr+1;
                        this.timeCounter=0;
                    }
                };
                this.checkfinish=function(){
                    if(this.ptr==this.words.length)
                        return true;
                    else 
                        return false;
                };
}


