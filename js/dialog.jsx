'use strict';
import React,{Component}  from 'react';
export class SaveDialog extends React.Component{
    closeDialog(){
        $('.dialogSaveOrAbort').removeClass('active');
    }
    getBtnBack(){
        setTimeout(function(){
            $('.optionBtn').removeClass('hide');
        },600);
    }
    render(){
        return(
                <div className={'dialogSaveOrAbort dialog'}>
                <h3 className={'dialogTitle'}>Choose</h3>
                <div className={'dialogBtnDiv'}>
                <button id={'dialogSaveSaveBtn'} className={'optionBtn'} onClick={this.props.saveClick}>Save</button>
                <button id={'dialogSaveReplayBtn'} className={'optionBtn'} onClick={this.props.replayClick}>Replay</button>
                <button className={'optionBtn'} onClick={this.props.againClick}>Again</button>
                <button id={'dialogSaveContinueBtn'} className={'optionBtn'} onClick={this.props.continueClick}>Continue</button>
                <button className={'optionBtn'} onClick={this.props.quitClick}>Quit</button>
                </div>
                </div>
              );
    }
}
export class LoadDialog extends Component{
    render(){
        return(
                <div className={'dialogLoad dialog'}>
                <h3 className={'dialogTitle dialogLoadTitle'}>Load</h3>
                <button className={'dialogLoadBtn dialogLoadRemoteBtn'} onClick={this.props.remoteLoadClick}>Load</button>
                <h3 className={'dialogLoadSmallTitle dialogLoadRemoteTitle'}>Remote</h3>
                <span className={'dialogLoad-inputform'}>
                <h3 className={'dialogLoadWord'}>Card name:</h3>
                <input id={'cardName-input'} className={'word-input'}/>
                </span>
                <span className={'dialogLoad-inputform'}>
                <h3 className={'dialogLoadWord'}>Password:</h3>
                <input id={'password-input'} className={'word-input'}/>
                </span>
                <h3 className={'dialogLoadSmallTitle'}>Local</h3>
                <span className={'dialogLoad-inputform'}>
                <h3 className={'dialogLoadWord dialogLoadLocalWord dialogLoadNoFile'}>No Saved File</h3>
                <button className={'dialogLoadBtn dialogLoadLocalBtn dialogLoadNoFile'} onClick={this.props.localLoadClick}>Load</button>
                </span>
                <button className={'dialogLoadBtn dialogLoadQuitBtn'} onClick={this.props.quitClick}>Quit</button>

                </div>
                );
    }
}
export class UploadDialog extends Component{
    closeDialog(){
        $('.dialogUpload').removeClass('active');
    }
    render(){
        return(
                <div className={'dialogUpload dialog'}>
                <h3 className={'dialogTitle dialogUploadTitle'}>Upload</h3>
                <span className={'dialogUploadSpan'}>
                <h3 className={'dialogUploadWord'}>Card name:</h3>
                <input id={'uploadCardName-input'} className={'word-input'}/>
                </span>
                <span className={'dialogUploadSpan'}>
                <h3 className={'dialogUploadWord'}>Password:</h3>
                <input id={'uploadPassword-input'} className={'word-input'}/>
                </span>
                <span className={'dialogUploadBtnSpan'}>
                <button className={'dialogUploadBtn dialogUploadQuitBtn'} onClick={this.props.quitClick}>Don't Upload</button>
                <button className={'dialogUploadBtn dialogUploadUploadBtn'} onClick={this.props.uploadClick}>Upload</button>
                </span>
                </div>
              );
    }
}
