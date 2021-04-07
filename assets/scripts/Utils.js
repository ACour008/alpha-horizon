class Utils {
    constructor() {
        this.RAD2DEG = 180 / Math.PI;
        this.DEG2RAD = Math.PI / 180;
    };
    
    getAngleFromVector(direction) {
        direction = direction.normalize();
        return (Math.atan2(direction.y, direction.x) * this.RAD2DEG) % 360;
    };

    getAngleFromVecs(pointA, pointB) {
        let dstX = Math.sqrt( (pointB[0] - pointA[0])**2);
        let dstY = Math.sqrt( (pointB[1] - pointA[1])**2);
        let norm = this.normalize(dstX, dstY);
        norm = this.normalize(norm[0], norm[1]);
        return (Math.atan2(norm[1], norm[0]) * this.RAD2DEG) % 360;
    }

    dot(x1, y1, x2, y2) {
        return (x1*x2) + (y1*y2);
    }

    normalize(x,y) {
        let mag = this.mag(x, y);
        return [x/mag, y/mag];
    }

    mag(x,y) {
        return Math.sqrt((x**2) + (y**2));
    }

    clamp(val, min, max) {
        return (val < min) ? min : val > max ? max : val;
    };

    makeSpriteNode(name, spriteFrame, options) {
        let node = new cc.Node(name);
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        for (let key in options) {
            sprite[key] = options[key];
        }

        return node;
    }
}

let utils = new Utils();
export default utils;