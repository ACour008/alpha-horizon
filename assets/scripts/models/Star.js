import Orbital from "./Orbital";
import Planet from "./Planet";
import JumpGate from "./JumpGate";
import rndm from "../generators/bin/rndm";
import RandomSelector from "../generators/RandomSelector"

const StarRadiiByClass = [1044000, 904800, 696000, 278400];
const StarMassByClass = [1.193e32, 3.205e30, 1.885e30, 5.655e29];

export default class Star extends Orbital {
    constructor(name) {
        super();
        this.name = name;
        this.type = 4;
        this.classification = Math.floor(rndm.seed(this.name) * 4);
        this.radius = StarRadiiByClass[this.classification];
        this.mass = StarMassByClass[this.classification];
    }

    generate(routes) {
        if (!this.generated) {
            let randomValues = [new RandomSelector(0, 1, 0.1), new RandomSelector(2, 4, 0.75), new RandomSelector(5, 6, 0.15)];
            let maxPlanets = this.getRandomValue(randomValues, this.name); // as defined in Orbital
            let orbDstMin = this.radius + 45e6, orbDstMax = this.radius + 70e6;

            // create planets
            for (let i = 0; i < maxPlanets; i++) {
                let name = "Planet_" + String.fromCharCode(Math.floor(Math.random() * 25) + 97);
                let planet = new Planet(name, orbDstMin, orbDstMax);
            
                planet.generate();                      // create moons
                this.addChild(planet);
                orbDstMin += orbDstMin + 5e6; orbDstMax += orbDstMax + 2.5e5;
            }
        
            // create jump gates;
            try {
                for(let i = 0; i < routes.length; i++) {
                    let orbDst = (this.children.length >= 1) ? this.children[0].orbitalDistance + Math.floor(rndm.seedRange(2.5e5, 5e5, i)) : Math.floor(rndm.seedRange(45e6, 70e6, i));
                    let jumpGate = new JumpGate(`JumpGate_${i}`, orbDst, routes[i]);
                    this.addChild(jumpGate);
                }
            }
            catch (err) {
                throw err;
            }
            this.generated = true;
        }
    }
}
