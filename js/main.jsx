'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';
import SideBar from './sidebar';
import {SaveDialog,LoadDialog,UploadDialog,ReplayDialog} from './dialog';
import {FireworkManager,InputManager,WordManager} from './manager';

window.requestAnimFrame = (function(){ 
    return window.requestAnimationFrame || //Chromium
        window.webkitRequestAnimationFrame || //Webkit
        window.mozRequestAnimationFrame || //Mozilla
        window.oRequestAnimationFrame || //Opera
        window.msRequestAnimationFrame || //IE
        function(callback){ 
            window.setTimeout(callback, 1000 / 60); 
        }; 
})(); 
window.fps=30;

class Main extends React.Component{
    constructor(){
        super();
        this.state={
            sidebarOpen:true,//在一般畫面下切換P
            recordId:null,
            recordId2:null,
            startAction:false, //after Go disappear
            pressRecord:false, //press make，開始做這個動作,true代表整個工作階段
            pauseRecord:false, //暫停，可以編排煙火
            goOver:false,   //Go 結束播映，到startAction這一段時間是開始的延遲
            flashRecId:null,
            modal:false,
            fireworkRecord:{//暫存的紀錄
                saveRecord1:[],
                saveRecord2:[],
                endTime:0
            },
            fireworkSaveRecord:{//已儲存的紀錄
                saveRecord1:[],
                saveRecord2:[],
                endTime:0,
                saveTime:null
            },
            replay:false,
            alphabet:false,//true 英數模式 false 一般模式
            rocket:false,
            flag:0
        };
    }
    setupInputManager(fireworkManager){
        Main.defaultProps.myInputManager.firework=fireworkManager;
        Main.defaultProps.myInputManager.firework.virtualDOM=this;
        Main.defaultProps.myInputManager.virtualDOM=this;
        Main.defaultProps.wordAll.$canvas=$('#mainCanvas');
        Main.defaultProps.wordAll.ctx=fireworkManager.ctx;
        this.drawAnim();
    }
    drawAnim(){//畫動畫
        if(this.state.flag===(60/window.fps-1)){//因為requestAnimFrame預設的fps是60，所以設一個flag來控制他的fps
            if(!this.state.startAction){
                Main.defaultProps.wordAll.ptr=0;
                Main.defaultProps.wordAll.timeCounter=0;
                Main.defaultProps.wordAll.opacity=0;
            }
            if(!this.state.modal){//for continue
                Main.defaultProps.myInputManager.firework.init();
            }
            if(this.state.startAction && !this.state.modal ){//for continue
                Main.defaultProps.wordAll.init();
            }
            this.state.flag=0;
        }
        else
            this.state.flag++;
        window.requestAnimFrame(this.drawAnim.bind(this));
    }
    sidebarMakeClick(words){
        if(this.state.pauseRecord===true){
            this.state.pauseRecord=false;
            this.state.modal=false;
            this.refs.settingWord.togglePause();
        }
        this.toggleSidebar();
        Main.defaultProps.wordAll.words=words;
        this.startRecord();
    }
    sidebarLoadClick(){
        this.toggleSidebar();
        this.refs.settingWord.hide();
        $('.dialogLoad').addClass('active');
        if(this.state.fireworkSaveRecord.saveTime!==null){//有save資料的話
            $('.dialogLoadNoFile').removeClass('dialogLoadNoFile');
            $('.dialogLoadLocalWord').html(this.state.fireworkSaveRecord.saveTime.toString().substr(0,24));
        }
    }
    sidebarHelpClick(){
        //TODO
    }
    startRecord(){
        this.state.pressRecord=true;
        this.state.goOver=false;
        this.refs.timer.timerCountDown();//開始倒數計時
        clearTimeout(this.state.recordId);//有可能之前有未完的setTimeout，把它clear掉。
        clearTimeout(this.state.recordId2);
        this.state.recordId=setTimeout(function(){
            if(this.state.pressRecord){
                this.state.startAction=true;
                this.state.flashRecId
                    =setInterval(function(){
                        $('.img-rec').toggleClass('active');
                    },800);
            }
        }.bind(this),9000);//delay time 延遲讓文字顯示的時間

        this.state.recordId2=setTimeout(function(){//start record timer  GO結束 //初始化各個狀態
            Main.defaultProps.myInputManager.firework.time=0;
            Main.defaultProps.myInputManager.firework.endTime=0;
            Main.defaultProps.myInputManager.firework.saveRecord1=[];
            Main.defaultProps.myInputManager.firework.saveRecord2=[];
            Main.defaultProps.myInputManager.firework.alphabetBuffer=[];
            this.state.goOver=true;
        }.bind(this),8300);
    }
    toggleSidebar(){//sidebar和footer的開啟或關閉
        if(this.state.startAction){
            this.state.startAction=false;
            this.refs.startActionInstruction.stopFlashRec();
        }
        this.state.sidebarOpen=!this.state.sidebarOpen;
        $('.sideBarBtn').toggleClass('active');
        $('.sidePanel').toggleClass('active');
        $('.navbar').toggleClass('active');
    }
    saveDialogSaveClick(){//當startAction後，按下F4所跳出來的dialog save
        this.refs.saveDialog.closeDialog();
        $('.dialogUpload').addClass('active');
        this.refs.saveDialog.getBtnBack();
    }
    saveDialogAgainClick(){//restart
        this.refs.saveDialog.closeDialog();
        this.resetRecordState();
        this.refs.saveDialog.getBtnBack();
        setTimeout(function(){
            this.startRecord();
        }.bind(this),800);
    }
    saveDialogReplayClick(){//回放
        this.refs.settingWord.hide();
        this.state.replay=true;
        this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        this.refs.saveDialog.closeDialog();
        this.resetRecordState();
        Main.defaultProps.myInputManager.firework.firework1s=[];//初始化
        Main.defaultProps.myInputManager.firework.firework2s=[];
        if(this.state.fireworkRecord.endTime==0){//代表replay第一次，之後也有可能replay好幾次，不過都不會再進到個if裡
            this.state.fireworkRecord.endTime=Main.defaultProps.myInputManager.firework.time;
            Main.defaultProps.myInputManager.firework.endTime=this.state.fireworkRecord.endTime;
        }

        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.state.fireworkRecord,0,0,0,0);
            setTimeout(function(){//700秒後，把計時器歸零，開始計時
                self.state.startAction=true;
            },700);

        },500);//按下按鈕後過500ms才開始回放
    }

    pushRecordToReplay(record,in1,in2,time,type){//type 0: replay 1: load replay
        let index1=in1,index2=in2;//因為fireworkRecord儲存都是依照時間先後儲存的，所以只要設兩個index，從小跑到大就好了
        let record1=record.saveRecord1;
        let record2=record.saveRecord2;
        if(this.state.flag===(60/window.fps-1)){//因為前面在刷畫面的時候，己經更改flag值了，所以這邊只要判斷就好
            for(let i=index1;i<record1.length;i++){
                if(record1[i].startTime<time){//如果時間超過了firework1的startTime，代表要發射了，就push到myInputManager的firework裡面，等待發射。
                    index1++;
                    record1[i].reset();
                    Main.defaultProps.myInputManager.firework.firework1s.push(record1[i]);
                }
                else if(isNaN(record1[i].startTime))//如果出發的時間是NAN，就不要push，因為會出問題
                    index1++;
                else
                    break;
            }
            for(let i=index2;i<record2.length;i++){
                if(record2[i].startTime<time){
                    index2++;
                    record2[i].reset();
                    Main.defaultProps.myInputManager.firework.firework2s.push(record2[i]);
                }
                else if(isNaN(record2[i].startTime))
                    index2++;
                else
                    break;
            }
        }
        var self=this;
        if(time<=record.endTime)
            window.requestAnimFrame(function(){
                self.pushRecordToReplay(record,index1,index2,time+1000/60,type);
            });
        else{
            if(type===0){
                this.state.modal=true;
                $('.modal').addClass('active');
                $('.dialogSave').addClass('active');
                $('#dialogSaveContinueBtn').addClass('hide');
                this.state.replay=false;
                this.state.startAction=false;
                this.refs.settingWord.show();
            }
            else if(type==1){
                $('.modal').addClass('active');
                $('.dialogReplay').addClass('active');
                self.state.replay=false;
                self.state.startAction=false;
            }
        }
    }
    saveDialogContinueClick(){
        this.refs.saveDialog.closeDialog();
        this.state.modal=false;
        $('.modal').removeClass('active');
    }
    saveDialogQuitClick(){
        this.refs.saveDialog.closeDialog();
        this.refs.saveDialog.getBtnBack();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
    }
    resetRecordState(){//重設record的狀態，只要有會開始record或停上record，都會呼叫這個function
        this.state.startAction=false;
        clearInterval(this.state.flashRecId);
        $('.startActionInstruction').children().removeClass('active');
        this.state.modal=false;
        this.refs.timer.clearTimer();
        $('.modal').removeClass('active');
    }
    loadDialogQuitClick(){
        this.toggleSidebar();
        this.refs.settingWord.show();
        $('.dialogLoad').removeClass('active');
    }
    loadDialogRemoteLoadClick(){
        //TODO
    }
    loadDialogLocalLoadClick(){
        $('.dialogLoad').removeClass('active');
        this.state.pressRecord=true;
        this.state.replay=true;
        this.resetRecordState();
        Main.defaultProps.myInputManager.firework.firework1s=[];
        Main.defaultProps.myInputManager.firework.firework2s=[];
        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.state.fireworkSaveRecord,0,0,0,1);
            setTimeout(function(){
                self.state.startAction=true;
            },700);
        },500);

    }
    uploadDialogUploadClick(){
        //this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        //this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        //this.refs.upLoadDialog.closeDialog();
        //this.resetRecordState();
        //this.toggleSidebar();
        //this.state.pressRecord=false;
        //TODO
        //ajax
    }
    uploadDialogQuitClick(){//不上傳只儲存在local
        this.state.fireworkSaveRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkSaveRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        if(this.state.fireworkRecord.endTime==0)//代表沒有進replay mode，直接save
            this.state.fireworkSaveRecord.endTime=Main.defaultProps.myInputManager.firework.time;
        else    
            this.state.fireworkSaveRecord.endTime=this.state.fireworkRecord.endTime;
        this.state.fireworkSaveRecord.saveTime=new Date();
        this.refs.upLoadDialog.closeDialog();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
        this.refs.centerShowWords.showRecordSave();

        //reset暫存
        this.state.fireworkRecord.saveRecord1=[];
        this.state.fireworkRecord.saveRecord2=[];
        this.state.fireworkRecord.endTime=0;
        Main.defaultProps.myInputManager.firework.endTime=0;
    }
    replayDialogReplayClick(){
        this.refs.replayDialog.closeDialog();
        this.loadDialogLocalLoadClick();
    }
    replayDialogQuitClick(){
        this.refs.replayDialog.closeDialog();
        this.resetRecordState();
        this.toggleSidebar();
        this.refs.settingWord.show();
        this.state.pressRecord=false;
    }
    render(){
        return(
                <div className={'main'}>
                <MainCanvas setupInputManager={this.setupInputManager.bind(this)}/>
                <Navbar/>
                <Timer ref='timer'/>
                <SideBar
                toggleSidebar={this.toggleSidebar.bind(this)}
                sidebarMakeClick={this.sidebarMakeClick.bind(this)}
                sidebarLoadClick={this.sidebarLoadClick.bind(this)}
                sidebarHelpClick={this.sidebarHelpClick.bind(this)}/>
                <StartActionInstruction ref='startActionInstruction'/>
                <SettingWord ref='settingWord'/>
                <SaveDialog
                ref='saveDialog'
                saveClick={this.saveDialogSaveClick.bind(this)} 
                replayClick={this.saveDialogReplayClick.bind(this)} 
                againClick={this.saveDialogAgainClick.bind(this)} 
                continueClick={this.saveDialogContinueClick.bind(this)} 
                quitClick={this.saveDialogQuitClick.bind(this)}/>
                <LoadDialog
                quitClick={this.loadDialogQuitClick.bind(this)}
                remoteLoadClick={this.loadDialogRemoteLoadClick.bind(this)}
                localLoadClick={this.loadDialogLocalLoadClick.bind(this)}
                />
                    <UploadDialog
                    ref='upLoadDialog'
                    uploadClick={this.uploadDialogUploadClick.bind(this)}
                quitClick={this.uploadDialogQuitClick.bind(this)}
                />
                    <ReplayDialog
                    ref='replayDialog'
                    replayClick={this.replayDialogReplayClick.bind(this)}
                quitClick={this.replayDialogQuitClick.bind(this)}
                />
                    <Modal/>
                    <CenterShowWords ref='centerShowWords'/>
                    </div>
                    );
    }
}
Main.defaultProps={
    myInputManager:new InputManager(),
    wordAll:new WordManager()
};

class MainCanvas extends Component{//主要的canvas
    componentDidMount(){
        $(window).on('mousemove',function(e){
            this.props.fireworkAll.curPos.setVector(e.pageX,e.pageY);
        }.bind(this));
        this.props.fireworkAll.$canvas=$('#mainCanvas');
        this.props.fireworkAll.ctx=$('#mainCanvas').get(0).getContext('2d');
        this.props.setupInputManager(this.props.fireworkAll);
    }
    render(){
        return(
                <canvas id={'mainCanvas'} height={$(window).height()} width={$(window).width()}></canvas>
              );
    }
}
MainCanvas.defaultProps={
    fireworkAll:new FireworkManager()
};
class Modal extends Component{//擋著所有畫面的大黑幕
    render(){
        return(
                <div className={'modal'}>
                </div>
              );
    }
}
class Timer extends Component{//倒數計時器
    constructor(){
        super();
        this.state={
            timerId:[]
        };
    }
    clearTimer(){//清除計時器
        $('.time-second').removeClass('active');
        $('.time-second').addClass('hide');
        this.state.timerId.map(function(timer){
            clearTimeout(timer);
            return null;
        });
        setTimeout(function(){
            $('.time-second').removeClass('hide');
        },800);
    }
    timerCountDown(){
        this.state.timerId[0]=setTimeout(function(){$('.time-second3').addClass('active');},500);
        this.state.timerId[1]=setTimeout(function(){$('.time-second2').addClass('active');},2500);
        this.state.timerId[2]=setTimeout(function(){$('.time-second1').addClass('active');},4500);
        this.state.timerId[3]=setTimeout(function(){$('.time-second0').addClass('active');},6500);
        this.state.timerId[4]=setTimeout(function(){$('.time-second3').removeClass('active');},1500);
        this.state.timerId[5]=setTimeout(function(){$('.time-second2').removeClass('active');},3500);
        this.state.timerId[6]=setTimeout(function(){$('.time-second1').removeClass('active');},5500);
        this.state.timerId[7]=setTimeout(function(){$('.time-second0').removeClass('active');},7500);
    }
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

class SettingWord extends Component{//下面那一排提示說明
    show(){
        $('.settingWord').removeClass('hide');
    }
    hide(){
        $('.settingWord').addClass('hide');
    }
    toggleAlphabet(){
        $('.settingWord:nth-child(2)').toggleClass('active');
        $('.settingWord:nth-child(4)').toggleClass('active');
    }
    toggleRocket(){
        $('.settingWord:nth-child(7)').toggleClass('active');
        $('.settingWord:nth-child(9)').toggleClass('active');
    }
    togglePause(){
        $('.settingWord:nth-child(11)').toggleClass('active');
    }
    render(){
        return(
                <div className={'settingWordDiv'}>
                <h3 className={'settingWord settingWordKey'}>空白鍵</h3>
                <h3 className={'settingWord active'}>煙火</h3>
                <h3 className={'settingWord'}>/</h3>
                <h3 className={'settingWord'}>英數</h3>
                <h3 className={'settingWord settingWordKey'}>,</h3>
                <h3 className={'settingWord active'}>沖天炮</h3>
                <h3 className={'settingWord active'}>開</h3>
                <h3 className={'settingWord'}>/</h3>
                <h3 className={'settingWord'}>關</h3>
                <h3 className={'settingWord settingWordKey'}>F2</h3>
                <h3 className={'settingWord'}>暫停</h3>
                <h3 className={'settingWord settingWordKey'}>F4</h3>
                <h3 className={'settingWord active'}>選單</h3>
                </div>
              );
    }
}

class StartActionInstruction extends Component{//rec pause的圖片切換
    pause(){
        $('.img-rec').addClass('pause');
        $('.img-pause').removeClass('pause');
    }
    cancelPause(){
        $('.img-rec').removeClass('pause');
        $('.img-pause').addClass('pause');
    }
    render(){
        return(
                <div className={'startActionInstruction'}>
                <img src="img/rec.png" className={'img-rec'}></img>
                <img src="img/pause.png" className={'img-pause pause'}></img>
                </div>
              );
    }
}


class Navbar extends Component{//底部footer bar
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

class CenterShowWords extends Component{//顯示在中間的字，這是顯示已儲存
    showRecordSave(){
        $('.recordSave').addClass('active');
        setTimeout(function(){$('.recordSave').removeClass('active');},1000);
    }
    render(){
        return(
                <h1 className={"centerShowWords recordSave"}>Saved</h1>
              );
    }
}
export default Main;

