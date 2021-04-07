import NormalState from "./NormalState";
import Yaw from "../../../../commands/Yaw";
import MoveForward from '../../../../commands/MoveForward';
import SelectTarget from "../../../../commands/SelectTarget";
import DeselectTarget from "../../../../commands/DeselectTarget";
import RequestLanding from "../../../../commands/RequestLanding";
import OpenMap from "../../../../commands/OpenMap";
import Jump from "../../../../commands/Jump"

export default class ForwardState extends NormalState {

    constructor(player, stateMachine, playerData, animatorBool) {
        super(player, stateMachine, playerData, animatorBool);
        this.stateName = "Forward";
    }

    update(dt) {
        if (this.input.forward) { this.player.execute(new MoveForward(), this.player); }
        if (this.input.rotate !== 0) { this.player.execute(new Yaw(), this.player, this.input.rotate); }
        if (this.input.select) { this.player.execute(new SelectTarget(), this.player);}
        if (this.input.request) { this.player.execute(new RequestLanding(), this.player); }

        if (this.input.keys.size === 0) {
            this.stateMachine.changeState(this.player.idleState);
        }
    }
}