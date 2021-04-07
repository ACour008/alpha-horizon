import NormalState from "./NormalState";

export default class IdleState extends NormalState {

    constructor(player, stateMachine, playerData, animatorBool) {
        super(player, stateMachine, playerData, animatorBool);
        this.stateName = "Idle";
    }

    update(dt) {
        if (this.input.keys.size > 0) {
            this.stateMachine.changeState(this.player.forwardState);
        }
    }
}