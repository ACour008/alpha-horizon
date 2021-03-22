import Orbital from "./Orbital";
import rndm from "../generators/bin/rndm";
import utils from "../Utils";

export default class JumpGate extends Orbital {
    constructor(name, orbitalDistance, data) {
        super();
        this.name = name;
        this.type = 2;
        this.goto = data[0];
        this.weight = data[1];
        this.orbitalDistance = orbitalDistance;
        this.angle = rndm.seedRangeInt(0, 360, this.name) * utils.DEG2RAD
    }
}