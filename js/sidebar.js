'use strict';
var SideBar =React.createClass({
    handleUpdateItems: function(wordItems){
        this.setState({items:wordItems});
    },
    getInitialState: function() {
        return {items: [], text: '',sideBarOpen:true, colors:[]};
    },
    handleColorUpdate:function(updateColors){
        this.setState({colors:updateColors});
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems;
        if(this.state.text.match(/\s*/)[0]==this.state.text)//判斷是否為空白鍵字串或者是空字串
            return;
        else
            nextItems = this.state.items.concat([this.state.text]);

        this.setState({items: nextItems, text:''});
    },
    handleSlideClick:function(){
        this.state.sideBarOpen=!this.state.sideBarOpen;
        clearScreen();
    },
    handlePreviewClick:function(){
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

    },
    render:function(){
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
});
var WordListContainer = React.createClass({//裝Word的container
    handleRemoveBtnClick:function(which){
        this.props.items.splice(which-1,1);//把選中的字串移除
        this.props.updateItems(this.props.items);
        this.props.colors.splice(which-1,1);//把選中的顏色移除
        this.props.updateItems(this.colors.items);
    },
    render:function(){
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
});
var Word = React.createClass({//顯示的字
    handleRemoveBtnClick:function(){
        var which=$(this.getDOMNode()).parent().data('reorderableKey').substr(5);//get which node
        this.props.btnClick(which);
    },
    render: function() {
        return (
                <div className={"draggable-element"}>
                <div className={"draggable-handle"}>{this.props.text}</div>
                <ColorBox />
                <CrossBtn updateItems={this.props.updateItems} btnClick={this.handleRemoveBtnClick}/>
                </div>
               );
    }
});

var ColorBox =React.createClass({
    getInitialState:function(){
        return {color:0};//0~6 white red orange yellow green blue purple
    },
    handleBtnClick:function(){
        this.setState({color:(this.state.color+1)%6});
    },
    render:function(){
        return (
                <span className={'colorBox'} onClick={this.handleBtnClick}></span>
               );
    }
});
var CrossBtn = React.createClass({//清除按鈕
    render:function(){
        return (
                <img src={'img/cross.png'} className={'img-remove'} onClick={this.props.btnClick}></img>
               );
    }
});

var WordListAll = React.createClass({
    render: function() {
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
});

var PreviewBtn =React.createClass({
    render:function(){
        return (
                <button onClick={this.props.handlePreviewClick}>{'錄製'}</button>
               );
    }
});



ReactDOM.render(<SideBar/>, document.getElementById('side'));



