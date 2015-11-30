'use strict';
import React,{Component}  from 'react';
class SaveDialog extends React.Component{
    render(){
        return(
                <div className={'dialogSaveOrAbort'}>
                <h3 className={'dialogTitle'}>Choose</h3>
                <div className={'dialogBtnDiv'}>
                    <button className={'optionBtn'} onClick={this.props.saveClick}>save</button>
                    <button className={'optionBtn'} onClick={this.props.againClick}>again</button>
                    <button className={'optionBtn'} onClick={this.props.saveClick}>continue</button>
                    <button className={'optionBtn'} onClick={this.props.quitClick}>quit</button>
                </div>
                </div>
              );
    }
}
export default SaveDialog;
