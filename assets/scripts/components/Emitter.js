cc.Class({
    extends: cc.Component,

    emitEvent(event, args) {
        console.log("Emitting event");
        this.node.emit(event, args);
    },

    register(event, callback, bind) {
        this.node.on(event, callback, bind);
    },

    deregister(event, callback, bind) {
        this.node.off(event, callback, bind);
    }
});
