import Command from "Command";

export default class Jump {
    constructor() {
        return new Command(this.doJump);
    }

    // TODO: Check to see if ship is docked to starship.
    //       If yes, trigger jump animation, move to next star system.
    //       If no, some error output.
    doJump(gameComponent) {
        let next = gameComponent.getCurrentStarSystem() + 1;
        gameComponent.emitEvent("star-system-changed", [next]);
    }
}