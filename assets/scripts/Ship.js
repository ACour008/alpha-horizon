import utils from "Utils";

const ShipStatus = cc.Enum({
    Normal: 0,
    Docked: 1,
    Disabled: 2,
    Dead: 3,
    MapOpen: 4
});

cc.Class({
    extends: cc.Component,

    properties: {
        isPlayer: false,
        torque: 0,
        maxAngularVelocity: 0,
        turnDamping: 0.35,
        accel: 0,
        maxAccel: 0,
        targetUI: cc.SpriteFrame,
        status: { default: ShipStatus.Normal, type: ShipStatus },
    },
    
    init(start) {
        this.currentSystem = start;
        this.selectedTarget = null;
        this.rb = this.getComponent(cc.RigidBody);
        this.targetComponent = this.makeTargetUINode(false);
    },

    /* Creates the target UI node, makes it a child of the canvas instance
    *  @param: startActive {boolean} type - sets active property of node
    *  @return: targetUIComponent {TargetUI} [TYPE] - the target component
    */        
    makeTargetUINode(startActive) {
        let node = new cc.Node("TargetUINode");
        sprite = node.addComponent(cc.Sprite);
        targetUIComponent = node.addComponent("TargetUI");

        sprite.spriteFrame = this.targetUI;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;

        node.parent = cc.Canvas.instance.node;
        node.position = this.node.position;
        node.opacity = 127;
        node.size = this.targetUI.getOriginalSize();
        node.active = startActive;

        return targetUIComponent;
    },

    /* Selects target, places target UI over it
    *  @param: target {cc.Node} object - the target to be selected
    */
    selectTarget(target) {
        this.selectedTarget = target;
        this.targetComponent.enableTarget(target);
        this.hasTarget = true;
    },

    /* Deselects target, removing target UI */
    deselectTarget() {
        this.selectedTarget = null;
        this.targetComponent.disableTarget();
        this.hasTarget = false;
    }
});
