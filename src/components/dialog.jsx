'use strict';
import React,{Component}  from 'react';
export class SaveDialog extends React.Component{
    render(){
        let continueHideClass=this.props.showType===2?'optionBtn hide':'optionBtn';
        return(
                <div className={this.props.show?'dialogSave dialog active':'dialogSave dialog'}>
                    <h3 className={'dialogTitle'}>Choose</h3>
                    <div className={'dialogBtnDiv'}>
                        <button id={'dialogSaveSaveBtn'} className={'optionBtn'} onClick={this.props.saveClick}>Save</button>
                        <button id={'dialogSaveReplayBtn'} className={'optionBtn'} onClick={this.props.replayClick}>Replay</button>
                        <button id={'dialogSaveAgainBtn'}className={'optionBtn'} onClick={this.props.againClick}>Restart</button>
                        <button id={'dialogSaveContinueBtn'} className={continueHideClass} onClick={this.props.continueClick}>Continue</button>
                        <button id={'dialogSaveQuitBtn'}className={'optionBtn'} onClick={this.props.quitClick}>Quit</button>
                    </div>
                </div>
              );
    }
}
export class LoadDialog extends Component{
    render(){
        return(
                <div className={this.props.show?'dialogLoad dialog active':'dialogLoad dialog'}>
                     <h3 className={'dialogTitle dialogLoadTitle'}>Load</h3>
                     <button className={'dialogLoadBtn dialogLoadRemoteBtn'} onClick={this.props.remoteLoadClick}>Load</button>
                     <h3 className={'dialogLoadSmallTitle dialogLoadRemoteTitle'}>Remote</h3>
                     <span className={'dialogLoad-inputform'}>
                         <h3 className={'dialogLoadWord'}>Card name:</h3>
                         <input id={'cardName-input'} className={'word-input'}/>
                     </span>
                     <span className={'dialogLoad-inputform'}>
                         <h3 className={'dialogLoadWord'}>Password:</h3>
                         <input type="password" id={'password-input'} className={'word-input'}/>
                     </span>
                     <h3 className={'dialogLoadSmallTitle'}>Local</h3>
                     <span className={'dialogLoad-inputform'}>
                        {
                        this.props.time===null?
                            <h3 className={'dialogLoadWord dialogLoadLocalWord dialogLoadNoFile'}>No Saved File</h3>
                            :
                            <h3 className={'dialogLoadWord dialogLoadLocalWord'}>{this.props.time}</h3>
                        }
                        {
                        this.props.time===null?
                            <button className={'dialogLoadBtn dialogLoadLocalBtn dialogLoadNoFile'} onClick={this.props.localLoadClick}>Load</button>
                            :
                            <button className={'dialogLoadBtn dialogLoadLocalBtn'} onClick={this.props.localLoadClick}>Load</button>
                        }
                     </span>
                     <button className={'dialogLoadBtn dialogLoadQuitBtn'} onClick={this.props.quitClick}>Quit</button>
                </div>
                );
    }
}
export class UploadDialog extends Component{
    render(){
        return(
                <div className={this.props.show?'dialogUpload dialog active':'dialogUpload dialog'}>
                    <h3 className={'dialogTitle dialogUploadTitle'}>Upload</h3>
                    <span className={'dialogUploadSpan'}>
                        <h3 className={'dialogUploadWord'}>Card name:</h3>
                        <input id={'uploadCardName-input'} className={'word-input'}/>
                    </span>
                    <span className={'dialogUploadSpan'}>
                        <h3 className={'dialogUploadWord'}>Password:</h3>
                        <input type="password" id={'uploadPassword-input'} className={'word-input'}/>
                    </span>
                    <span className={'dialogUploadBtnSpan'}>
                        <button className={'dialogUploadBtn dialogUploadQuitBtn'} onClick={this.props.quitClick}>Don't Upload</button>
                        <button className={'dialogUploadBtn dialogUploadUploadBtn'} onClick={this.props.uploadClick}>Upload</button>
                    </span>
                </div>
              );
    }
}
export class ReplayDialog extends React.Component{
    render(){
        return(
                <div className={this.props.show?'dialogReplay dialog active':'dialogReplay dialog'}>
                    <h3 className={'dialogTitle'}>Choose</h3>
                    <div className={'dialogBtnDiv'}>
                        <button id={'dialogReplayReplayBtn'} className={'optionBtn'} onClick={this.props.replayClick}>Replay</button>
                        <button id={'dialogReplayQuitBtn'}className={'optionBtn'} onClick={this.props.quitClick}>Quit</button>
                    </div>
                </div>
              );
    }
}
export class AboutDialog extends React.Component{
    render(){
        return(
                <div className={this.props.show?'dialogAbout dialog active':'dialogAbout dialog'}>
                    <h3 className={'dialogAboutTitle dialogAboutBigTitle'}>Firework</h3>
                    <span className={'dialogAboutSpan'}>
                        <h3 className={'dialogAboutTitle'}>Author:</h3>
                        <h3 className={'dialogAboutContent'}>noootown（沒一村）</h3>
                    </span>
                    <span className={'dialogAboutSpan'}>
                        <h3 className={'dialogAboutTitle'}>Github:</h3>
                        <a className={'dialogAboutLink'} href="https://github.com/noootown/FireWork" target="_blank">noootown</a>
                    </span>
                    <span className={'dialogAboutSpan'}>
                        <h3 className={'dialogAboutTitle'}>Blog:</h3>
                        <a className={'dialogAboutLink'} href="https://noootown.wordpress.com/" target="_blank">沒一村生活點滴</a>
                    </span>
                    <button className={'dialogAboutBtn dialogAboutQuitBtn'} onClick={this.props.quitClick}>Quit</button>
                </div>
              );
    }
}
export class HelpDialog extends React.Component{
    render(){
        return(
            <div className={this.props.show?'dialogHelp dialog active':'dialogHelp dialog'}>
                <h3 className={'dialogAboutTitle dialogAboutBigTitle'}>Help</h3>
                <ol className={'dialogHelpWords'}>
                    <li>按<span style={{color:'#FF0000'}}> 英文字鍵 </span>和<span style={{color:'#FF0000'}}> 數字鍵 </span>可以發射煙火。</li>
                    <li>按<span style={{color:'#FF0000'}}> 空白鍵 </span>可以切換一般煙火和英數字。</li>
                    <li>按<span style={{color:'#FF0000'}}> , </span>可以開關煙火柱。</li>
                    <li>按<span style={{color:'#FF0000'}}> F2 </span>可以暫停動畫，這時輸入任何鍵都可以將煙火存入暫存。再按一次<span style={{color:'#FF0000'}}> F2 </span>可以同時發射所有暫存的煙火。</li>
                    <li>按<span style={{color:'#FF0000'}}> F4 </span>可以叫出選單。</li>
                    <li>選單可輸入<span style={{color:'#FF0000'}}>想說的話</span>，即可顯示字幕。此外，可以用滑鼠拖曳調整字幕順序。</li>
                    <li>Firework提供兩種儲存方式，如儲存在<span style={{color:'#FF0000'}}> Local</span>，則下次以同台電腦再登入網站，依然可以播放最近的存檔。如儲存在<span style={{color:'#FF0000'}}> Remote</span>，輸入 <span style={{color:'#FF0000'}}> Card Name </span>和<span style={{color:'#FF0000'}}> Password</span>，即可欣賞 Firework 動畫。</li>
                    <span style={{color:'#FF0000',width:'150px',position:'absolute',left:'50%',margin:'20px 0 0 -60px',fontSize:'25px'}}>Have fun!!!</span>
                </ol>
                <button className={'dialogAboutBtn dialogHelpQuitBtn'} onClick={this.props.quitClick}>Quit</button>
            </div>
        );
    }
}
export class HintDialog extends React.Component{
    render(){
        return(
                <div className={this.props.show?'dialogHint dialog active':'dialogHint dialog'}>
                    <h3 className={'dialogAboutTitle dialogAboutBigTitle'}>Hint</h3>
                    <ol className={'dialogHelpWords'}>
                        <li>Firework 支援<span style={{color:'#FF0000'}}> Chrome </span>和<span style={{color:'#FF0000'}}> Firefox </span>。</li>
                        <li>善用 <span style={{color:'#FF0000'}}> F2 </span>和<span style={{color:'#FF0000'}}> , </span>鍵可以製作同時引爆的煙火，如果切換到<span style={{color:'#FF0000'}}> 英數字</span>，還可以製作想要的單字。</li>
                        <li><span style={{color:'#FF0000'}}> 請勿同時點擊太多煙火</span>，可能會造成動畫 lag 。此外，由於Firework 繪圖需要大量CPU資源，過多的分頁也可能導致動畫 lag 。</li>
                        <li>欲觀看範例，可點選 <span style={{color:'#FF0000'}}> load</span>，並在<span style={{color:'#FF0000'}}> Card Name </span>和<span style={{color:'#FF0000'}}> Password </span>中皆輸入<span style={{color:'#FF0000'}}> template </span>即可。</li>
                    <span style={{color:'#FF0000',width:'150px',position:'absolute',left:'50%',margin:'20px 0 0 -60px',fontSize:'25px'}}>Have fun!!!</span>
                    </ol>
                    <button className={'dialogAboutBtn dialogHelpQuitBtn'} onClick={this.props.quitClick}>Quit</button>
                </div>
              );
    }
}
