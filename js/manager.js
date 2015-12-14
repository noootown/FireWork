'use strict';
import {getFireworkPoints} from './fireworkpoints';

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
    this.alphabetBuffer=[];
    this.init=function(){
        this.time+=25;
        this.ctx.fillStyle='rgba(0,0,0,0.3)';//會透明
        this.ctx.beginPath();
        this.ctx.fillRect(0,0,this.$canvas.width(),this.$canvas.height());
        this.ctx.fill();

        for(let i=0;i<this.alphabetBuffer.length;i++){
            this.alphabetBuffer[i].startTime=this.time;
            this.firework1s.push(this.alphabetBuffer[i]);
            this.saveRecord1.push(this.alphabetBuffer[i]);
        }
        this.alphabetBuffer=[];
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

    this.shoot=function(type,ascii,fireworktype){//0 don't buffer
        if(!this.virtualDOM.state.replay){
            if(!this.virtualDOM.state.pauseRecord){
                let newFire=new Firework1(this.curPos.x,this.curPos.y,type,this.rocketOrNot,this.ctx, this.time);
                this.saveRecord1.push(newFire);
                this.firework1s.push(newFire); 
            }
            else{
                this.alphabetBuffer.push(new Firework1(this.curPos.x,this.curPos.y,type,this.rocketOrNot,this.ctx, this.time));
                this.ctx.font='200 40px Verdana';
                if(fireworktype===0)
                    this.ctx.fillStyle='rgba(255,255,255,0.8)';
                else
                    this.ctx.fillStyle='rgba(255,0,0,0.8)';
                this.ctx.textAlign='center';
                this.ctx.beginPath();
                this.ctx.fillText(String.fromCharCode(ascii),this.curPos.x,this.curPos.y);
            }
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
        this.fireworkPoints=getFireworkPoints(this.startPos.x,this.startPos.y,this.color,type,ctx);
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
export function FireworkPoint(x,y,speed,angle,color,radius,timeMax,delay,acce,ctx){//每一個煙火點
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
    this.fireworkMap={//keycode to ascii code
        //0~9
        48:[0,48], //keycode:[type,ascii code]
        49:[1,49], 
        50:[2,50],
        51:[3,51],
        52:[4,52],
        53:[5,53],
        54:[6,54],
        55:[7,55],
        56:[8,56],
        57:[9,57],
        
        96:[0,48],
        97:[1,49],
        98:[2,50],
        99:[3,51],
        100:[4,52],
        101:[5,53],
        102:[6,54],
        103:[7,55],
        104:[8,56],
        105:[9,57]
    };
    this.alphabetMap={
        48:[48,48],
        49:[49,49], //keycode:[type,ascii code]
        50:[50,50],
        51:[51,51],
        52:[52,52],
        53:[53,53],
        54:[54,54],
        55:[55,55],
        56:[56,56],
        57:[57,57],
        
        96:[48,48],
        97:[49,49],
        98:[50,50],
        99:[51,51],
        100:[52,52],
        101:[53,53],
        102:[54,54],
        103:[55,55],
        104:[56,56],
        105:[57,57],

        65:[97,97],
        66:[98,98],
        67:[99,99],
        68:[100,100],
        69:[101,101],
        70:[102,102],
        71:[103,103],
        72:[104,104],
        73:[105,105],
        74:[106,106],
        75:[107,107],
        76:[108,108],
        77:[109,109],
        78:[110,110],
        79:[111,111],
        80:[112,112],
        81:[113,113],
        82:[114,114],
        83:[115,115],
        84:[116,116],
        85:[117,117],
        86:[118,118],
        87:[119,119],
        88:[120,120],
        89:[121,121],
        90:[122,122]
    };
    document.addEventListener('keydown', function (event) {
        if(event.which==32 || event.which==115)
            event.preventDefault();
        let modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
        if (!modifiers) {
            if (self.fireworkMap[event.which] !== undefined || self.alphabetMap[event.which] !== undefined) {
                event.preventDefault();
                self.execFunc('shoot',event.which);
            }
        }
        if(!modifiers && event.which==188)//,<
            self.execFunc('switchRocket',event.which);
        if(!modifiers && event.which==191)// /
            self.execFunc('flushWord',event.which);
        if(!modifiers && event.which==113)//F2
            self.execFunc('pauseRecord',event.which);
        if(!modifiers && event.which==115)//F4
            self.execFunc('stopRecord',event.which);
        if(!modifiers && event.which==32)//space
            self.execFunc('switchInsert',event.which);
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
            if(key==188 || key==191)
                $(input).val(nowValue);
            else if(key==32)
                $(input).val(nowValue+' ');
            else
                $(input).val(nowValue+String.fromCharCode((96 <= key && key <= 105) ? key-48 : key));

            var event = new Event('input', { bubbles: true });//trigger onChange event
            input.dispatchEvent(event);
        },
    shoot:
        function(key){
            if(this.firework!==undefined){
                if(InputManager.keyDownFunction.checkInputOrNot())
                    InputManager.keyDownFunction['inputCharacter'](key,InputManager.keyDownFunction.getWhichInput());
                else if(this.virtualDOM.state.pauseRecord || !this.virtualDOM.state.modal){
                    if(!this.virtualDOM.state.alphabet && this.fireworkMap[key]!==undefined)
                        this.firework.shoot(this.fireworkMap[key][0],this.fireworkMap[key][1],0);
                    else if(this.virtualDOM.state.alphabet && this.alphabetMap[key]!==undefined)
                        this.firework.shoot(this.alphabetMap[key][0],this.alphabetMap[key][1],1);
                }
            }
        },
    switchRocket:
        function(key){
            if(this.firework!==undefined){
                if(InputManager.keyDownFunction.checkInputOrNot())
                    InputManager.keyDownFunction['inputCharacter'](key,InputManager.keyDownFunction.getWhichInput());
                else if(this.virtualDOM.state.pauseRecord || !this.virtualDOM.state.modal){
                    this.firework.switchRocket();
                    this.virtualDOM.state.rocket=this.virtualDOM.state.rocket;
                    this.virtualDOM.refs.settingWord.toggleRocket();
                }
            }
        },
    stopRecord:
        function(){
            if(!this.virtualDOM.state.modal && !this.virtualDOM.state.replay){
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
        },
    pauseRecord:
        function(){
            if(this.virtualDOM.state.startAction){
                if(!this.virtualDOM.state.pauseRecord){
                    this.firework.endTime+=getTime(this.firework.realStartTime);
                    this.virtualDOM.state.fireworkRecord.endTime=this.firework.endTime;
                    this.virtualDOM.state.pauseRecord=true;
                    this.virtualDOM.state.modal=true;
                    this.virtualDOM.refs.settingWord.togglePause();
                    this.virtualDOM.refs.startActionInstruction.pause();
                }
                else{
                    this.firework.realStartTime=new Date().getTime();
                    this.virtualDOM.state.pauseRecord=false;
                    this.virtualDOM.state.modal=false;
                    this.virtualDOM.refs.settingWord.togglePause();
                    this.virtualDOM.refs.startActionInstruction.cancelPause();
                }
            }
        },
    switchInsert:
        function(key){
            if(InputManager.keyDownFunction.checkInputOrNot())
                InputManager.keyDownFunction['inputCharacter'](key,InputManager.keyDownFunction.getWhichInput());
            else if(this.virtualDOM.state.pauseRecord || !this.virtualDOM.state.modal){
                this.virtualDOM.state.alphabet=!this.virtualDOM.state.alphabet;
                this.virtualDOM.refs.settingWord.toggleAlphabet();
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
