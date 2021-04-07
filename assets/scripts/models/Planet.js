import Orbital from "./Orbital";
import JumpGate from "./JumpGate";
import DockingBay from "./DockingBay";
import rndm from "../generators/bin/rndm";
import utils from "../Utils";
import RandomSelector from "../generators/RandomSelector";

const PlanetRadiiByClass = [1000, 2500, 3250, 6500, 13000, 24800, 71500];
const PlanetMassByClass =  [5.92e16, 5.972e23, 2.986e24, 1.194e25, 5.972e25, 2.986e26, 2.986e28];
const PlanetProbabilities = [new RandomSelector(0, 1, 0.25), new RandomSelector(2, 4, 0.05), new RandomSelector(5, 6, 0.7)]; // min/max values based on PlanetType enum

export default class Planet extends Orbital {

    constructor(name, orbDistMin, orbDistMax) {
        super();
        this.name = name;
        this.type = 3
        this.angle = rndm.seedRangeInt(0, 360, this.name) * utils.DEG2RAD;
        this.orbitalDistance = rndm.seedRangeInt(orbDistMin, orbDistMax, this.name);
        this.classification = this.getRandomValue(PlanetProbabilities, this.name);
        this.radius = PlanetRadiiByClass[this.classification];
        this.mass = PlanetMassByClass[this.classification];
        this.dockingBay = this.generateDockingBay(new RandomSelector(0, 1, 0.5));
    }

    generateDockingBay(randomSelector) {
        let value = this.getRandomValue([randomSelector], this.name);
        let numBays = rndm.seedRangeInt(5, 15, this.name);
        return (value === 1) ? new DockingBay(numBays, this.name) : null;
    }

    generate() {
        // create jump gates;
    }

    generateEarth() {
        this.angle = 0;
        this.radius = 6357                  // km
        this.mass = 5.972e24;              // 59 720 000 000 000 000 000 000 000 000 kg
        this.orbitalDistance = 1470000000;   // 1.47 billion km (9.5 AU)
        this.orbitalTime = 365.26 * 24 * 60 * 60; // that many seconds
    }
}