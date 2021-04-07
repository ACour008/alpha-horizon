export default class PlayerState {

    /* constructor for PlayerState class
    *  param: player {Player} object - playable character
    *  param: stateMachine {StateMachine} object - the state manager
    *  param: playerData {PlayerData} object - all player data 
    *  param: startTime {number} float - time spent in a state
    *  param: animatorBool {boolean} - for animations
    */
    constructor(player, stateMachine, playerData, animatorBool) {
        this.player = player;
        this.stateMachine = stateMachine;
        this.playerData = playerData;
        this.animatorBool = animatorBool;
    }

    /* fired when the state first changes */
    enter() {
        this.doChecks();
        this.startTime = cc.director.getTotalTime();
    }

    /* fired before there is a change in state */
    exit() {}

    /* called by the Player view in its update function */
    update(dt) {
        this.doChecks();
    }

    /* called by the Player view in its lateUpdate function */
    lateUpdate(dt) {}

    /* */
    doChecks() {}
}