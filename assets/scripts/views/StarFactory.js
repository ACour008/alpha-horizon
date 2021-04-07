import {StarType} from "../Enums";
import OrbitalNode from "./OrbitalNode";

export default class StarFactory {
    
    constructor() {
        cc.resources.preloadDir("stars");
    }

    create(orbital) {
        let node = new OrbitalNode(orbital.name);
        let sprite = node.addComponent(cc.Sprite);

        cc.resources.load(`stars/${orbital.classification}`, cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            node.isDockable = false;
        });

        return node;
    }

}