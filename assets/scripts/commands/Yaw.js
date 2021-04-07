import Command from "./Command";

export default class Yaw {
    constructor() {
        return new Command(this.turn);
    }

    turn(ship, direction) {
        let data = ship.playerData[0];

        if (ship.rb.angularVelocity >= -data.maxAngularVelocity &&
            ship.rb.angularVelocity <= data.maxAngularVelocity) {
                ship.rb.applyTorque(data.torque * direction);
        }
    }
}