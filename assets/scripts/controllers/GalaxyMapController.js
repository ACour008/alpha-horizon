import utils from "../Utils";
import GalaxyMapStarSystem from "../views/GalaxyMapStarSystem";

cc.Class({
    extends: cc.Component,

    properties: {
        rootNode: cc.Node,
        mapNode: cc.Node,
        locationIndicator: cc.SpriteFrame,
        locationIndicatorSize: cc.Size,
        starSystemSprites: [cc.SpriteFrame],
        starSystemRadius: 16,
        edgeSprite: cc.SpriteFrame,
        systemNameLabel: cc.Label,
        selectRing: cc.Node,
        mapOpenSFX: cc.AudioClip,
    },

    // Initializations. Diff from constructor.
    init() {
       this.gameComponent = cc.Canvas.instance.getComponent("GameController");
       this.renderCamera = this.getComponent(cc.Camera);
       this.starSystemEdges = this.gameComponent.galaxy.edges;
       this.starSystemNodes = [];
       this.selectedSystem = this.gameComponent.startAt;
       this.selectRing.zIndex = 4;

       // Register events
       this.gameComponent.node.on("selected-map-system", this.onSelectedStarSystem, this);
       this.gameComponent.node.on("star-system-changed", this.onStarSystemChanged, this);
       // this.mapNode.parent.on(cc.Node.EventType.MOUSE_DOWN, this.deactivateSelectRing, this);

       // Initialize!
       this.initGalaxyMap();
    },

    deactivateSelectRing(event) {
        // How do ensure the click is outside any star system icon?
        console.log("BAM!");
    },

    initGalaxyMap() {
        let scrollView = this.mapNode.parent.addComponent(cc.ScrollView);
        scrollView.horizontal = true;
        scrollView.vertical = true;
        scrollView.elastic = true;
        scrollView.inertia = true;
        scrollView.brake = 1;

        // Rendering the Actual nodes
        this.gameComponent.galaxy.starSystems.forEach( (starSystem) => {
            this.makeStarSystemSprites(starSystem);
        });
        // do edges next.
        for (const [key, value] of this.starSystemEdges.entries()) {
            this.makeOneEdge(key, value);
        }
        this.calcMapSize();
        this.createLocationIndicator();
        scrollView.content = this.mapNode;
        this.rootNode.active = false; // turn off for start.
    },

    makeStarSystemSprites(starSystem) {
        let starSystemNode = new GalaxyMapStarSystem(`Star ${starSystem.id}`, starSystem.id);
        let sprite = starSystemNode.addComponent(cc.Sprite);

        // If player has visited the system, it will have been generated.
        // If not it is 'unknown' on the map.
        if (starSystem.hasOwnProperty("star")) {
            sprite.spriteFrame = this.starSystemSprites[starSystem.star.classification];    
        } else {
            sprite.spriteFrame = this.starSystemSprites[4];
        }

        starSystemNode.parent = this.mapNode;
        starSystemNode.zIndex = 2;
        starSystemNode.anchorX = 0.5, starSystemNode.anchorY = 0.5;
        starSystemNode.opacity = 191;
        starSystemNode.setContentSize(cc.size(this.starSystemRadius*2, this.starSystemRadius*2));
        starSystemNode.position = starSystem.position.sub(cc.v2(this.gameComponent.galaxySize.width/2, (this.gameComponent.galaxySize.height/2)-75));

        this.starSystemNodes[starSystem.id] = starSystemNode;
    },

    makeOneEdge(index, edgeArr) {
        edgeArr.forEach( (edgeData) => {
            if (edgeData.connectsTo > index) {
                let toNode = this.starSystemNodes[index];
                let fromNode = this.starSystemNodes[edgeData.connectsTo];

                let distance = fromNode.position.sub(toNode.position);
                let edgeLength = Math.sqrt(distance.x**2 + distance.y**2) - ((this.starSystemRadius-5) * 2); // -5 for the outerglow in the png.
                let angle = utils.getAngleFromVector(distance.normalizeSelf());

                let edgeSprite = new cc.Node();
                let sprite = edgeSprite.addComponent(cc.Sprite);

                sprite.spriteFrame = this.edgeSprite;
                sprite.type = cc.Sprite.Type.SLICED;
                edgeSprite.parent = this.mapNode;
                edgeSprite.zIndex = 1;
                edgeSprite.anchorX = 0.5; edgeSprite.anchorY = 0;
                edgeSprite.position = toNode.position.add(distance.mul(this.starSystemRadius-5)); // accounting for the outerglow again
                edgeSprite.opacity = 127;
                edgeSprite.angle = angle+-90;
                edgeSprite.setContentSize(cc.size(2, edgeLength));
            }
        });
    },

    createLocationIndicator() {
        let node = new cc.Node("current");
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.locationIndicator;
        node.parent = this.mapNode;
        node.zIndex = 3;
        node.setContentSize(this.locationIndicatorSize);
        node.opacity = 191;
        node.position = this.starSystemNodes[this.gameComponent.startAt].position;
        this.indicatorNode = node;
    },

    // SOUND FUNCTIONS
    playMapOpen() {
        cc.audioEngine.playEffect(this.mapOpenSFX, false);
    },

    // EVENT FUNCTIONS

    onSelectedStarSystem(args) {
        if (!this.selectRing.active) { 
            this.selectRing.active = true;
        }
        let currentSys = this.starSystemNodes[this.selectedSystem];
        let selectedSys = this.starSystemNodes[args[1]];
        
        this.systemNameLabel.string = args[0];
        this.selectRing.position = selectedSys.position;
        currentSys.opacity = 191;
        currentSys.selected = false;
        selectedSys.opacity = 255;
        selectedSys.selected = true;
        this.selectedSystem = args[1];
    },

    onStarSystemChanged() {
        let systemIndex = this.gameComponent.getCurrentStarSystem();
        let systemNode = this.starSystemNodes[systemIndex];
        let systemData = this.gameComponent.getStarSystemAt(systemIndex);

        this.indicatorNode.position = systemNode.position;
        systemNode.getComponent(cc.Sprite).spriteFrame = this.starSystemSprites[systemData.star.classification]; 
        systemNode.setContentSize(cc.size(this.starSystemRadius*2, this.starSystemRadius*2));
    },

    // OTHERS

    calcMapSize() {
        let rows = this.gameComponent.galaxy.width / this.gameComponent.sectorSize; // 6
        let cols = this.gameComponent.galaxy.height / this.gameComponent.sectorSize; // 5
        let left = 0, right = 0, top = 0, bottom = 0;
        // Bottom
        for (let i = 0; i <=cols; i++) {
            if (this.starSystemNodes[i].position.y < bottom) { bottom = this.starSystemNodes[i].position.y;}
        }
        // Top
        for (let i = rows*cols-rows; i < rows*cols; i++) {
            if (this.starSystemNodes[i].position.y > top) { top = this.starSystemNodes[i].position.y; }
        }
        // Left
        for (let i=0; i<=rows*cols-rows; i+= rows) {
            if (this.starSystemNodes[i].position.x < left) { left = this.starSystemNodes[i].position.x; }
        }
        // Right
        for (let i=cols; i<rows*cols; i+=rows) {
            if (this.starSystemNodes[i].position.x > right) { right = this.starSystemNodes[i].position.x; }
        }
        // Add some padding
        this.mapNode.setContentSize(Math.abs(left)+Math.abs(right) + 50, (Math.abs(top)+Math.abs(bottom)) + 50);
    },
});
