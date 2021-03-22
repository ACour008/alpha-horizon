cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label = this.node.getComponent(cc.Label);
    },

    update (dt) {
        let x = Math.floor(this.playerNode.x);
        let y = Math.floor(this.playerNode.y);
        this.label.string = `(${x}, ${y})`;
    },
});
