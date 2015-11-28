'use strict';
import React,{Component}  from 'react';
import ReactDOM from 'react-dom';
import ReactReorderable from './react-reorderable.min.js';
class SideBar extends React.Component{
    constructor(){
        super();
        this.state={items: [], text: '', colors:[]};
    }

    handleUpdateItems(wordItems){
        this.setState({items:wordItems});
    }

    handleColorUpdate(updateColors){
        this.setState({colors:updateColors});
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

    handlePreviewClick(){
        this.props.toggleSideBar();
        this.props.setWords(this.state.items);
    }

    render(){
        return (
                <div>
                <div className={'sideBarBtn active'} onClick={this.props.toggleSideBar}>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                </div>
                <div id={'sidePanel'} className={'sidePanel active'}>
                <WordListAll 
                items={this.state.items} 
                text={this.state.text}
                colors={this.state.colors}
                updateItems={this.handleUpdateItems.bind(this)} 
                onSubmit={this.handleSubmit.bind(this)} 
                onChange={this.onChange.bind(this)}/>
                <PreviewBtn handlePreviewClick={this.handlePreviewClick.bind(this)}/>
                </div>
                </div>
               );
    }
}
class WordListContainer extends Component{
    handleRemoveBtnClick(which){
        this.props.items.splice(which-1,1);//把選中的字串移除
        this.props.updateItems(this.props.items);
        this.props.colors.splice(which-1,1);//把選中的顏色移除
        //this.props.updateItems(this.colors.items);
    }

    render(){
        var createItem = function(text, index) {
            return <Word key={index + text} text={text} btnClick={this.handleRemoveBtnClick.bind(this)}/>;
        }.bind(this);
        return(
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
              );
    }
}
class Word extends Component{
    handleRemoveBtnClick(){
        //var which=$(this.getDOMNode()).parent().data('reorderableKey').substr(5);//get which node
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
//class ColorBox extends Component{
    //constructor(){
        //super();
        //this.state={color:0};
    //}

    //handleBtnClick(){
        //this.setState({color:(this.state.color+1)%6});
    //}

    //render(){
        //return (
                //<span className={'colorBox'} onClick={this.handleBtnClick.bind(this)}></span>
               //);
    //}
//}
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
                <div>
                <h3>想說的話</h3>
                <WordListContainer items={this.props.items} text={this.props.text} updateItems={this.props.updateItems.bind(this)} colors={this.props.colors}/>
                <form onSubmit={this.props.onSubmit.bind(this)}>
                <input id={'word-input'}  onChange={this.props.onChange.bind(this)} value={this.props.text} />
                <button>{'輸入'}</button>
                </form>
                </div>
               );
    }
}
class PreviewBtn extends Component{
    render(){
        return (
                <button onClick={this.props.handlePreviewClick.bind(this)}>{'錄製'}</button>
               );
    }
}



export default SideBar;
