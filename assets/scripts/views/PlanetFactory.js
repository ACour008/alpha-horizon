import {PlanetType} from "../Enums";
import rndm from "../generators/bin/rndm";
import OrbitalNode from "./OrbitalNode";
import Utils from "../Utils";

export default class PlanetFactory {
    
    pixelSizesByClassification = [[256, 320], [320, 384], [384, 448], [448, 512], [512, 576], [276, 340], [340, 404]];
    
    constructor() {
        cc.resources.preloadDir("planets");
    }
    // This factory generates a sprite and size range depending on planet type.
    create(orbital) {
        let node = new OrbitalNode(orbital.name);
        let sprite = node.addComponent(cc.Sprite);
        let nodeSize = this.pixelSizesByClassification[orbital.classification];
        let pxl = rndm.seedRangeInt(nodeSize[0], nodeSize[1], orbital.name);
        let type = PlanetType[orbital.classification].toLowerCase();
        let number = rndm.seedRangeInt(0, 2, orbital.name);
        
        cc.resources.load(`planets/${type}-${number}`, cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            node.setContentSize(cc.size(pxl, pxl));
            node.isDockable = (orbital.dockingBay !== null) ? true : false;
            
        });
        return node;
    }
}