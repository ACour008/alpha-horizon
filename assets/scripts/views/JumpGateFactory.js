import OrbitalNode from "./OrbitalNode";
import rndm from "../generators/bin/rndm";

export default class JumpGateFactory {

    constructor() { 
        cc.resources.preload("jumpgate");
    }

    create(orbital) {
        let node = new OrbitalNode(`${orbital.name}_node`);
        let sprite = node.addComponent(cc.Sprite);
        let rotator = node.addComponent("Rotator");
        let dir = [-1, 1];
        rotator.rotateSpeed = rndm.seedRange(0, 1, orbital.name) * dir[rndm.seedRangeInt(0, 1, orbital.name)];

        cc.resources.load("jumpgate", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            node.setContentSize(213, 176);
        });
        return node;
    }
}