import Command from "./Command";

export default class SelectTarget {
    constructor() {
        return new Command(this.selectTarget);
    }

    selectTarget(ship, arr) {
        if (ship.hasTarget) {
            arr = arr.filter((item) => item !== ship.selectedTarget);
        }

        let distanceToClosestTarget = 1e10;
        let closestTarget = null;
        
        arr.forEach((target) => {
            if (target.isOnScreen()) {
                let distanceToTarget = target.position.sub(ship.node.position).magSqr();  
               
                if (distanceToTarget < distanceToClosestTarget) {
                    distanceToClosestTarget = distanceToTarget;
                    closestTarget = target;
                }
            }
        });
        ship.selectTarget(closestTarget);
    }
}