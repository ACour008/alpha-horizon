import Galaxy from "../models/Galaxy";
import ViewDelegate from "../ViewDelegate";

cc.Class({
    extends: cc.Component,

    properties: {
        zoomLevel: 0,
        numSystems: 30,
        galaxySize: cc.Size,
        sectorSize: 100,
        startAt: 0,
        graphEdgeProbability: 0.1,
        emptyPlanetProbability: 0.05,
        emptyMoonProbabilitity: 0.5,
    },

    /* Initializes the controller.*/
    init() {
        let probabilities = {
            graphEdge: this.graphEdgeProbability,
            emptyPlanet: this.emptyPlanetProbability,
            emptyMoon: this.emptyMoonProbabilitity,
        }
        this.objectsInSystem = [];
        this.currentSystem = this.startAt;
        
        // Galaxy (Models & Views)
        this.galaxy = new Galaxy(this.galaxySize);
        this.galaxyViews = new ViewDelegate();
        this.galaxy.generate(this.numSystems, this.sectorSize, probabilities);
        this.galaxy.starSystems[this.currentSystem].generate();
        
        this.emitter = cc.Canvas.instance.getComponent("Emitter");
        this.emitter.register("star-system-changed", this.onStarSystemChanged, this);

        this.showStarSystem(this.currentSystem);
    },

    // GETTERS/SETTERS

    getCurrentSystem() { return this.galaxy.starSystems[this.currentSystem]; },
    setCurrentSystem(index) { this.currentSystem = index; },
    getOrbitalByName(name) {
        return this.getCurrentSystem().star.getChildByName(name);
    },

    showStarSystem(index) {
        console.log("showing star system " + index)

        // clean up previous star system    
        if (this.node.childrenCount > 0) {
            this.node.children[0].destroy();
            this.emitter.emitEvent("destroy-minimap-arrows");
        }

        // generate new one
        this.galaxy.starSystems[index].children.forEach((orbital) => {
            this.generateOrbitalSprite(orbital, this.node);
        });
    },

    generateOrbitalSprite(orbital, nodeParent) {
        // console.log("creating node for " + orbital.name + " with an orbital distance of: " + orbital.orbitalDistance);
        let node = this.galaxyViews.makeViewFor(orbital);
        node.parent = nodeParent;
        node.position = orbital.getScreenPosition().div(this.zoomLevel);

        // Mini Map stuff
        this.emitter.emitEvent("create-minimap-icon", [node, this.zoomLevel]);
        this.emitter.emitEvent("create-minimap-arrow", [node]);

        this.objectsInSystem.push(node);

        // do it again for all the orbital's children
        orbital.children.forEach( (o) => { this.generateOrbitalSprite(o, node); });
    },

    //Events
    onStarSystemChanged(args) {
        this.showStarSystem(this.currentSystem);
    }
});