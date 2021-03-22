import rndm from "rndm";

export default class Scatterer {
    
    _grid = [];
    _initGrid(r, c) {
        for (let x = 0; x < r; x++) {
            for (let y = 0; y < c; y++) {
                this._grid[x+y*r] = cc.v2(x, y);
            }
        }
    }

    _randomize(x, y, i, j) {
        let xd = this.w/this.c;
        let yd = this.h/this.r;
        let p = 0.4;
        let rndm = rndm.seedRange;
        let idx = i+j*this.r;
        this.points[idx] = [Math.floor(x+xd*i+rndm(-p, p)*xd), Math.floor(y+yd*j+rndm(-p, p)*yd)];
    }

    constructor(width, height, rows, cols) {
        this.w = width;
        this.h = height;
        this.r = rows;
        this.c = cols;
        this.points = []
        this.scatter();
    }

    scatter() {
        this._initGrid(this.r, this.c);

        for (let x = 0; x<this.r; x++) {
            for (let y = 0; y<this.c; y++) {
                let index = x+y*this.r
                let selVec = this._grid[index]
                this._randomize(selVec.x, selVec.y, x, y);
            }
        }
    }
}