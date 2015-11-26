'use strict';
import React,{Component}  from 'react';
import ReactReorderable from './react-reorderable.min.js';
class SideBar extends Component{
    constructor(){
        super();
        this.state={items: [], text: '',sideBarOpen:true, colors:[]};
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

    handleSlideClick(){
        this.state.sideBarOpen=!this.state.sideBarOpen;
        clearScreen();
    }

    handlePreviewClick(){
        this.handleSlideClick();
        wordAll.words=this.state.items;
        setTimeout(function(){$('.time-second3').addClass('active');},500);
        setTimeout(function(){$('.time-second2').addClass('active');},2500);
        setTimeout(function(){$('.time-second1').addClass('active');},4500);
        setTimeout(function(){$('.time-second0').addClass('active');},6500);
        setTimeout(function(){$('.time-second3').removeClass('active');},1500);
        setTimeout(function(){$('.time-second2').removeClass('active');},3500);
        setTimeout(function(){$('.time-second1').removeClass('active');},5500);
        setTimeout(function(){$('.time-second0').removeClass('active');},7500);
        setTimeout(function(){startAction=true;wordAll.draw();},9000);//delay time
    }

    render(){
        return (
                <div>
                <div className={'sideBarBtn active'} onClick={this.handleSlideClick}>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                <span className={'sideBarBar active'}></span>
                </div>
                <div id={'sidePanel'} className={'sidePanel active'}>
                <WordListAll 
                items={this.state.items} 
                text={this.state.text}
                colors={this.state.colors}
                updateItems={this.handleUpdateItems} 
                onSubmit={this.handleSubmit} 
                onChange={this.onChange}/>
                <PreviewBtn handlePreviewClick={this.handlePreviewClick}/>
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
        this.props.updateItems(this.colors.items);
    }

    render(){
        var self=this;
        var createItem = function(text, index) {
            return <Word key={index + text} text={text} btnClick={self.handleRemoveBtnClick}/>;
        };
        return(
                <ReactReorderable handle={'.draggable-handle'} mode={'list'} 
                onDragStart={function(){}}
                onDrop={function(data){
                    var dataToItem=function(data){
                        return data.props.text;
                    };
                    self.props.updateItems(data.map(dataToItem));
                }}
                onChange={function(){}}
                >
                {this.props.items.map(createItem)}
                </ReactReorderable>
              );
    }
}
class Word extends Component{
    handleRemoveBtnClick(){
        var which=$(this.getDOMNode()).parent().data('reorderableKey').substr(5);//get which node
        this.props.btnClick(which);
    }

    render() {
        return (
                <div className={"draggable-element"}>
                <div className={"draggable-handle"}>{this.props.text}</div>
                <ColorBox />
                <CrossBtn updateItems={this.props.updateItems} btnClick={this.handleRemoveBtnClick}/>
                </div>
               );
    }
}
class ColorBox extends Component{
    constructor(){
        super();
        this.state={color:0};
    }

    handleBtnClick(){
        this.setState({color:(this.state.color+1)%6});
    }

    render(){
        return (
                <span className={'colorBox'} onClick={this.handleBtnClick}></span>
               );
    }
}
class CrossBtn extends Component{
    render(){
        return (
                <img src={'img/cross.png'} className={'img-remove'} onClick={this.props.btnClick}></img>
               );
    }
}
class WordListAll extends Component{
    render() {
        return (
                <div>
                <h3>想說的話</h3>
                <WordListContainer items={this.props.items} text={this.props.text} updateItems={this.props.updateItems} colors={this.props.colors}/>
                <form onSubmit={this.props.onSubmit}>
                <input id={'word-input'}  onChange={this.props.onChange} value={this.props.text} />
                <button>{'輸入'}</button>
                </form>
                </div>
               );
    }
}
class PreviewBtn extends Component{
    render(){
        return (
                <button onClick={this.props.handlePreviewClick}>{'錄製'}</button>
               );
    }
}



export default SideBar;
