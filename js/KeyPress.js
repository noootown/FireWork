function InputManager(){
    this.events={};
    this.map={
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
k}

InputManager.prototype.on = function (event, callback) {
    if (!this.events[event])
        this.events[event] = [];
    this.events[event].push(callback);
};

InputManager.prototype.getFunc = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        _.each(callbacks,function (callback) {
            callback(data);
        });
    }
};

InputManager.prototype.bindEvent=function(){
    var self=this;
    document.addEventListener("keydown", function (event) {
        var modifiers = event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;//加了這些key就不行
        var mapped=self.map[event.which];

        if (!modifiers) {
            if (mapped !== undefined) {
                event.preventDefault();
                self.getFunc("changeType", mapped);
            }
        }

    });
};

