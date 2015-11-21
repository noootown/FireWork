var MainCanvas=React.createClass({
    getInitialState:function(){
        return {
            fiworkAll:new fireWorkManager(),
            wordAll:new wordManager(),
        
        };
    },
    componentDidMount:function(){
    },
    render:function(){
        return(
                <canvas id={'mainCanvas'} height={$(window).height()} width={$(window).width()}>
              );
    }
});
