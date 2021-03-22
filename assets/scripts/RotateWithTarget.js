cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    update (dt) {
        this.node.angle = -this.targetNode.angle;
    },
});
