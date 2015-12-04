'use strict';
import React,{Component}  from 'react';
export class SaveDialog extends React.Component{
    render(){
        return(
                <div className={'dialogSaveOrAbort dialog'}>
                <h3 className={'dialogTitle'}>Choose</h3>
                <div className={'dialogBtnDiv'}>
                    <button className={'optionBtn'} onClick={this.props.saveClick}>save</button>
                    <button className={'optionBtn'} onClick={this.props.againClick}>again</button>
                    <button className={'optionBtn'} onClick={this.props.continueClick}>continue</button>
                    <button className={'optionBtn'} onClick={this.props.quitClick}>quit</button>
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
                <input id={'account-input'} className={'word-input'} value={this.props.text}/>
                </span>
                <span className={'dialogLoad-inputform'}>
                <h3 className={'dialogLoadWord'}>Password:</h3>
                <input id={'password-input'} className={'word-input'} value={this.props.text}/>
                </span>
                <h3 className={'dialogLoadSmallTitle'}>Local</h3>
                <span className={'dialogLoad-inputform'}>
                <h3 className={'dialogLoadWord dialogLoadLocalWord'}>Abracadabra</h3>
                <button className={'dialogLoadBtn dialogLoadLocalBtn'} onClick={this.props.localLoadClick}>Load</button>
                </span>
                <button className={'dialogLoadBtn dialogLoadQuitBtn'} onClick={this.props.quitClick}>Quit</button>

                </div>
              );
    }
}
