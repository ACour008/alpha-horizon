cc.Class({
    extends: cc.Component,

    properties: {
        // All properties are properly set in the editor.
        followTarget: cc.Node,
        renderTextureNode: cc.Node,
        renderTextureSize: cc.Size,
        miniMapSymbol: cc.SpriteFrame,
        miniMapArrow: cc.SpriteFrame,
        miniMapArrowHolder: cc.Node,
    },

    // EVENT FUNCTIONS

    onCreateIcon(args) {
        let parentNode = args[0];
        let zoomLevel = args[1];
        let miniMapNode = new cc.Node(parentNode.name + "_mm");
        let miniMapSprite = miniMapNode.addComponent(cc.Sprite);        
        miniMapSprite.spriteFrame = this.miniMapSymbol;
        
        miniMapNode.group = "MiniMap";
        miniMapNode.setParent(parentNode);
        miniMapNode.setContentSize(cc.size(64, 64));
        miniMapNode.setPosition(parentNode.position.div(zoomLevel));
    },

    onCreateArrow(args) {
        let parentNode = args[0];
        let node = new cc.Node(parentNode.name + "arrow");
        let sprite = node.addComponent(cc.Sprite);
        let arrowComponent = node.addComponent("MiniMapArrow");

        sprite.spriteFrame = this.miniMapArrow;
        arrowComponent.targetNode = parentNode;
        arrowComponent.playerNode = this.followTarget;

        node.group = "MiniMap";
        node.setParent(this.miniMapArrowHolder);
        node.setContentSize(cc.size(64, 64));
        node.setAnchorPoint(cc.v2(0.45, 0.55));
    },

    // INIT STUFF

    initRenderTexture() {

        // Get the width and height from the canvas instance
        let { height: canvasHeight } = cc.Canvas.instance.node;
        let renderTextureSprite = this.renderTextureNode.addComponent(cc.Sprite);
        let renderTexture = new cc.RenderTexture();
        let spriteFrame;

        renderTexture.initWithSize(canvasHeight, canvasHeight);
        this.camera.targetTexture = renderTexture;

        spriteFrame = new cc.SpriteFrame(renderTexture);
        renderTextureSprite.spriteFrame = spriteFrame;
        // renderTextureSprite.type = cc.Sprite.Type.SLICED;
        // renderTextureSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;

        // TODO: Apply post processing to make texture look even cooler!

        this.renderTextureNode.scaleY = -1;   // flip image horizontally.
        this.renderTextureNode.setContentSize(this.renderTextureSize);
        this.renderTextureNode.setPosition(cc.v2(0, 0));
    },

    init() {
        this.gameComponent = cc.Canvas.instance.getComponent("GameController");
        this.camera = this.getComponent(cc.Camera);
        this.initRenderTexture();

        // Register event listeners
        // The Star System Controller calls these whenever a star system is generated on screen
        this.gameComponent.node.on("create-minimap-icon", this.onCreateIcon, this);
        this.gameComponent.node.on("create-minimap-arrow", this.onCreateArrow, this);
    },

    // GAME LOOP EVENT FUNCTIONS

    update (dt) {        
        this.camera.node.position = this.followTarget.position;
        this.camera.orthoSize = 360;
    },
});
