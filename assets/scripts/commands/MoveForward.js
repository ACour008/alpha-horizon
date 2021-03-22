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
    
        ship.rb.applyForceToCenter(speedVec.mul(ship.accel), true);
    
        //Limit magnitude
        if (ship.rb.linearVelocity.magSqr() > ship.maxAccel * ship.maxAccel) {
            let normVel = ship.rb.linearVelocity.normalize();
            let clampedVel = normVel.mul(ship.maxAccel);
                
            ship.rb.linearVelocity = clampedVel;
        }
    }
}