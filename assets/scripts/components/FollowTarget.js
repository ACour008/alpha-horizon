cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node
    },

    update (dt) {
        let targetPos = this.target.getPosition();
        let cameraCurrentPos = this.node.getPosition();
        
        // follow player using linear interpolation
        cameraCurrentPos.lerp(targetPos, 1, cameraCurrentPos);
        this.node.setPosition(cameraCurrentPos);
    },
});
