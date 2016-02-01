'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';
import SideBar from './sidebar';
import PlayerDialog from './playerdialog';
import {SaveDialog,LoadDialog,UploadDialog,ReplayDialog,AboutDialog,HelpDialog,HintDialog} from './dialog';
import {FireworkManager,WordManager} from './manager';

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
        this.firework=new FireworkManager();
        this.wordAll=new WordManager();
        this.fireworkRecord={//暫存的紀錄
            saveRecord1:[],
            saveRecord2:[],
            endTime:0
        };
        this.fireworkSaveRecord={//已儲存的紀錄
            saveRecord1:[],
            saveRecord2:[],
            endTime:0,
            saveTime:null
        };
        this.ORIGIN_VIDEO='_Bq89eF-Pfs';
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
            replay:false,
            alphabet:false,//true 英數模式 false 一般模式
            rocket:false,
            flag:0,
            videoId:this.ORIGIN_VIDEO,
            wordTime:1.5,
            videoStartTime:0,
            videoEndTime:0,
            atmosphere:0,//0:blue 1:pink 2:purple
            //dialog state
            dialogSaveShow:false,
            dialogSaveShowType:1,
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
//---------------------Input-----------------------------
    componentDidMount(){
        $('body').attr('unselectable', 'on').on('selectstart', false);
        let self=this;
        document.addEventListener('keydown', function (event) {
            if(event.which==32 || event.which==115)//避免按下enter時，又trigger button event，或者trigger F4原本的功能
                event.preventDefault();
            let modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
            if (!modifiers) {
                if (Main.fireworkMap[event.which] !== undefined || Main.alphabetMap[event.which] !== undefined) {
                    event.preventDefault();
                    self.execFunc(self.shoot,event.which);
                }
            }
            if(!modifiers && event.which==188)//,<
                self.execFunc(self.switchRocket,event.which);
            if(!modifiers && event.which==191)// /
                self.execFunc(self.flushWord,event.which);
            if(!modifiers && event.which==113)//F2
                self.execFunc(self.pauseRecord,event.which);
            if(!modifiers && event.which==115)//F4
                self.execFunc(self.stopRecord,event.which);
            if(!modifiers && event.which==32)//space
                self.execFunc(self.switchInsert,event.which);
        });
        $(window).on('mousemove',function(e){
            self.firework.curPos.setVector(e.pageX,e.pageY);
        }.bind(this));
        this.firework.$canvas=$('#mainCanvas');
        this.firework.ctx=$('#mainCanvas').get(0).getContext('2d');
        this.wordAll.$canvas=$('#mainCanvas');
        this.wordAll.ctx=this.firework.ctx;
        this.drawAnim();
    }
    execFunc(event,data){
        event.call(this,data);
    }
    checkInputOrNot(){//查看是否有任何input是focus的
        return !!$('.word-input:focus').length;
    }
    getWhichInput(){//得到是哪一個input為focus的
        return $('.word-input:focus')[0];
    }
    inputCharacter(key,input){//輸入文字
        var nowValue = $(input).val();
        if(key==188 || key==191)
            $(input).val(nowValue);
        else if(key==32)
            $(input).val(nowValue+' ');
        else if(165<=key && key<=190)//小寫
            $(input).val(nowValue+String.fromCharCode(key-100+32));
        else//大寫and其它
            $(input).val(nowValue+String.fromCharCode((96 <= key && key <= 105) ? key-48 : key));
        input.dispatchEvent(new Event('input', { bubbles: true }));//trigger onChange event
    }
    shoot(key){//射煙火
        if(this.firework!==undefined && !this.state.replay){
            if(this.checkInputOrNot())
                this.inputCharacter((65<=key && key<=90)?key+100:key,this.getWhichInput());
            else if(this.state.pauseRecord || !this.state.modal){//如果是可以發射的狀況
                if(!this.state.alphabet && Main.fireworkMap[key]!==undefined)//如果是煙火模式
                    this.firework.shoot(Main.fireworkMap[key][0],Main.fireworkMap[key][1],0,this.state.pauseRecord);
                else if(this.state.alphabet && Main.alphabetMap[key]!==undefined)//如果是英數模式
                    this.firework.shoot(Main.alphabetMap[key][0],Main.alphabetMap[key][1],1,this.state.pauseRecord);
            }
        }
    }
    switchRocket(key){
        if(this.firework!==undefined){
            if(this.checkInputOrNot())
                this.inputCharacter(key,this.getWhichInput());
            else if(this.state.pauseRecord || !this.state.modal){
                this.firework.switchRocket();
                this.setState({rocket:!this.state.rocket});
            }
        }
    }
    stopRecord(){//按F4的反應，選單或側選單的開關
        if(!this.state.modal && !this.state.replay && this.state.goOver){
            if(this.state.pressRecord){
                this.setState({
                    pauseRecord:true,
                    modal:true,
                    dialogSaveShow:true,
                    dialogSaveShowType:1
                });
                this.refs.player.pause();
            }
            else if(!$('#word-input').is(':focus'))
                this.setState({sidebarOpen:!this.state.sidebarOpen});
        }
    }
    pauseRecord(){//暫停
        if(this.state.startAction){//action後的暫停
            if(!this.state.pauseRecord){//未暫停的狀態
                this.setState({
                    pauseRecord:true
                });
                this.refs.player.pause();
            }
            else{//暫停的狀態
                this.setState({
                    pauseRecord:false
                });
                this.refs.player.play();
            }
        }
        else if(!this.state.pressRecord){//在外面尚未make時，進入暫停模式
            if(!this.state.pauseRecord)
                this.setState({pauseRecord:true});
            else
                this.setState({pauseRecord:false});
        }
    }
    switchInsert(){//切換煙火模式和一般模式
        if(this.checkInputOrNot())
            this.inputCharacter(key,this.getWhichInput());
        else if(this.state.pauseRecord || !this.state.modal)
            this.setState({alphabet:!this.state.alphabet});
    }
//---------------------Input-----------------------------
    drawAnim(){//畫動畫
        if(this.state.flag===0){//因為requestAnimFrame預設的fps是60，所以設一個flag來控制他的fps only 0 1 所以fps=30
            if(!this.state.startAction){
                this.wordAll.ptr=0;
                this.wordAll.timeCounter=0;
                this.wordAll.opacity=0;
            }
            if(!this.state.pauseRecord){//for continue
                this.firework.init(this.state.replay);
            }
            if(this.state.startAction && !this.state.pauseRecord){//for continue
                this.wordAll.init();
            }
            this.setState({flag:1});
        }
        else
            this.setState({flag:0});
        window.requestAnimFrame(this.drawAnim.bind(this));
    }
//-------------------sidebar------------------------------
    sidebarMakeClick(words){
        if(this.state.pauseRecord===true)
            this.setState({pauseRecord:false});
        this.toggleSidebar();
        this.wordAll.words=words;
        this.wordAll.getEachTime();
        this.refs.player.pause();
        this.startRecord();
    }
    sidebarLoadClick(){
        this.toggleSidebar();
        this.setState({
            modal:true,
            settingWord:false,
            dialogLoadShow:true,
            dialogLoadTime:this.fireworkSaveRecord.saveTime===null?null:this.fireworkSaveRecord.saveTime.toString().substr(0,24)
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
        this.firework.changeAtmosphere((color+1)%3);
        this.setState({
            atmosphere:(color+1)%3
        });
    }
//-------------------sidebar------------------------------
    startRecord(){
        this.setState({
            pressRecord:true,
            goOver:false
        });
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
            this.firework.time=0;
            this.firework.endTime=0;
            this.firework.saveRecord1=[];
            this.firework.saveRecord2=[];
            this.firework.alphabetBuffer=[];
            this.fireworkRecord.endTime=0;
            this.setState({
                goOver:true
            });
            this.refs.player.loadVideo();
            this.refs.player.play();
        }.bind(this),8300);
    }
    toggleSidebar(){//sidebar和footer的開啟或關閉
        this.setState({
            sidebarOpen:!this.state.sidebarOpen,
            startAction:false
        });
    }
    saveDialogSaveClick(){//當startAction後，按下F4所跳出來的dialog save
        this.setState({
            pauseRecord:false,
            dialogSaveShow:false,
            dialogUploadShow:true
        });
        this.refs.player.stop();
    }
    saveDialogAgainClick(){//restart
        this.setState({
            pauseRecord:false,
            dialogSaveShow:false
        });
        this.resetRecordState();
        setTimeout(function(){
            this.startRecord();
        }.bind(this),800);
    }
    saveDialogReplayClick(){//回放
        this.fireworkRecord.saveRecord1=this.firework.saveRecord1;
        this.fireworkRecord.saveRecord2=this.firework.saveRecord2;
        this.setState({
            replay:true,
            pauseRecord:false,
            settingWord:false,
            dialogSaveShow:false
        });
        this.resetRecordState();
        this.firework.firework1s=[];//初始化
        this.firework.firework2s=[];
        if(this.fireworkRecord.endTime===0){//代表replay第一次，之後也有可能replay好幾次，不過都不會再進到個if裡
            this.fireworkRecord.endTime=this.firework.time;
            this.firework.endTime=this.fireworkRecord.endTime;
        }
        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.fireworkRecord,0,0,0,0);
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
                    this.firework.firework1s.push(record1[i]);
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
                    this.firework.firework2s.push(record2[i]);
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
            if(type===0)
                this.setState({
                    modal:true,
                    dialogSaveShow:true,
                    dialogSaveShowType:2,
                    startAction:false,
                    replay:false
                });
            else if(type===1)
                this.setState({
                    modal:true,
                    dialogReplayShow:true,
                    startAction:false,
                    replay:false
                });
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
            dialogSaveShow:false,
            pressRecord:false
        });
        this.resetRecordState();
        this.toggleSidebar();
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
        this.setState({
            pressRecord:true,
            replay:true,
            dialogLoadShow:false
        });
        this.resetRecordState();
        this.firework.firework1s=[];
        this.firework.firework2s=[];
        var self=this;
        setTimeout(function(){
            self.pushRecordToReplay(self.fireworkSaveRecord,0,0,0,1);
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
        this.fireworkSaveRecord.saveRecord1=this.firework.saveRecord1;
        this.fireworkSaveRecord.saveRecord2=this.firework.saveRecord2;
        if(this.fireworkRecord.endTime===0)//代表沒有進replay mode，直接save
            this.fireworkSaveRecord.endTime=this.firework.time;
        else    
            this.fireworkSaveRecord.endTime=this.fireworkRecord.endTime;
        this.fireworkSaveRecord.saveTime=new Date();
        this.setState({
            dialogUploadShow:false,
            pressRecord:false
        });
        this.resetRecordState();
        this.toggleSidebar();
        this.refs.centerShowWords.showRecordSave();

        //reset暫存
        this.fireworkRecord.saveRecord1=[];
        this.fireworkRecord.saveRecord2=[];
        this.fireworkRecord.endTime=0;
        this.firework.endTime=0;
    }
    replayDialogReplayClick(){
        this.setState({dialogReplayShow:false});
        this.loadDialogLocalLoadClick();
    }
    replayDialogQuitClick(){
        this.setState({
            settingWord:true,
            dialogReplayShow:false,
            pressRecord:false
        });
        this.resetRecordState();
        this.toggleSidebar();
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
        if(video!=='')
            this.setState({videoId:video});
        else
            this.setState({videoId:this.ORIGIN_VIDEO});
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
        this.setState({
            videoStartTime:starttime,
            videoEndTime:endtime
        });
    }
    render(){
        return(
                <div className={'main'}>
                     <canvas id={'mainCanvas'} height={$(window).height()} width={$(window).width()}></canvas>
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
                        saveClick={this.saveDialogSaveClick.bind(this)} 
                        replayClick={this.saveDialogReplayClick.bind(this)} 
                        againClick={this.saveDialogAgainClick.bind(this)} 
                        continueClick={this.saveDialogContinueClick.bind(this)} 
                        quitClick={this.saveDialogQuitClick.bind(this)}
                        show={this.state.dialogSaveShow}
                        showType={this.state.dialogSaveShowType}/>
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

Main.fireworkMap={//keycode to ascii code
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
    105:[9,57],

    65:[10,97],
    66:[11,98],
    67:[12,99],
    68:[13,100],
    69:[14,101],
    70:[15,102],
    71:[16,103],
    72:[17,104],
    73:[18,105],
    74:[19,106],
    75:[20,107],
    76:[21,108],
    77:[22,109],
    78:[23,110],
    79:[24,111],
    80:[25,112],
    81:[26,113],
    82:[27,114],
    83:[28,115],
    84:[29,116],
    85:[30,117],
    86:[31,118],
    87:[32,119],
    88:[33,120],
    89:[34,121],
    90:[35,122]
};
Main.alphabetMap={
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
