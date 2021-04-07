import PlayerStateMachine from "./PlayerStateMachine";
import IdleState from "./states/Normal/IdleState";
import ForwardState from "./states/Normal/ForwardState";
import PlayerData from "./PlayerData";

cc.Class({
    extends: cc.Component,

    properties: {
        playerData: {
            default: [],
            type: PlayerData,
            tooltip: "Acts similiar a ScriptableObject in Unity. Holds all the data for the player."
        }
    },

    /* Initialize player commonents, etc. */
    init() {
        this.mapOpen = false;
        
        this.rb = this.getComponent(cc.RigidBody);
        this.inputHandler = this.getComponent("InputHandler");
        this.targeting = this.getComponent("Targeting");
        this.targeting.init();
        
        this.stateMachine = new PlayerStateMachine();
        this.idleState = new IdleState(this, this.stateMachine, this.playerData[0], false);
        this.forwardState = new ForwardState(this, this.stateMachine, this.playerData[0], false);
        this.stateMachine.initialize(this.idleState);
    },

    /* Executes a Command class with a set of given arguments
     *  @param: command {Command} class - an instantiated command
     *  @param: ...args {any} array - arguments to be handled by the command class's execute function 
     * example:
     *     player.execute(new Forward(), playerObj, gameComponentObj)
     */ 
    execute(command, ...args) {
        command.execute(...args);
    },

    // LIFE-CYCLE CALLBACKS:

    update (dt) {
        this.stateMachine.currentState.update(dt);
    },

    lateUpdate(dt) {
        this.stateMachine.currentState.lateUpdate(dt);
    }
});
