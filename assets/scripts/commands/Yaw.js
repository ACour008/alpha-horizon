import Command from "./Command";

export default class Yaw {
    constructor() {
        return new Command(this.turn);
    }

    turn(ship, direction) {
        if (ship.rb.angularVelocity >= -ship.maxAngularVelocity &&
            ship.rb.angularVelocity <= ship.maxAngularVelocity) {
                ship.rb.applyTorque(ship.torque * direction);
        }
    }
}