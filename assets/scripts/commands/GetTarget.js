import Command from "./Command";

export default class GetTarget {
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
            console.log(target);
            if (target.isOnScreen()) {
                let distanceToTarget = target.position.sub(ship.node.position).magSqr();  
               
                if (distanceToTarget < distanceToClosestTarget) {
                    distanceToClosestTarget = distanceToTarget;
                    closestTarget = target;
                }
            }
        });

        ship.selectedTarget = closestTarget;
        ship.targetUINode.getComponent("TargetUI").enableTarget(ship.selectedTarget);
        ship.hasTarget = true;
    }
}