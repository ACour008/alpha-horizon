import BaseView from "./BaseView";
cc.Class({
    extends: BaseView,

    properties: {
        id: cc.Integer,
    },

    ctor() {
        this.name = arguments[0];
        this.id = arguments[1];
        this.galaxyMapController = arguments[2];
        this.gameComponent = cc.Canvas.instance.getComponent("GameController");
        this.selected = false;

        // register events
        this.on(cc.Node.EventType.MOUSE_DOWN, this.onSelected, this);
        this.on(cc.Node.EventType.MOUSE_ENTER, (event) => event.target.opacity = (this.selected) ? 255 : 204, this);
        this.on(cc.Node.EventType.MOUSE_LEAVE, (event) => event.target.opacity = (this.selected) ? 255 : 191, this);
    },

    onSelected(event) {
        if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
            let selectedSystem = this.gameComponent.galaxy.starSystems[event.target.id];
            let name = selectedSystem.name.split("_").join('\n');
            this.gameComponent.emitEvent("selected-map-system", [name, this.id]);
        }
    },

});
