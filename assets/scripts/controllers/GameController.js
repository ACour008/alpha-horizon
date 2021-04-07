cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        miniMapNode: cc.Node,
        starSystemNode: cc.Node,
        starSystemMapNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // Physics & Gravity
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0,0);

        // Initialize things      
        this.initAllControllers();
        this.initPlayerPosition();

        // Events
        this.node.on("star-system-changed", this.onStarSystemChanged, this);
    },

    initAllControllers() {
        this.miniMap = this.miniMapNode.getComponent("MiniMapController");
        this.starSystem = this.starSystemNode.getComponent("StarSystemController");
        // this.galaxyMap = this.starSystemMapNode.getComponent("GalaxyMapController");
        this.player = this.playerNode.getComponent("Player");

        this.miniMap.init();
        this.starSystem.init();
        // this.galaxyMap.init();
        this.player.init();
    },

    initPlayerPosition() {
        let zoomLevel = this.starSystem.zoomLevel;
        let startOrbital = this.starSystem.getCurrentSystem().star.getChild(0);

        let startPos = startOrbital.getScreenPosition().div(zoomLevel);
        this.player.node.position = startPos.sub(cc.v2(-300, 0));
    },

    onStarSystemChanged(args) {
        // for testing purposes. Takes player to the next star system in the galaxy's system array.
        this.currentStarSystem = args[0] % this.getAllStarSystems().length;
        if (! this.galaxy.starSystems[this.currentStarSystem].generated) {
            this.getStarSystemAt(this.currentStarSystem).generate();
        }
    }
});
