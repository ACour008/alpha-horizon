import Command from "./Command";

export default class RequestLanding {
    constructor() {
        return new Command(this.makeRequest);
    }

    makeRequest(ship) {
        if(!ship.hasTarget) return;
        entityComponent = ship.selectedTarget.getComponent("Entity");
        (entityComponent.isDockable) ? entityComponent.processDockingRequest(ship) : console.log("Spaceship: Uh... you can't dock here.");
    }
}