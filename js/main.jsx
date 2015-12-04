'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';
import SideBar from './sidebar';
import {SaveDialog,LoadDialog} from './dialog';
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
            saveRecord:[]
        };
    }
    setupInputManager(fireworkManager){
        Main.defaultProps.myInputManager.firework=fireworkManager;
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
            Main.defaultProps.myInputManager.firework.startTime=new Date().getTime();
            Main.defaultProps.myInputManager.firework.saveRecord=[];
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
        this.state.saveRecord=Main.defaultProps.myInputManager.firework.saveRecord;
        this.saveDialogQuitClick();
        this.refs.centerShowWords.showRecordSave();
    }
    saveDialogAgainClick(){
        this.resetRecordState();
        setTimeout(function(){
            this.startRecord();
        }.bind(this),800);
    }
    saveDialogContinueClick(){
        this.state.modal=false;
        $('.dialogSaveOrAbort').removeClass('active');
        $('.modal').removeClass('active');
    }
    saveDialogQuitClick(){
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
        $('.dialogSaveOrAbort').removeClass('active');
        $('.modal').removeClass('active');
    }
    loadDialogQuitClick(){
        this.toggleSidebar();
        $('.dialogLoad').removeClass('active');
    }
    loadDialogRemoteLoadClick(){
        //TODO
    }
    loadDialogLocalLoadClick(){
        //TODO
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
                saveClick={this.saveDialogSaveClick.bind(this)} 
                againClick={this.saveDialogAgainClick.bind(this)} 
                continueClick={this.saveDialogContinueClick.bind(this)} 
                quitClick={this.saveDialogQuitClick.bind(this)}/>
                <LoadDialog
                quitClick={this.loadDialogQuitClick.bind(this)}
                remoteLoadClick={this.loadDialogRemoteLoadClick.bind(this)}
                localLoadClick={this.loadDialogLocalLoadClick.bind(this)}
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
        this.props.fireworkAll.init();
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



