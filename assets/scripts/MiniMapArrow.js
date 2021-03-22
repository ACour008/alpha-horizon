import utils from "Utils";

cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: {
            default: null,
            type: cc.Node
        },
        playerNode: {
            default: null,
            type: cc.Node,
        },
        arrowMargin: 50,
    },

    _isOnScreen(target, ref, maxWidth, maxHeight) {
        return target.x > ref.x - maxWidth / 2 &&
               target.x < ref.x + maxWidth / 2 &&
               target.y > ref.y - maxHeight / 2  &&
               target.y < ref.y + maxHeight / 2;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.miniMapCamera = cc.Camera.findCamera(this.node);
        this.gameComponent = cc.Canvas.instance.getComponent("GameController");
        this.gameComponent.node.on("destroy-minimap-arrows", this.onDestroy, this);
    },

    update (dt) {
        let {width: canvasWidth, height: canvasHeight} = cc.Canvas.instance.node,  // 960, 640
            isOnScreen = this._isOnScreen(this.targetNode.position, this.playerNode.position, 
                canvasWidth, canvasHeight);

        if (isOnScreen) {
            // Hide arrow because its not needed
            this.node.opacity = 0;
        } else {
            this.node.opacity = 255;

            // rotate towards target
            let direction = this.targetNode.position.sub(this.playerNode.position).normalize();
            let rotation = utils.getAngleFromVector(direction);
            this.node.angle = rotation + -90;

            // clamp to edge of mask
            let arrowPos = direction.mul((640/2) - this.arrowMargin);
            this.node.position = arrowPos;
        }
    },

    onDestroy() {
        this.node.destroy();
    }
});
