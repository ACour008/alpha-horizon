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

    // randomSeed(seedValue) {
    //     let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
    //     return seed();
    // }

    // // Returns arbitary value between min and max
    // randomSeedRange(min, max, seedValue) {
    //     let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
    //     return seed() * (max - min) + min;
    // };

    // // Returns between min and max, all inclusive
    // randomSeedRangeInt(min, max, seedValue) {
    //     let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(seed() * (max - min + 1)) + min;
    // };

    // randomRange(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // randomSeedVector(widthLimit, heightLimit, seedValue) {
    //     let x = this.randomSeedRange(-widthLimit, widthLimit, seedValue);
    //     let y = this.randomSeedRange(-heightLimit, heightLimit, seedValue);
    //     return new cc.v2(x, y);
    // };
}

let utils = new Utils();
export default utils;