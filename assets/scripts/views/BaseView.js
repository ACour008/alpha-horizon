// This is the base class for all objects that is instantiated on screen.

let BaseView = cc.Class({
    extends: cc.Node,

    properties: {
        isSelectable: true,
    },

    isOnScreen() {
        let {width: canvasWidth, height: canvasHeight} = cc.Canvas.instance.node;
        let midPoint = cc.Camera.main.getWorldToScreenPoint(cc.Camera.main.node.position);
        let pos = cc.Camera.main.getWorldToScreenPoint(this.position);

        return pos.x > midPoint.x - canvasWidth / 2 &&
               pos.x < midPoint.x + canvasWidth / 2 &&
               pos.y > midPoint.y - canvasHeight / 2 &&
               pos.y < midPoint.y + canvasHeight / 2;
    },

    // events
    onDestroy() {
        this.destroyAllChildren();
    }
});

export default BaseView;