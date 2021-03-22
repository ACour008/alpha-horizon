cc.Class({
    extends: cc.Component,

    properties: {
        zoomLevel: 0,                           // maybe try 200,000
        planetSpriteFrame: cc.SpriteFrame,
    },

    init() {
        this.objectsInSystem = [];
        this.gameComponent = cc.Canvas.instance.getComponent("GameController");
        this.gameComponent.node.on("star-system-changed", this.onStarSystemChanged, this);
        this.showStarSystem(this.gameComponent.player.currentSystem);
    },

    showStarSystem(index) {
        console.log("showing star system " + index)

        // clean up previous star system    
        if (this.node.childrenCount > 0) {
            this.node.children[0].destroy();
            this.gameComponent.emitEvent("destroy-minimap-arrows");
        }

        // generate new one
        this.gameComponent.galaxy.starSystems[index].children.forEach((orbital) => {
            this.generateOrbitalSprite(orbital, this.node);
        });
    },

    generateOrbitalSprite(orbital, nodeParent) {
        // console.log("creating node for " + orbital.name + " with an orbital distance of: " + orbital.orbitalDistance);
        let node = this.gameComponent.views.makeViewFor(orbital);
        node.parent = nodeParent;
        node.position = orbital.getScreenPosition().div(this.zoomLevel);

        // Mini Map stuff
        this.gameComponent.emitEvent("create-minimap-icon", [node, this.zoomLevel]);
        this.gameComponent.emitEvent("create-minimap-arrow", [node]);

        this.objectsInSystem.push(node);

        // do it again for all the orbital's children
        orbital.children.forEach( (o) => { this.generateOrbitalSprite(o, node); });
    },

    //Events
    onStarSystemChanged(args) {
        this.showStarSystem(this.gameComponent.getCurrentStarSystem());
    }
});
