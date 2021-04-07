import Command from "./Command";
import utils from "../Utils";

export default class MoveForward {
    constructor() {
        return new Command(this.forward);
    }

    forward(ship) {
        // Convert the node's angle from degrees to rad
        let rads = (ship.node.angle+90) * utils.DEG2RAD;
        let speedVec = cc.v2(Math.cos(rads), Math.sin(rads));
        let data = ship.playerData[0];
    
        ship.rb.applyForceToCenter(speedVec.mul(data.accel), true);
    
        //Limit magnitude
        if (ship.rb.linearVelocity.magSqr() > data.maxAccel * data.maxAccel) {
            let normVel = ship.rb.linearVelocity.normalize();
            let clampedVel = normVel.mul(data.maxAccel);
                
            ship.rb.linearVelocity = clampedVel;
        }
    }
}