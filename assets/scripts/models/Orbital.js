import rndm from "../generators/bin/rndm";

// 1 AU = 150,000,000 km

// Orbital time (according to Kepler's Law)
// T = 2 * Math.PI * Math.sqrt( Math.pow(a, 3) / G * M)
// Where:   a = is the semi-major axis of the orbiting body (center to edge)
//          G = 0.00000000006647 (i think)
//          M = mass of the object

export default class Orbital {

    constructor(name) {
        this.name = name;
        this.id = null;
        this.parent = null;
        this.children = [];
        this.mass = 0;                // or size maybe??
        this.radius = 0;
        this.angle = 0;               // angle around the star in rads
        this.orbitalDistance = 0;     // distance from center of one orbital to the center of another
        this.orbitalTime = null;
        this.type = null,
        this.classification = null;
        this.dockingBay = null;
        this.generated = false;
    }

    // GETTERS/SETTERS
    getParent() { return this.parent; }
    setParent(parent) { this.parent = parent; }
    getChild(index) { return this.children[index]; }
    getChildren() { return this.children; }
    setScreenPosition(vecObj) { this.screenPos = vecObj }
    getScreenPosition() { 
        return cc.v2(
            Math.sin(this.angle) * this.orbitalDistance,
            Math.cos(this.angle) * this.orbitalDistance
        )
    }
    getChildByName(name) {
       return this.children.find((child) => child.name === name);
    }

    update(timeSinceStart) {
        this.angle = (timeSinceStart / this.orbitalTime) * 2 * Math.PI;
        this.children.forEach( (item) => item.update(timeSinceStart) );
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child) {
        if (this.children.includes(child)) {
            child.parent = null;
            this.children.slice(this.children.indexOf(child), 1);
        } else {
            console.log("child does not exist in " + this.name);
        }
    }

    getRandomValue(values, seed) {
        let random = rndm.seed(seed);
        for (let i = 0; i < values.length; i++) {
            if (random < values[i].probability) {
                return values[i].getValue();
            }
        }
        // This is a failsafe. Figure out why it even gets here.
        return values[values.length-1].getValue();
    }
}