cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        parallax: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // CocosCreator makes this very inaccessible.
        this.mainOffset = this.getComponent(cc.Sprite).getMaterials()[0].effect._effect._technique._passes[0]._properties.mainOffset.value;
    },

    update (dt) {
        let targetPos = this.target.getPosition();
        let currentPos = this.node.getPosition();
        let size = this.node.getContentSize();

        // follow player
        currentPos.lerp(targetPos, 0.1, currentPos);
        this.node.setPosition(currentPos)
        
        // mainOffset[0] is x; mainOffset[1] is y
        this.mainOffset[0] = currentPos.x  / this.target.width / this.parallax;
        this.mainOffset[1] = -currentPos.y / this.target.height / this.parallax;
    },
});
