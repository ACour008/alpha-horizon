import Utils from "./Utils";

cc.Class({
    extends: cc.Component,

    properties: {
        targetUI: {
            default: null,
            type: cc.SpriteFrame
        },
        autoRotate: true,
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

    // intialization
    init() {
        this.targets = cc.Canvas.instance.node.getComponent("GameController").starSystem.objectsInSystem;
        this.targetNode = this.makeTargetUINode(true);
        this.currentTarget = null;
    },

    // GETTERS/SETTERS
    getCurrentTarget() { return this.currentTarget },
    setCurrentTarget(target) { this.currentTarget = target },

     /* 
      * Creates the target UI node
      *     @param: startActive {boolean} - sets active property of node
      *     @returns: targetNode {cc.Node} - the target node 
    */        
    makeTargetUINode(startActive) {
        let spriteOptions = {"type": cc.Sprite.Type.SLICED, "sizeMode": cc.Sprite.SizeMode.TRIMMED}
        let node = Utils.makeSpriteNode("TargetUINode", this.targetUI, spriteOptions);
        
        node.parent = cc.Canvas.instance.node;
        node.position = this.node.position;
        node.opacity = 127;
        node.size = this.targetUI.getOriginalSize();
        node.active = startActive;
        return node;
    },

    /* 
     * Enables this.targetNode and places it over the given target.
     * @param: target {cc.Node} - the selected target
     */
    enableTarget(target) {
        if (target === null) return

        this.targetNode.active = true;
        this.targetNode.position = target.position;

        this.targetNode.width = target.width + this.padding;
        this.targetNode.height = target.height + this.padding;

        this.targetNode.scale = this.startScale;
        this.targetNode.opacity = 0;

        // not sure why .call() needs to be called.
        cc.tween(this.targetNode).to(this.animationSpeed, {scale: 1, angle:360, opacity: 255}, {easing: 'sineOutIn'}).call().start();
        this.currentTarget = target;
    },

    /*
     * Disables this.targetNode
    */
    disableTarget() {
        this.currentTarget = null;
        this.node.active = false;
    },


    // EVENT HANDLING

    update(dt) {
        if (this.autoRotate && this.targetNode.active) {
            this.targetNode.angle -= 0.1;
        }
    }
});
