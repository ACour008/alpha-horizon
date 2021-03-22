import Command from "Command";

export default class OpenMap {
    constructor() {
        return new Command(this.openMap);
    }

    openMap(mapComponent) {
        mapComponent.playMapOpen();
        mapComponent.rootNode.active = !mapComponent.rootNode.active;
    }
}