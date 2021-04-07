import PlayerState from "../../PlayerState";

export default class NormalState extends PlayerState {

    constructor(player, stateMachine, playerData, animatorBool) {
        super(player, stateMachine, playerData, animatorBool);
        this.input = player.inputHandler;
        this.stateName = "Normal";
    }

    enter() {
        super.enter();
        console.log(this.stateName);
    }
}