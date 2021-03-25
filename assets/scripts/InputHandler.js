import Yaw from "./commands/Yaw";
import MoveForward from './commands/MoveForward';
import SelectTarget from "./commands/SelectTarget";
import DeselectTarget from "./commands/DeselectTarget";
import RequestLanding from "./commands/RequestLanding";
import OpenMap from "./commands/OpenMap";
import Jump from "./commands/Jump";

cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameComponent = cc.Canvas.instance.getComponent("GameController");

        // Register Events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownStatusNormal, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpStatusNormal, this);
    },

    lateUpdate (dt) {
        let player = this.gameComponent.player;
        if (this.forward) {
            this.execute(new MoveForward(), player);
        }
        if (this.rotate > 0 || this.rotate < 0 ) {
            this.execute(new Yaw(), player, this.rotate);
        }
    },

    execute(command, ...args) {
        command.execute(...args);
    },

    // EVENT HANDLING
    onKeyDownStatusNormal(event) {
        let player = this.gameComponent.player;

        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.forward = true;
                break;
            case cc.macro.KEY.a:
                this.rotate = 1;
                break;
            case cc.macro.KEY.d:
                this.rotate = -1;
                break;
            case cc.macro.KEY.tab:
                this.execute(new SelectTarget(), player, this.gameComponent.starSystem.objectsInSystem);
                break;
            case cc.macro.KEY.escape:
                this.execute(new DeselectTarget(), player);
                break;
            case cc.macro.KEY.r:
                // request landing
                this.execute(new RequestLanding(), player);
                break;
            case cc.macro.KEY.j:
                this.execute(new Jump(), this.gameComponent);
                break;
            case cc.macro.KEY.l:
                // dock/land
                break;
            case cc.macro.KEY.m:
                // toggle map
                this.execute(new OpenMap(), this.gameComponent.galaxyMap);
                break;
            case cc.macro.KEY.h:
                // hail/message
                break;
        }
        // dump fuel, jettison cargo, self-destruct (insert, delete, etc..)
        // redistrubte to engine, shields, weapon w/ arrows

    },

    onKeyUpStatusNormal(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.forward = false;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
                this.rotate = 0;
                break;
        }
    },

    destroy() {
        this._super();
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
