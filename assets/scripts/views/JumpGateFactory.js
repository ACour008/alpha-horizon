import OrbitalNode from "./OrbitalNode";
import rndm from "../generators/bin/rndm";

export default class JumpGateFactory {

    constructor() { 
        cc.resources.preloadDir("jumpgates");
    }

    create(orbital) {
        let node = new OrbitalNode(orbital.name);
        let sprite = node.addComponent(cc.Sprite);
        let rotator = node.addComponent("Rotator");
        let dir = [-1, 1];
        let number = rndm.seedRangeInt(1, 2);

        rotator.rotateSpeed = 0.15 * dir[rndm.seedRangeInt(0, 1, orbital.name)];
        
        cc.resources.load(`jumpgates/jumpgate-${number}`, cc.SpriteFrame, (err, spriteFrame) => {       
            let size = spriteFrame.getOriginalSize();
            sprite.spriteFrame = spriteFrame;
            node.setContentSize(size.width/3, size.height/3);
            node.isDockable = true;
        });
        return node;
    }
}