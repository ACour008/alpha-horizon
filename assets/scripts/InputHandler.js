cc.Class({
    extends: cc.Component,

    start() {
        this.keyPressed = false;
        this.forward = false,
        this.select = false,
        this.rotate = 0;
        this.request = false;
        this.keys = new Map();
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    /* event callback for when key is pressed. */
    onKeyDown(event) {
        this.keys.set(event.keyCode, true);

        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.forward = true;
                break;
            case cc.macro.KEY.a:
                this.rotate = 1;
                break;
            case cc.macro.KEY.d:
                this.rotate = -1;
                break;
            case cc.macro.KEY.tab:
                this.select = true;
                break;
            case cc.macro.KEY.esc:
                this.escape = true;
                break;
            case cc.macro.KEY.r:
                this.request = true;
                break;
        }
    },

    /* event callback for when key is released. */
    onKeyUp(event) {
        this.keys.delete(event.keyCode);

        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.forward = false;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
                this.rotate = 0;
                break;
            case cc.macro.KEY.tab:
                this.select = false;
                break;
            case cc.macro.KEY.esc:
                this.escape = false;
                break;
            case cc.macro.KEY.r:
                this.request = false;
                break;
        }
    },
});
