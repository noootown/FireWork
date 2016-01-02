'use strict';
import React,{Component}  from 'react';
import ReactDOM from 'react-dom';
import ReactReorderable from './react-reorderable.min.js';
class SideBar extends React.Component{
    constructor(){
        super();
        this.state={items: [], text: ''};
    }

    handleUpdateItems(wordItems){
        this.setState({items:wordItems});
    }

    onChange(e){
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var nextItems;
        if(this.state.text.match(/\s*/)[0]==this.state.text)//判斷是否為空白鍵字串或者是空字串
            return;
        else
            nextItems = this.state.items.concat([this.state.text]);
        this.setState({items: nextItems, text:''});
    }

    handleMakeClick(){
        this.props.sidebarMakeClick(this.state.items);
    }

    handleLoadClick(){
        this.props.sidebarLoadClick();
    }

    handleHelpClick(){
        this.props.sidebarHelpClick();
    }

    handleVideoClick(){
        this.props.sidebarVideoClick(this.state.items.length*8000+1500);
    }

    render(){
        return (
                <div>
                <div className={'sideBarBtn active'} onClick={this.props.toggleSidebar}>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                </div>
                <div id={'sidePanel'} className={'sidePanel active'}>
                <WordListAll 
                items={this.state.items} 
                text={this.state.text}
                updateItems={this.handleUpdateItems.bind(this)} 
                onSubmit={this.handleSubmit.bind(this)} 
                onChange={this.onChange.bind(this)}/>
                <a className={'sidePanelBtn'} onClick={this.handleMakeClick.bind(this)}>{'Make'}</a>
                <a className={'sidePanelBtn'} onClick={this.handleLoadClick.bind(this)}>{'Load'}</a>
                <a className={'sidePanelBtn'} onClick={this.handleVideoClick.bind(this)}>{'Music'}</a>
                </div>
                </div>
               );
    }
}
class WordListContainer extends Component{
    handleRemoveBtnClick(which){
        this.props.items.splice(which-1,1);//把選中的字串移除
        this.props.updateItems(this.props.items);
    }

    render(){
        var createItem = function(text, index) {
            return <Word key={index + text} text={text} btnClick={this.handleRemoveBtnClick.bind(this)}/>;
        }.bind(this);
        return(
                <div className={'wordListContainer'}>
                <ReactReorderable handle={'.draggable-handle'} mode={'list'} 
                onDragStart={function(){}}
                onDrop={function(data){
                    var dataToItem=function(data){
                        return data.props.text;
                    };
                    this.props.updateItems(data.map(dataToItem));
                }.bind(this)}
                onChange={function(){}}
                >
                {this.props.items.map(createItem)}
                </ReactReorderable>
                </div>
              );
    }
}
class Word extends Component{
    handleRemoveBtnClick(){
        var which=$(ReactDOM.findDOMNode(this)).parent().data('reorderableKey').substr(5);//get which node
        this.props.btnClick(which);
    }

    render() {
        return (
                <div className={'draggable-element'}>
                <div className={'draggable-handle'}>{this.props.text}</div>
                <CrossBtn updateItems={this.props.updateItems} btnClick={this.handleRemoveBtnClick.bind(this)}/>
                </div>
               );
    }
}
class CrossBtn extends Component{
    render(){
        return (
                <img src={'img/cross.png'} className={'img-remove'} onClick={this.props.btnClick.bind(this)}></img>
               );
    }
}
class WordListAll extends Component{
    render() {
        return (
                <div className={'wordListAll'}>
                <h3 className={'sidePanelTitle'}>寫下想說的話</h3>
                <WordListContainer items={this.props.items} text={this.props.text} updateItems={this.props.updateItems.bind(this)}/>
                <form id={'word-inputform'} onSubmit={this.props.onSubmit.bind(this)}>
                <input id={'showword-input'} className={'word-input'}  onChange={this.props.onChange.bind(this)} value={this.props.text} placeholder='寫下想說的話'/>
                <button className={'sidePanelBtn enterBtn'}>{'輸入'}</button>
                </form>
                </div>
               );
    }
}

export default SideBar;
