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
        targetUINode: { default: null, type: cc.Node },
        status: { default: ShipStatus.Normal, type: ShipStatus },
    },
    
    init(start) {
        this.currentSystem = start;
        this.rb = this.getComponent(cc.RigidBody); 
    }
});
