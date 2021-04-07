export default class PlayerStateMachine {

    initialize(startingState) {
        this._currentState = startingState;
        this._currentState.enter();
    }

    get currentState() {
        return this._currentState;
    }

    set currentState(newState) {
        this._currentState = newState;
    }

    changeState(newState) {
        this._currentState.exit();
        this._currentState = newState;
        this._currentState.enter();
    }
}