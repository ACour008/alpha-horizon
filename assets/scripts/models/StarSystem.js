import Orbital from "Orbital";
import Star from "Star";


export default class StarSystem extends Orbital {

    // params
    // id: number
    // position: vector2
    constructor(id, name, position, routes) {
        // TODO: Consider creating a probability of generating a binary star system. Could be cool.
        super();
        this.id = id;
        this.name = name;
        this.position = position;
        this.routes = routes;
    }

    generate() {
        if (!this.generated) {
            let starName = "Star_" + String.fromCharCode(Math.floor(Math.random() * 25) + 97)
            this.star = new Star(starName);
            this.star.generate(this.routes);               // create planets & set jumpgate positions
            this.addChild(this.star);
            this.generated = true;
        }
    }
}