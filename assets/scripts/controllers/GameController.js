import Galaxy from "../models/Galaxy";
import ViewDelegate from "../ViewDelegate";

cc.Class({
    extends: cc.Component,

    properties: {
        numGalaxies: cc.Integer,
        galaxySize: cc.Size,
        sectorSize: cc.Integer,
        graphEdgeProbability: cc.Float,
        emptyPlanetProbability: cc.Float,
        emptyMoonProbabilitity: cc.Float,
        startAt: cc.Integer,
        playerNode: cc.Node,
        miniMapNode: cc.Node,
        starSystemNode: cc.Node,
        starSystemMapNode: cc.Node,
    },

    // GETTERS & SETTERS
    // TODO: make select properties "private". maybe.

    getCurrentStarSystem() { return this.currentStarSystem; },
    setCurrentStarSystem(index) { this.currentStarSystem = index; },
    getAllStarSystems() { return this.galaxy.starSystems; },
    getStarSystemAt(index) { return this.galaxy.starSystems[index]; },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        let probabilities = {
            graphEdge: this.graphEdgeProbability,
            emptyPlanet: this.emptyPlanetProbability,
            emptyMoon: this.emptyMoonProbabilitity,
        }

        // Galaxy (Models)
        this.galaxy = new Galaxy(this.galaxySize);
        this.galaxy.generate(this.numGalaxies, this.sectorSize, probabilities);
        this.currentStarSystem = this.startAt;
        this.galaxy.starSystems[this.startAt].generate(); // create starting system

        // Physics & Gravity
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0,0);

        // Views stuff
        this.views = new ViewDelegate();

        // Initialize things      
        this.initAllComponents();
        this.initPlayerPosition();

        // Events
        this.node.on("star-system-changed", this.onStarSystemChanged, this);
    },

    initAllComponents() {
        this.miniMap = this.miniMapNode.getComponent("MiniMapController");
        this.starSystem = this.starSystemNode.getComponent("StarSystemController");
        this.galaxyMap = this.starSystemMapNode.getComponent("GalaxyMapController");
        this.player = this.playerNode.getComponent("Ship");

        this.player.init(this.startAt);
        this.miniMap.init();
        this.starSystem.init();
        this.galaxyMap.init();
    },

    initPlayerPosition() {
        let zoomLevel = this.starSystem.zoomLevel;
        let startOrbital = this.galaxy.starSystems[this.startAt].star.getChild(0);

        let startPos = startOrbital.getScreenPosition().div(zoomLevel);
        this.player.node.position = startPos.sub(cc.v2(-300, 0));
    },

    // EVENTS
    emitEvent(event, args) {
        this.node.emit(event, args);
    },

    onStarSystemChanged(args) {
        // for testing purposes. Takes player to the next star system in the galaxy's system array.
        this.currentStarSystem = args[0] % this.getAllStarSystems().length;
        if (! this.galaxy.starSystems[this.currentStarSystem].generated) {
            this.getStarSystemAt(this.currentStarSystem).generate();
        }
    }
});
