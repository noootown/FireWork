//The MIT License (MIT)
    
    //Copyright (c) 2014 troy betz
    
    //Permission is hereby granted, free of charge, to any person obtaining a copy
    //of this software and associated documentation files (the "Software"), to deal
    //in the Software without restriction, including without limitation the rights
    //to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //copies of the Software, and to permit persons to whom the Software is
    //furnished to do so, subject to the following conditions:
    
    //The above copyright notice and this permission notice shall be included in all
    //copies or substantial portions of the Software.
    
    //THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    //SOFTWARE.
'use strict';
import React from 'react';
import YouTube from 'react-youtube';
class PlayerDialog extends React.Component{
    constructor(){
        super();
        this.state={
            videoUrl:null,
            player:null,
            startMin:0,
            startSec:0,
            endMin:0,
            endSec:0
        };
    }
    onPlayerReady(event){
        this.state.player = event.target;
    }
    onChange(event){
        this.setState({videoUrl:event.target.value});
        var index=event.target.value.indexOf('watch?v=');
        this.props.changeVideoId(event.target.value.substr(index+8,11));
        this.state.player.loadVideoById(this.props.videoId);
    }
    submitTime(){
        let starttime=1000*(this.state.startMin*60+this.state.startSec);
        let endtime=1000*(this.state.endMin*60+this.state.endSec);
        this.props.changeVideoTime(starttime,endtime);
    }
    onChangeStartMin(event){
        if(event.target.value=='' || event.target.value.match(/^[0-9]$|^[0-9][0-9]$/))
            this.setState({startMin: Math.round(event.target.value)});
    }
    onChangeStartSec(event){
        if(event.target.value=='' || event.target.value.match(/^[0-9]$|^[0-5][0-9]$/))
            this.setState({startSec: Math.round(event.target.value)});
    }
    onChangeEndMin(event){
        if(event.target.value=='' || event.target.value.match(/^[0-9]$|^[0-9][0-9]$/))
            this.setState({endMin: Math.round(event.target.value)});
    }
    onChangeEndSec(event){
        if(event.target.value=='' || event.target.value.match(/^[0-9]$|^[0-5][0-9]$/))
            this.setState({endSec: Math.round(event.target.value)});
    }
    quitClick(){
        if(this.state.startMin*60+this.state.startSec<=this.state.endMin*60+this.state.endSec){
            $('.dialogPlayerWord3').addClass('hide');
            this.submitTime();
            this.props.quitClick();
        }
        else
            $('.dialogPlayerWord3').removeClass('hide');
    }
    loadVideo(){
        if(this.state.startMin*60+this.state.startSec<this.state.endMin*60+this.state.endSec){
            if(this.state.startMin*60+this.state.startSec==0)//似乎startSeconds=0時，不能運作
                this.state.player.loadVideoById({
                    'videoId':this.props.videoId,
                    'startSeconds':0.001,
                    'endSeconds':this.state.endMin*60+this.state.endSec,
                    'suggestedQuality':'small'
                });
            else
                this.state.player.loadVideoById({
                    'videoId':this.props.videoId,
                    'startSeconds':this.state.startMin*60+this.state.startSec,
                    'endSeconds':this.state.endMin*60+this.state.endSec,
                    'suggestedQuality':'small'
                });
        }
    }
    seekTo(time){
        this.state.player.seekTo(time,false);
    }
    play(){
        this.state.player.playVideo();
    }
    pause(){
        this.state.player.pauseVideo();
    }
    stop(){
        this.state.player.stopVideo();
    }
    render(){
        const feature = {
            height: '293',
            width: '480',
            playerVars: { // https://developers.google.com/youtube/player_parameters 
                autoplay: 0,
                fs:0
            }
        };
        return(
                <div className={this.props.show?'dialogPlayer dialog active':'dialogPlayer dialog'}>
                    <YouTube
                        id={'player'}
                        videoId={this.props.videoId}
                        opts={feature}
                        onReady={this.onPlayerReady.bind(this)}
                    />
                    <span className={'dialogPlayer-inputform'}>
                        <h3 className={'dialogPlayerWord'}>影片網址:</h3>
                        <input id={'video-input'} className={'word-input'} onChange={this.onChange.bind(this)} value={this.state.videoUrl} placeholder='請輸入影片網址'/>
                    </span>
                    <span className={'dialogPlayer-inputform'}>
                        <h3 className={'dialogPlayerWord'}>字幕總時間:</h3>
                        <h3 className={'dialogPlayerWord'}>{Math.floor(this.props.wordTime/1000/60)+' 分 '+Math.round(this.props.wordTime/1000%60*100)/100+' 秒 '}</h3>
                    </span>
                    <span className={'dialogPlayer-inputform'}>
                        <h3 className={'dialogPlayerWord'}>音樂開始:</h3>
                        <input id={'video-input-startmin'} className={'word-input time-input'} 
                            onChange={this.onChangeStartMin.bind(this)}
                            value={this.state.startMin}/>
                        <h3 className={'dialogPlayerWord dialogPlayWord2'}>分</h3>
                        <input id={'video-input-startsec'} className={'word-input time-input'}
                            onChange={this.onChangeStartSec.bind(this)}
                            value={this.state.startSec}/>
                        <h3 className={'dialogPlayerWord dialogPlayWord2'}>秒</h3>
                    </span>
                    <span className={'dialogPlayer-inputform'}>
                        <h3 className={'dialogPlayerWord'}>音樂結束:</h3>
                        <input id={'video-input-endmin'} className={'word-input time-input'} 
                        onChange={this.onChangeEndMin.bind(this)}
                        value={this.state.endMin}/>
                        <h3 className={'dialogPlayerWord dialogPlayWord2'}>分</h3>
                        <input id={'video-input-endsec'} className={'word-input time-input'}
                            onChange={this.onChangeEndSec.bind(this)}
                            value={this.state.endSec}/>
                        <h3 className={'dialogPlayerWord dialogPlayWord2'}>秒</h3>
                    </span>
                    <h3 className={'dialogPlayerWord3 hide'}>開始時間需小於等於結束時間</h3>
                    <button className={'dialogLoadBtn dialogPlayerQuitBtn'} onClick={this.quitClick.bind(this)}>Quit</button>
                </div>
            );
    }
}

export default PlayerDialog;
