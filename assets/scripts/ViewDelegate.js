import AsteroidFactory from "./views/AsteroidFactory";
import MoonFactory from "./views/MoonFactory";
import JumpGateFactory from "./views/JumpGateFactory";
import PlanetFactory from "./views/PlanetFactory";
import StarFactory from "./views/StarFactory";


export default class ViewDelegate {
    constructor() {
        // ordering based on enum in Orbital model class
        this.factories = [
            new AsteroidFactory(),
            new MoonFactory(),
            new JumpGateFactory(),
            new PlanetFactory(),
            new StarFactory()
        ];
    }
    // Returns a cc.node based on the type of orbital given
    makeViewFor(orbital) {
        let factory = this.factories[orbital.type];
        return factory.create(orbital);
    }
}