import Command from "./Command";

export default class RequestLanding {
    constructor() {
        return new Command(this.makeRequest);
    }

    makeRequest(ship) {
        let target = ship.targeting.getCurrentTarget();

        if (!target) {
            console.log("No target selected");

        } else {
            if (target.isDockable) {
                let orbital = cc.Canvas.instance.getComponent("GameController").starSystem.getOrbitalByName(target.name);
                orbital.dockingBay.processLandingRequest(ship);
            } else {
                console.log(target.name + " has no available docking bay");
            }
        }
    }
}