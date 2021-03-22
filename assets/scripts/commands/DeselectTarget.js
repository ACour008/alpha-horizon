import Command from "./Command";

export default class DeselectTarget {
    constructor() {
        return new Command(this.deselect);
    }

    deselect(ship) {
        ship.selectedTarget = null;
        ship.targetUINode.getComponent("TargetUI").disableTarget(ship.selectedTarget);
        ship.hasTarget = false;
    }
}