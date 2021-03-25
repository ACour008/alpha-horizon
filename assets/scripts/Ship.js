import utils from "Utils";

const ShipStatus = cc.Enum({
    Normal: 0,
    Docked: 1,
    Disabled: 2,
    Dead: 3,
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
        this.targetComponent = this.makeTargetUINode(true);
    },

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

        console.log(node.position);

        return targetUIComponent;
    },

    selectTarget(target) {
        this.selectedTarget = target;
        this.targetComponent.enableTarget(target);
        this.hasTarget = true;
    },

    deselectTarget() {
        this.selectedTarget = null;
        this.targetComponent.disableTarget();
        this.hasTarget = false;
    }
});
