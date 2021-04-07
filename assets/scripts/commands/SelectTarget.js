import Command from "./Command";

export default class SelectTarget {
    constructor() {
        return new Command(this.selectTarget);
    }

    selectTarget(ship) {
        let targets = ship.targeting.targets;
        if (ship.targeting.getCurrentTarget() !== null) {
            targets = targets.filter((item) => item !== ship.targeting.getCurrentTarget());
        }

        let distanceToClosestTarget = 1e10;
        let closestTarget = null;
        
        targets.forEach((target) => {
            if (target.isOnScreen()) {
                let distanceToTarget = target.position.sub(ship.node.position).magSqr();  
               
                if (distanceToTarget < distanceToClosestTarget) {
                    distanceToClosestTarget = distanceToTarget;
                    closestTarget = target;
                }
            }
        });
        ship.targeting.enableTarget(closestTarget);
    }
}