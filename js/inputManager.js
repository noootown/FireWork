'use strict';
function inputManager(fireworkToInput){
    var self=this;
    this.firework=fireworkToInput;
    this.fireworkMap={

        //1~8
        49:1, 
        50:2,
        51:3,
        52:4,
        53:5,
        54:6,
        55:7,
        56:8,

        97:1,
        98:2,
        99:3,
        100:4,
        101:5,
        102:6,
        103:7,
        104:8
    };
    this.bindEvent();
    this.keyDownFunction={
        inputCharacter:
            function(key){
                var wordInput = $('#word-input');
                var nowValue = wordInput.val();
                wordInput.val(nowValue+String.fromCharCode((96 <= key && key <= 105) ? key-48 : key));

                var event = new Event('input', { bubbles: true });//trigger onChange event
                document.getElementById('word-input').dispatchEvent(event);
            },
        shoot:
            function(key){
                if(fireworkAll!==undefined){
                    if($('#word-input').is(':focus'))
                        self.keyDownFunction['inputCharacter'](key);
                    else
                        self.firework.shoot(self.fireworkMap[key]);
                }
            },
        switchRocket:
            function(key){
                if(fireworkAll!==undefined){
                    if($('#word-input').is(':focus'))
                        self.keyDownFunction['inputCharacter'](key);
                    else    
                        self.firework.switchRocket();
                }
            },
        stopRecord:
            function(key){
                if(!$('#word-input').is(':focus')){
                    clearScreen();
                    if(startAction)startAction=false;
                }
            }
    };
}

inputManager.prototype.execFunc = function (event, data) {
    var callbacks = this.keyDownFunction[event];
    callbacks(data);
};

inputManager.prototype.bindEvent=function(){
    var self=this;
    document.addEventListener('keydown', function (event) {
        var modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
        if (!modifiers) {
            if (self.fireworkMap[event.which] !== undefined) {
                event.preventDefault();
                self.execFunc('shoot',event.which);
            }
        }
        if(!modifiers && event.which==32)
            self.execFunc('switchRocket',event.which);
        if(!modifiers && event.which==80)
            self.execFunc('stopRecord',event.which);
    });
};
