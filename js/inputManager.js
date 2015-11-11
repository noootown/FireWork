'use strict'
function inputManager(fireworkToInput){
    var self=this;
    this.firework=fireworkToInput;
    this.events={};
    this.map={

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
    this.manageInput=function(event){
        var inputCharacter=function(key){
            var wordInput = $('#word-input');
            var nowValue = wordInput.val();
            wordInput.val(nowValue+String.fromCharCode(key));
            
            var event = new Event('input', { bubbles: true });//trigger onChange event
            document.getElementById('word-input').dispatchEvent(event);
        }

        if(event=='shoot')
            return function(key){
                if(fireworkAll!==undefined){
                    if(!sideBarOpen)
                        self.firework.shoot(self.map[key]);
                    else if($('#word-input').is(':focus'))
                        inputCharacter(key);
                }
            };
        else if(event=='switchRocket')
            return function(key){
                if(fireworkAll!==undefined){
                    if(!sideBarOpen)
                        self.firework.switchRocket();
                    else if($('#word-input').is(':focus'))
                        inputCharacter(key);
                }
            };
    }
}

inputManager.prototype.on = function (event, callback) {
    if (!this.events[event])
        this.events[event] = [];
    this.events[event].push(callback);
    console.log(this.events[event]);
};

inputManager.prototype.getFunc = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        _.each(callbacks,function (callback) {
            callback(data);
        });
    }
};

inputManager.prototype.bindEvent=function(){
    var self=this;
    document.addEventListener("keydown", function (event) {
        var modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
        if (!modifiers) {
            if (self.map[event.which] !== undefined) {
                event.preventDefault();
                self.getFunc("shoot",event.which);
            }
        }
        if(!modifiers && event.which==32)
            self.getFunc("switchRocket",event.which);
    });
};

