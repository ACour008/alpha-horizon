import utils from "Utils";

cc.Class({
    extends: cc.Component,

    properties: {
        autoRotate: false,
        padding: {
            default:25,
            type: cc.Float,
            tooltip: "The space between selected object & target UI in percentages (1 = 100%)."
        },
        startScale: {
            default: 3,
            type: cc.Float,
            tooltip: "Sets the initial scale that the target UI starts at before it 'zooms' into the select object."
        },
        animationSpeed: {
            default:0.25,
            type: cc.Float,
            tooltip: "How fast you want to 'zoom-in' animation to run (in seconds)."
        }
    },

    // LIFE-CYCLE CALLBACKS:

    update (dt) {
        if (this.autoRotate) {
            this.node.angle += -0.1;
        }
    },

    enableTarget(selectedObject) {
        if (selectedObject === null) return

        // this should return a boolean.
        // perhaps if tween was successful?
        this.node.active = true;
        this.node.position = selectedObject.position;

        this.node.width = selectedObject.width + this.padding;
        this.node.height = selectedObject.height + this.padding;
        this.node.scale = this.startScale;
        this.node.opacity = 0;

        // not sure why .call() needs to be called.
        cc.tween(this.node).to(this.animationSpeed, {scale: 1, angle:180, opacity: 255}, {easing: 'sineOutIn'}).call().start();
    },

    disableTarget() {
        this.node.active = false;
    }
});
