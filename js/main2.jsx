var Main=React.createClass({
    componentDidMount:function(){
    },
    render:function(){
        return(
                <div className={'main'}>
                <MainCanvas/>
                <Navbar/>
                <Timer/>
                <SideBar/>
                <ShowWord/>
                <StartActionInstruction/>
                <StartActionInstructionWords/>
                </div>
              );
    }
});
var MainCanvas=React.createClass({
    render:function(){
        return(
                <canvas id={'mainCanvas'} height={$(window).height()} width={$(window).width()}></canvas>
              );
    }
});

var Timer=React.createClass({
    render:function(){
        return(
                <div className={'timer'}>
                <h1 class="time-second time-second0">GO</h1>
                <h1 class="time-second time-second1">1</h1>
                <h1 class="time-second time-second2">2</h1>
                <h1 class="time-second time-second3">3</h1>
                </div>
              );
    }
});
var ShowWord=React.createClass({
    render:function(){
        return(
                <h1 class="showWord">123123123</h1>
              );
    }
});
var StartActionInstructionWords=React.createClass({
    render:function(){
        return(
                <h3 class="startActionInstructionWords">按P 停止/選單</h3>
              );
    }
});
var StartActionInstruction=React.createClass({
    render:function(){
        return(
                <div class="startActionInstruction">
                <img src="img/rec.png" class="img-rec"></img>
                </div>
              );
    }
});

var Navbar=React.createClass({
    render:function(){
        return(
                <div className="navbar">
                <div className="title">
                <a href="https://github.com/i314i/RippleDot">Firework</a>
                </div>
                <div className="link">
                <a href="https://noootown.wordpress.com/">Blog</a>
                <a href="https://github.com/i314i">Github</a>
                </div>
                </div>
              );
    }
});
ReactDOM.render(<Main/>, document.getElementById('myBody'));
