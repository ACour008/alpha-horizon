class RandomAC {
    seed(seedValue) {
        let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
        return seed();
    }

    // Returns arbitary value between min and max
    seedRange(min, max, seedValue) {
        let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
        return seed() * (max - min) + min;
    };

    // Returns between min and max, all inclusive
    seedRangeInt(min, max, seedValue) {
        let seed = (seedValue) ? new Math.seedrandom(seedValue) : new Math.seedrandom();
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(seed() * (max - min + 1)) + min;
    };

    range(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    vector2Seed(widthLimit, heightLimit, seedValue) {
        let x = this.randomSeedRange(-widthLimit, widthLimit, seedValue);
        let y = this.randomSeedRange(-heightLimit, heightLimit, seedValue);
        return new cc.v2(x, y);
    };
}

let rndm = new RandomAC();
export default rndm;