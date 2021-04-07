cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.angle += this.rotateSpeed;
    },
});
