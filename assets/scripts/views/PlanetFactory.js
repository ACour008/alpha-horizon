import {PlanetType} from "../Enums";
import rndm from "../generators/bin/rndm";
import OrbitalNode from "./OrbitalNode";

export default class PlanetFactory {
    
    pixelSizesByClassification = [[128, 192], [192, 256], [256, 320], [320, 384], [384, 448], [448, 512], [512, 576]];
    
    constructor() {
        cc.resources.preloadDir("planets");
    }
    create(orbital) {
        let node = new OrbitalNode(`${orbital.name}_node`);
        let sprite = node.addComponent(cc.Sprite);
        let nodeSize = this.pixelSizesByClassification[orbital.classification];
        let pxl = rndm.seedRangeInt(nodeSize[0], nodeSize[1], orbital.name);
        let type = PlanetType[orbital.classification].toLowerCase();
        let number = rndm.seedRangeInt(0, 2, orbital.name);
        
        cc.resources.load(`planets/${type}-${number}`, cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            node.setContentSize(cc.size(pxl, pxl));
            
        });
        return node;
    }
}