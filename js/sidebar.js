'use strict'
var WordListContainer = React.createClass({//裝Word[的container]
    handleRemoveBtnClick:function(which){
        this.props.items.splice(which-1,1);//把選中的字串移除
        this.props.updateItems(this.props.items);
    },
    render:function(){
        var self=this;
        var createItem = function(text, index) {
            return <Word key={index + text} text={text} btnClick={self.handleRemoveBtnClick}/>;
        };
        return(
                <ReactReorderable handle={'.draggable-handle'} mode={'list'} 
                onDragStart={function(data){}}
                onDrop={function(data){
                    var dataToItem=function(data,index){
                        return data.props.text;
                    }
                    self.props.updateItems(data.map(dataToItem));
                }}
                onChange={function(data){}}
                >
                {this.props.items.map(createItem)}
                </ReactReorderable>
              );
    }
});
var Word = React.createClass({//顯示的字
    handleRemoveBtnClick:function(){
        var which=$(this.getDOMNode()).parent().data("reorderableKey").substr(5);//get which node
        this.props.btnClick(which);
    },
    render: function() {
        return (
                <div className={"draggable-element"}>
                <div className={"draggable-handle"}>{this.props.text}</div>
                <CrossBtn updateItems={this.props.updateItems} btnClick={this.handleRemoveBtnClick}/>
                </div>
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
    handleUpdateItems: function(wordItems){
        this.setState({items:wordItems});
    },
    getInitialState: function() {
        return {items: [], text: ''};
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

        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },
    render: function() {
        return (
                <div>
                <h3>想說的話</h3>
                <WordListContainer items={this.state.items} text={this.state.text} updateItems={this.handleUpdateItems}/>
                <form onSubmit={this.handleSubmit}>
                <input id={'word-input'}  onChange={this.onChange} value={this.state.text} />
                <button>{'輸入'}</button>
                </form>
                </div>
               );
    }
});


ReactDOM.render(<WordListAll />, document.getElementById('sidePanel'));


