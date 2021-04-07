import Command from "./Command"

export default class CloseMap {
    constructor() {
        return new Command(this.closeMap);
    }

    closeMap(player) {
        player.map.close();
    }
}