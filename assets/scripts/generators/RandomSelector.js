import rndm from "./bin/rndm";

export default class RandomSelector {

    // A range from min to max will be selected based on the probability
    // To use: instantiate a new class then create a random value outside the class
    //         to be compared wit the probability argument here.
    //         See Star.js for an example.
    constructor(min, max, probability) {
        this.min = min,
        this.max = max,
        this.probability = probability;
    }

    getValue() {
        return rndm.seedRangeInt(this.min, this.max);
    }
}