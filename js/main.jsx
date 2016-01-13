'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';
import SideBar from './sidebar';
import PlayerDialog from './playerdialog';
import {SaveDialog,LoadDialog,UploadDialog,ReplayDialog,AboutDialog,HelpDialog,HintDialog} from './dialog';
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
            settingWord:true,
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
            flag:0,
            videoId:'_Bq89eF-Pfs',
            wordTime:1.5,
            videoStartTime:0,
            videoEndTime:0,
            atmosphere:0,//0:blue 1:pink 2:purple
            //dilaog state
            dialogSaveShow:false,
            dialogLoadShow:false,
            dialogLoadTime:null,
            dialogUploadShow:false,
            dialogReplayShow:false,
            dialogAboutShow:false,
            dialogHelpShow:false,
            dialogHintShow:false,
            dialogPlayerShow:false
        };
    }
    componentDidMount(){
        $('body').attr('unselectable', 'on').on('selectstart', false);
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
            if(!this.state.pauseRecord){//for continue
                Main.defaultProps.myInputManager.firework.init();
            }
            if(this.state.startAction && !this.state.pauseRecord){//for continue
                Main.defaultProps.wordAll.init();
            }
            this.state.flag=0;
        }
        else
            this.state.flag++;
        window.requestAnimFrame(this.drawAnim.bind(this));
    }
    sidebarMakeClick(words){
        if(this.state.pauseRecord===true)
            this.setState({pauseRecord:false});
        this.toggleSidebar();
        Main.defaultProps.wordAll.words=words;
        Main.defaultProps.wordAll.getEachTime();
        this.refs.player.pause();
        this.startRecord();
    }
    sidebarLoadClick(){
        this.toggleSidebar();
        this.setState({
            modal:true,
            settingWord:false,
            dialogLoadShow:true,
            dialogLoadTime:this.state.fireworkSaveRecord.saveTime===null?null:this.state.fireworkSaveRecord.saveTime.toString().substr(0,24)
        });
    }
    sidebarVideoClick(wordtime){
        this.setState({
            modal:true,
            settingWord:false,
            wordTime:wordtime,
            dialogPlayerShow:true
        });
        this.toggleSidebar();
    }
    sidebarBackgroundClick(){
        let color=this.state.atmosphere;
        Main.defaultProps.myInputManager.firework.changeAtmosphere((color+1)%3);
        this.setState({
            atmosphere:(color+1)%3
        });
    }
    startRecord(){
        this.state.pressRecord=true;
        this.state.goOver=false;
        this.refs.timer.timerCountDown();//開始倒數計時
        clearTimeout(this.state.recordId);//有可能之前有未完的setTimeout，把它clear掉。
        clearTimeout(this.state.recordId2);
        this.state.recordId=setTimeout(function(){
            if(this.state.pressRecord){
                this.setState({startAction:true});
                this.state.flashRecId
                    =setInterval(function(){
                        $('.img-rec').toggleClass('active');
                    },800);
            }
        }.bind(this),9800);//delay time 延遲讓文字顯示的時間

        this.state.recordId2=setTimeout(function(){//start record timer  GO結束 //初始化各個狀態
            Main.defaultProps.myInputManager.firework.time=0;
            Main.defaultProps.myInputManager.firework.endTime=0;
            Main.defaultProps.myInputManager.firework.saveRecord1=[];
            Main.defaultProps.myInputManager.firework.saveRecord2=[];
            Main.defaultProps.myInputManager.firework.alphabetBuffer=[];
            this.state.goOver=true;
            this.refs.player.loadVideo();
        }.bind(this),8300);
    }
    toggleSidebar(){//sidebar和footer的開啟或關閉
        if(this.state.startAction)
            this.setState({startAction:false});
        this.setState({sidebarOpen:!this.state.sidebarOpen});
    }
    saveDialogSaveClick(){//當startAction後，按下F4所跳出來的dialog save
        this.setState({
            pauseRecord:false,
            dialogSaveShow:false,
            dialogUploadShow:true
        });
        this.refs.saveDialog.getBtnBack();
        this.refs.player.stop();
    }
    saveDialogAgainClick(){//restart
        this.setState({
            pauseRecord:false,
            dialogSaveShow:false
        });
        this.resetRecordState();
        this.refs.saveDialog.getBtnBack();
        setTimeout(function(){
            this.startRecord();
        }.bind(this),800);
    }
    saveDialogReplayClick(){//回放
        this.state.replay=true;
        this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        this.setState({
            pauseRecord:false,
            settingWord:false,
            dialogSaveShow:false
        });
        this.resetRecordState();
        Main.defaultProps.myInputManager.firework.firework1s=[];//初始化
        Main.defaultProps.myInputManager.firework.firework2s=[];
        if(this.state.fireworkRecord.endTime===0){//代表replay第一次，之後也有可能replay好幾次，不過都不會再進到個if裡
            this.state.fireworkRecord.endTime=Main.defaultProps.myInputManager.firework.time;
            Main.defaultProps.myInputManager.firework.endTime=this.state.fireworkRecord.endTime;
        }
        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.state.fireworkRecord,0,0,0,0);
            setTimeout(function(){//1500秒後，把計時器歸零，開始計時
                self.setState({startAction:true});
            },1500);
            self.refs.player.loadVideo();
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
            this.refs.player.stop();
            if(type===0){//錄製完的replay
                this.setState({
                    settingWord:true,
                    modal:true,
                    dialogSaveShow:true,
                    startAction:false
                });
                $('#dialogSaveContinueBtn').addClass('hide');
                this.state.replay=false;
            }
            else if(type===1){//由load處load的replay
                this.setState({
                    modal:true,
                    dialogReplayShow:true,
                    startAction:false
                });
                this.state.replay=false;
            }
        }
    }
    saveDialogContinueClick(){
        this.setState({
            modal:false,
            dialogSaveShow:false,
            pauseRecord:false
        });
        this.refs.player.play();
    }
    saveDialogQuitClick(){
        this.setState({
            pauseRecord:false,
            modal:false,
            dialogSaveShow:false
        });
        this.refs.saveDialog.getBtnBack();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
        this.refs.player.stop();
    }
    resetRecordState(){//重設record的狀態，只要有會開始record或停上record，都會呼叫這個function
        clearInterval(this.state.flashRecId);
        $('.startActionInstruction').children().removeClass('active');
        this.setState({
            modal:false,
            startAction:false
        });
        this.refs.timer.clearTimer();
    }
    loadDialogQuitClick(){
        this.setState({
            settingWord:true,
            modal:false,
            dialogLoadShow:false
        });
        this.toggleSidebar();
    }
    loadDialogRemoteLoadClick(){
        //TODO
    }
    loadDialogLocalLoadClick(){
        this.setState({dialogLoadShow:false});
        this.state.pressRecord=true;
        this.state.replay=true;
        this.resetRecordState();
        Main.defaultProps.myInputManager.firework.firework1s=[];
        Main.defaultProps.myInputManager.firework.firework2s=[];
        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.state.fireworkSaveRecord,0,0,0,1);
            setTimeout(function(){
                self.setState({
                    startAction:true
                });
            },1500);
            self.refs.player.loadVideo();
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
        if(this.state.fireworkRecord.endTime===0)//代表沒有進replay mode，直接save
            this.state.fireworkSaveRecord.endTime=Main.defaultProps.myInputManager.firework.time;
        else    
            this.state.fireworkSaveRecord.endTime=this.state.fireworkRecord.endTime;
        this.state.fireworkSaveRecord.saveTime=new Date();
        this.setState({
            dialogUploadShow:false
        });
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
        this.setState({dialogReplayShow:false});
        this.loadDialogLocalLoadClick();
    }
    replayDialogQuitClick(){
        this.setState({
            settingWord:true,
            dialogReplayShow:false});
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
    }
    navbarAboutClick(){
        this.toggleSidebar();
        this.setState({
            modal:true,
            settingWord:false,
            dialogAboutShow:true
        });
    }
    navbarHelpClick(){
        this.toggleSidebar();
        this.setState({
            modal:true,
            settingWord:false,
            dialogHelpShow:true
        });
    }
    navbarHintClick(){
        this.toggleSidebar();
        this.setState({
            modal:true,
            settingWord:false,
            dialogHintShow:true
        });
    }
    aboutDialogQuitClick(){
        this.toggleSidebar();
        this.setState({
            modal:false,
            settingWord:true,
            dialogAboutShow:false
        });
    }
    helpDialogQuitClick(){
        this.toggleSidebar();
        this.setState({
            modal:false,
            settingWord:true,
            dialogHelpShow:false
        });
    }
    hintDialogQuitClick(){
        this.toggleSidebar();
        this.setState({
            modal:false,
            settingWord:true,
            dialogHintShow:false
        });
    }
    changeVideoId(video){
        this.setState({videoId:video});
    }
    playerDialogQuitClick(){
        this.toggleSidebar();
        this.setState({
            modal:false,
            settingWord:true,
            dialogPlayerShow:false
        });
    }
    changeVideoTime(starttime,endtime){
        this.setState({videoStartTime:starttime,videoEndTime:endtime});
    }
    render(){
        return(
                <div className={'main'}>
                     <MainCanvas setupInputManager={this.setupInputManager.bind(this)}/>
                     <Navbar
                        aboutClick={this.navbarAboutClick.bind(this)}
                        helpClick={this.navbarHelpClick.bind(this)}
                        hintClick={this.navbarHintClick.bind(this)}
                        show={this.state.sidebarOpen}/>
                     <Timer ref='timer'/>
                     <SideBar
                        toggleSidebar={this.toggleSidebar.bind(this)}
                        sidebarMakeClick={this.sidebarMakeClick.bind(this)}
                        sidebarLoadClick={this.sidebarLoadClick.bind(this)}
                        sidebarVideoClick={this.sidebarVideoClick.bind(this)}
                        sidebarBackgroundClick={this.sidebarBackgroundClick.bind(this)}
                        show={this.state.sidebarOpen}
                        atmosphere={this.state.atmosphere}/>
                     <StartActionInstruction
                        startAction={this.state.startAction}
                        pauseRecord={this.state.pauseRecord}/>
                     <SettingWord
                        rocket={this.state.rocket}
                        alphabet={this.state.alphabet}
                        pause={this.state.pauseRecord}
                        settingWord={this.state.settingWord}/>
                     <SaveDialog
                        ref='saveDialog'
                        saveClick={this.saveDialogSaveClick.bind(this)} 
                        replayClick={this.saveDialogReplayClick.bind(this)} 
                        againClick={this.saveDialogAgainClick.bind(this)} 
                        continueClick={this.saveDialogContinueClick.bind(this)} 
                        quitClick={this.saveDialogQuitClick.bind(this)}
                        show={this.state.dialogSaveShow}/>
                    <LoadDialog
                        quitClick={this.loadDialogQuitClick.bind(this)}
                        remoteLoadClick={this.loadDialogRemoteLoadClick.bind(this)}
                        localLoadClick={this.loadDialogLocalLoadClick.bind(this)}
                        show={this.state.dialogLoadShow}
                        time={this.state.dialogLoadTime}/>
                    <UploadDialog
                        uploadClick={this.uploadDialogUploadClick.bind(this)}
                        quitClick={this.uploadDialogQuitClick.bind(this)}
                        show={this.state.dialogUploadShow}/>
                    <ReplayDialog
                        replayClick={this.replayDialogReplayClick.bind(this)}
                        quitClick={this.replayDialogQuitClick.bind(this)}
                        show={this.state.dialogReplayShow}/>
                    <AboutDialog
                        quitClick={this.aboutDialogQuitClick.bind(this)}
                        show={this.state.dialogAboutShow}/>
                    <HelpDialog
                        quitClick={this.helpDialogQuitClick.bind(this)}
                        show={this.state.dialogHelpShow}/>
                    <HintDialog
                        quitClick={this.hintDialogQuitClick.bind(this)}
                        show={this.state.dialogHintShow}/>
                    <PlayerDialog
                        ref='player'
                        videoId={this.state.videoId}
                        changeVideoId={this.changeVideoId.bind(this)}
                        changeVideoTime={this.changeVideoTime.bind(this)}
                        quitClick={this.playerDialogQuitClick.bind(this)}
                        wordTime={this.state.wordTime}
                        videoStartTime={this.state.videoStartTime}
                        videoEndTime={this.state.videoEndTime}
                        show={this.state.dialogPlayerShow}/>
                    <Modal show={this.state.modal}/>
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
                this.props.show===true?<div className={'modal active'}></div>:<div className={'modal'}></div>
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
    render(){
        return(
                <div className={'settingWordDiv'}>
                    <h3 className={'settingWord settingWordKey'}>空白鍵</h3>
                    {this.props.alphabet===true?<h3 className={'settingWord'}>煙火</h3>:<h3 className={'settingWord active'}>煙火</h3>}
                    <h3 className={'settingWord'}>/</h3>
                    {this.props.alphabet===true?<h3 className={'settingWord active'}>英數</h3>:<h3 className={'settingWord'}>英數</h3>}
                    <h3 className={'settingWord settingWordKey'}>,</h3>
                    <h3 className={'settingWord active'}>煙火柱</h3>
                    {this.props.rocket===true?<h3 className={'settingWord active'}>開</h3>:<h3 className={'settingWord'}>開</h3>}
                    <h3 className={'settingWord'}>/</h3>
                    {this.props.rocket===true?<h3 className={'settingWord'}>關</h3>:<h3 className={'settingWord active'}>關</h3>}
                    <h3 className={'settingWord settingWordKey'}>F2</h3>
                    {this.props.pause===true?<h3 className={'settingWord active'}>暫停</h3>:<h3 className={'settingWord'}>暫停</h3>}
                    <h3 className={'settingWord settingWordKey'}>F4</h3>
                    <h3 className={'settingWord active'}>選單</h3>
                </div>
              );
    }
}

class StartActionInstruction extends Component{//rec pause的圖片切換
    render(){
        if(this.props.startAction && this.props.pauseRecord)
            return(
                    <div className={'startActionInstruction'}>
                    <img src="img/rec.png" className={'img-rec pause'}></img>
                    <img src="img/pause.png" className={'img-pause'}></img>
                    </div>
                  );
        else if(this.props.startAction && !this.props.pauseRecord)
            return(
                    <div className={'startActionInstruction'}>
                    <img src="img/rec.png" className={'img-rec'}></img>
                    <img src="img/pause.png" className={'img-pause pause'}></img>
                    </div>
                  );
        else
            return(
                    <div className={'startActionInstruction'}>
                    </div>
                  );
    }
}

class Navbar extends Component{//底部footer bar
    render(){
        return(
                <div className={this.props.show?'navbar':'navbar active'}>
                    <img className={'navbarImg'} src="img/Firework.png"></img>
                    <button id={'navbarAboutBtn'} className={'navbarBtn'} onClick={this.props.aboutClick}>About</button>
                    <button id={'navbarHelpBtn'} className={'navbarBtn'} onClick={this.props.helpClick}>Help</button>
                    <button id={'navbarHintBtn'} className={'navbarBtn'} onClick={this.props.hintClick}>Hint</button>
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

