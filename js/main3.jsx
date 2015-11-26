'use strict';
import React, {Component}  from 'react';
import SideBar from './sidebar';
class Main extends React.Component{
    constructor(){
        super();
        Main.defaultProps.myInputManager.firework=Main.defaultProps.fireworkAll;
    }
    render(){
        return(
                <div className={'main'}>
                <MainCanvas/>
                <Navbar/>
                <Timer/>
                <SideBar/>
                <ShowWord/>
                <StartActionInstruction/>
                <StartActionInstructionWords/>
                </div>
              );
    }
}
Main.defaultProps={
    fireworkAll:new fireworkManager(),
    myInputManager:new InputManager()
};

class MainCanvas extends Component{
    render(){
        return(
                <canvas id={'mainCanvas'} height={$(window).height()} width={$(window).width()}></canvas>
              );
    }
}

class Timer extends Component{
    render(){
        return(
                <div className={'timer'}>
                <h1 className={'time-second time-second0'}>GO</h1>
                <h1 className={'time-second time-second1'}>1</h1>
                <h1 className={'time-second time-second2'}>2</h1>
                <h1 className={'time-second time-second3'}>3</h1>
                </div>
              );
    }
}

class ShowWord extends Component{
    render(){
        return(
                <h1 className={'showWord'}>123123123</h1>
              );
    }
}

class StartActionInstructionWords extends Component{
    render(){
        return(
                <h3 className={'startActionInstructionWords'}>按P 停止/選單</h3>
              );
    }
}

class StartActionInstruction extends Component{
    render(){
        return(
                <div className={'startActionInstruction'}>
                <img src="img/rec.png" className={'img-rec'}></img>
                </div>
              );
    }
}

class Navbar extends Component{
    render(){
        return(
                <div className={'navbar'}>
                <div className={'title'}>
                <a href="https://github.com/i314i/RippleDot">Firework</a>
                </div>
                <div className={'link'}>
                <a href="https://noootown.wordpress.com/">Blog</a>
                <a href="https://github.com/i314i">Github</a>
                </div>
                </div>
              );
    }
}

export default Main;


function fireworkManager(){
    this.firework1s=[];
    this.firework2s=[];
    this.rocketOrNot=true;
    this.curPos=new vector(-1000,0);
    this.type=1;
    var self=this;
    this.init=function(){
        $canvas.on('mousemove',function(e){
            self.curPos.setVector(e.pageX,e.pageY);
        });
        setInterval(function(){
            ctx.fillStyle='rgba(0,0,0,0.3)';//會透明
            ctx.beginPath();
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
            ctx.fill();
            for(var i=0;i<self.firework1s.length;i++){
                var fire=self.firework1s[i];
                if(fire.update() && fire.rocketOrNot)//如果還要繼續畫的話
                    fire.draw();
                else{//移除第一段火箭，並新增第二段煙火
                    self.firework2s.push( (new firework2(fire.endPos.x,fire.endPos.y,fire.type)).init() );
                    self.firework1s.splice(i,1);
                    i--;
                }
            }
            for(i=0;i<self.firework2s.length;i++){
                fire=self.firework2s[i];
                if(fire.checkFinish()){
                    self.firework2s.splice(i,1);
                    i--;
                }
                else{
                    fire.update();
                    fire.draw();
                }
            }
        },30);
    };
}

fireworkManager.prototype={
    shoot:function(type){
        this.firework1s.push(firework1(this.curPos.x,this.curPos.y,type,this.rocketOrNot)); 
    },
    switchRocket:function(){this.rocketOrNot=!this.rocketOrNot;}
};

function vector(x,y){
    this.x=x;
    this.y=y;
    this.setVector=function(x,y){
        this.x=x;
        this.y=y;
    };
}

function firework1(x,y,type,rocketOrNot){
    this.type=type;//哪一種煙火
    this.startPos=new vector(x,canvasHeight);
    this.endPos=new vector(x,y);
    this.curPos=new vector(this.startPos.x,this.startPos.y);
    this.time=Math.random()*20+20;//在空中發射的時間
    this.velocity=new vector( (this.endPos.x-this.startPos.x)/this.time , (this.endPos.y-this.startPos.y)/this.time);
    this.color='#FFFFFF';
    this.rocketOrNot=rocketOrNot;//是否有火箭，如果沒有，就隱形
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
}
function firework2(x,y,type){
    this.startPos=new vector(x,y);
    this.fireworkPoints=[];
    this.init=function(){
        var x=this.startPos.x;
        var y=this.startPos.y;
        var tmpColor=getRandomColor();
        var tmpNum;
        if(type==1){//正常
            tmpNum=Math.random()*200+200;
            for(var i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor,Math.random()*2,Math.random()*400+800,0));
        }
        else if(type==2){//同心圓
            tmpNum=360;
            for(i=0;i<6;i++)
                for(var j=0;j<tmpNum/6;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,i/24+Math.random()*0.02,2*Math.PI*j/(tmpNum/6),tmpColor,Math.random()*2,Math.random()*200+800,0,0.00005));
        }
        else if(type==3){//圓
            tmpNum=360;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new fireworkPoint(x,y,0.5,2*Math.PI*i/tmpNum,tmpColor,Math.random()*2,Math.random()*200+800,0));
        }
        else if(type==4){//大煙火
            tmpNum=1800;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.5,Math.random()*2*Math.PI,tmpColor,Math.random()*2,Math.random()*1000+600,0));
        }
        else if(type==5){//破碎圓
            tmpNum=720;
            for(i=0;i<8;i++)
                for(j=0;j<tmpNum/8;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,0.5,2*Math.PI* (i/8+(Math.random()*15+15)/360) ,tmpColor,Math.random()*2,Math.random()*200+800,0));
        }
        else if(type==6){//太陽
            tmpNum=720;
            for(i=0;i<20;i++)
                for(j=0;j<tmpNum/20;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.3,2*Math.PI*i/20 ,tmpColor,Math.random()*2,Math.random()*200+800,0));
        }
        else if(type==7){//放射狀
            tmpNum=3000;
            for(i=0;i<150;i++){
                var angle=2*Math.PI*Math.random();
                var speedMax=Math.random()*0.15+0.15;
                for(j=0;j<tmpNum/150;j++)
                    this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*speedMax,angle ,tmpColor,Math.random()*2,Math.random()*400+600,0,0.00005));
            }
        }
        else if(type==8){//小炮
            tmpNum=200;
            for(i=0;i<tmpNum;i++)
                this.fireworkPoints.push(new fireworkPoint(x,y,Math.random()*0.3,2*Math.PI*Math.random(),tmpColor,Math.random()*2,Math.random()*100+200,0));
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
}
function fireworkPoint(x,y,speed,angle,color,radius,timeMax,delay,acce){//每一個煙火點
    this.startPos=new vector(x,y);
    this.curPos=new vector(x,y);
    this.speed=speed;
    this.angle=angle;
    this.color=color;
    this.time=0;
    this.delay=delay;
    this.timeMax=timeMax;//顯示時間
    this.radius=radius;
    this.acceler=acce || 0.0003;
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

function InputManager(){
    var self=this;
    this.firework;
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
        callbacks(data);
    };
}

InputManager.keyDownFunction={
    inputCharacter:
        function(key){
            var wordInput = $('#word-input');
            var nowValue = wordInput.val();
            wordInput.val(nowValue+String.fromCharCode((96 <= key && key <= 105) ? key-48 : key));

            var event = new Event('input', { bubbles: true });//trigger onChange event
            document.getElementById('word-input').dispatchEvent(event);
        },
    shoot:
        function(key){
            if(self.firework!==undefined){
                if($('#word-input').is(':focus'))
                    self.keyDownFunction['inputCharacter'](key);
                else
                    self.firework.shoot(self.fireworkMap[key]);
            }
        },
    switchRocket:
        function(key){
            if(self.firework!==undefined){
                if($('#word-input').is(':focus'))
                    self.keyDownFunction['inputCharacter'](key);
                else    
                    self.firework.switchRocket();
            }
        },
    stopRecord:
        function(){
            if(!$('#word-input').is(':focus')){
                clearScreen();
                if(startAction)startAction=false;
            }
        }
};
