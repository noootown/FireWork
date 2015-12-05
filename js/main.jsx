'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';
import SideBar from './sidebar';
import {SaveDialog,LoadDialog,UploadDialog} from './dialog';
import {FireworkManager,InputManager,WordManager} from './manager';

class Main extends React.Component{
    constructor(){
        super();
        this.state={
            sideBarOpen:true,
            recordId:null,
            startAction:false, //after Go disappear
            pressRecord:false, //press make
            flashRecId:null,
            modal:false,
            replayId:null,
            fireworkRecord:{
                saveRecord1:[],
                saveRecord2:[],
                endTime:0
            },
                //saveRecord1:[],
                //saveRecord2:[],
            replay:false
        };
    }
    setupInputManager(fireworkManager){
        Main.defaultProps.myInputManager.firework=fireworkManager;
        Main.defaultProps.myInputManager.firework.virtualDOM=this;
        Main.defaultProps.myInputManager.virtualDOM=this;
        Main.defaultProps.wordAll.$canvas=$('#mainCanvas');
        Main.defaultProps.wordAll.ctx=fireworkManager.ctx;
        setInterval(function(){
            if(!this.state.startAction){
                Main.defaultProps.wordAll.ptr=0;
            }
            if(!this.state.modal){
                Main.defaultProps.myInputManager.firework.init();
            }
            if(this.state.startAction && !this.state.modal){
                Main.defaultProps.wordAll.init();
            }

        }.bind(this),25);
    }
    sidebarMakeClick(words){
        this.toggleSidebar();
        Main.defaultProps.wordAll.words=words;
        this.startRecord();
    }
    sidebarLoadClick(){
        this.toggleSidebar();
        this.state.modal=true;
        $('.dialogLoad').addClass('active');
        if(this.state.fireworkRecord.saveRecord1.length!==0 && this.state.fireworkRecord.saveRecord2.length!==0 )
            $('.dialogLoadNoFile').removeClass('.dialogLoadNoFile');

    }
    sidebarHelpClick(){
        //TODO
    }
    startRecord(){
        this.state.pressRecord=true;
        this.refs.timer.timerCountDown();
        clearTimeout(this.state.recordId);
        this.state.recordId=setTimeout(function(){
            if(this.state.pressRecord){
                this.state.startAction=true;
                this.state.flashRecId
                    =setInterval(function(){
                        $('.startActionInstruction').children().toggleClass('active');
                    },800);
            }
        }.bind(this),9000);//delay time

        setTimeout(function(){//start record timer
            Main.defaultProps.myInputManager.firework.time=0;
            Main.defaultProps.myInputManager.firework.realStartTime=new Date().getTime();
            Main.defaultProps.myInputManager.firework.saveRecord1=[];
            Main.defaultProps.myInputManager.firework.saveRecord2=[];
        },8300);
    }
    toggleSidebar(){
        if(this.state.startAction){
            this.state.startAction=false;
            this.refs.startActionInstruction.stopFlashRec();
        }
        this.state.sideBarOpen=!this.state.sideBarOpen;
        $('.sideBarBtn').toggleClass('active');
        $('.sidePanel').toggleClass('active');
        $('.navbar').toggleClass('active');
    }
    saveDialogSaveClick(){
        this.refs.saveDialog.closeDialog();
        $('.dialogUpload').addClass('active');
        this.refs.saveDialog.getContinueBtnBack();
    }
    saveDialogAgainClick(){
        this.refs.saveDialog.closeDialog();
        this.resetRecordState();
        this.refs.saveDialog.getContinueBtnBack();
        setTimeout(function(){
            this.startRecord();
        }.bind(this),800);
    }
    saveDialogReplayClick(){
        this.state.replay=true;
        this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        this.refs.saveDialog.closeDialog();
        this.resetRecordState();
        Main.defaultProps.myInputManager.firework.firework1s=[];
        Main.defaultProps.myInputManager.firework.firework2s=[];
        let index1=0;
        let index2=0;
        var self=this;
        setTimeout(function(){
            let time=0;
            self.state.replayId=setInterval(function(){
                time+=25;
                for(let i=index1;i<self.state.fireworkRecord.saveRecord1.length;i++){
                    if(self.state.fireworkRecord.saveRecord1[i].startTime<time){
                        index1++;
                        self.state.fireworkRecord.saveRecord1[i].reset();
                        Main.defaultProps.myInputManager.firework.firework1s.push(self.state.fireworkRecord.saveRecord1[i]);
                    }
                    else if(isNaN(self.state.fireworkRecord.saveRecord1[i].startTime))
                        index1++;
                    else
                        break;
                }
                for(let i=index2;i<self.state.fireworkRecord.saveRecord2.length;i++){
                    if(self.state.fireworkRecord.saveRecord2[i].startTime<time){
                        index2++;
                        self.state.fireworkRecord.saveRecord2[i].reset();
                        Main.defaultProps.myInputManager.firework.firework2s.push(self.state.fireworkRecord.saveRecord2[i]);
                        //console.log(i);
                    }
                    else if(isNaN(self.state.fireworkRecord.saveRecord2[i].startTime))
                        index2++;
                    else
                        break;
                }
            },25);
            setTimeout(function(){
                clearInterval(self.state.replayId);
                self.state.modal=true;
                $('.modal').addClass('active');
                $('.dialogSaveOrAbort').addClass('active');
                $('#dialogSaveContinueBtn').addClass('hide');
                self.state.replay=false;
            },self.state.fireworkRecord.endTime);
        },1000);
    }
    saveDialogContinueClick(){
        this.refs.saveDialog.closeDialog();
        this.state.modal=false;
        $('.modal').removeClass('active');
    }
    saveDialogQuitClick(){
        this.refs.saveDialog.closeDialog();
        this.refs.saveDialog.getContinueBtnBack();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
    }
    resetRecordState(){
        this.state.startAction=false;
        clearInterval(this.state.flashRecId);
        $('.startActionInstruction').children().removeClass('active');
        this.state.modal=false;
        this.refs.timer.clearTimer();
        $('.modal').removeClass('active');
    }
    loadDialogQuitClick(){
        this.toggleSidebar();
        $('.dialogLoad').removeClass('active');
        this.state.modal=false;
    }
    loadDialogRemoteLoadClick(){
        //TODO
    }
    loadDialogLocalLoadClick(){
        //TODO
    }
    uploadDialogUploadClick(){
        this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        this.refs.upLoadDialog.closeDialog();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
        //TODO
    }
    uploadDialogQuitClick(){
        this.state.fireworkRecord.saveRecord1=Main.defaultProps.myInputManager.firework.saveRecord1;
        this.state.fireworkRecord.saveRecord2=Main.defaultProps.myInputManager.firework.saveRecord2;
        this.refs.upLoadDialog.closeDialog();
        this.resetRecordState();
        this.toggleSidebar();
        this.state.pressRecord=false;
        this.refs.centerShowWords.showRecordSave();
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
                <StartActionInstructionWords/>
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

class MainCanvas extends Component{
    componentDidMount(){
        $(window).on('mousemove',function(e){
            this.props.fireworkAll.curPos.setVector(e.pageX,e.pageY);
        }.bind(this));
        this.props.fireworkAll.$canvas=$('#mainCanvas');
        this.props.fireworkAll.ctx=$('#mainCanvas').get(0).getContext('2d');
        //this.props.fireworkAll.init();
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
class Modal extends Component{
    show(){
        $('modal').css('visibility','visible');
    }
    hide(){
        $('modal').css('visibility','hidden');
    }
    render(){
        return(
                <div className={'modal'}>
                </div>
              );
    }
}
class Timer extends Component{
    constructor(){
        super();
        this.state={
            timerId:[]
        };
    }
    clearTimer(){
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

class CenterShowWords extends Component{
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

