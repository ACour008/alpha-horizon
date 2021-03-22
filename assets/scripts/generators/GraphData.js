import rndm from "./bin/rndm"
import utils from "../Utils";
import Delaunator from "./bin/Delaunator";

export default class GraphData {

    static place(width, height, cellSize, emptyEdgeProbability) {
        let rows = width / cellSize;
        let cols = height / cellSize;

        return new GraphData(rows, cols, width, height, emptyEdgeProbability);
    }

    constructor(rows, cols, width, height, probability) {
        this.nodePositions = this.initGrid(rows, cols, width, height);
        this.edges = this.initMap(rows*cols, Delaunator.from(this.nodePositions));
        this.emptyEdgeProbability = probability;
    }

    initMap(entries, points) {
        let map = new Map();
        for (let i = 0; i < entries; i++) {
            map.set(i, []);
        }
        this.makeEdgesFrom(points.triangles, map);
        return map;
    }

    makeEdgesFrom(triangles, map) {
        for (let e = 0; e<triangles.length; e+=3) {
            let p = Math.random();
            // need at least one connection between star system.
            // The other is based on chance.
            this.setEdge(triangles[e], triangles[e+1], map);
            if (this.emptyEdgeProbability > p && map.get(triangles[e]).length > 3) {
                this.setEdge(triangles[e], triangles[e+2], map);
            }
        }
    }

    setEdge(pointA, pointB, map) {
        // check for duplicates.
        if(!this.pointInMap(pointB, pointA, map)) {
            let n1 = this.nodePositions[pointA];
            let n2 = this.nodePositions[pointB];
            let weight = Math.floor(Math.sqrt( (n2[0]-n1[0])**2 + (n2[1]-n1[1])**2 ));
            map.get(pointA).push({connectsTo: pointB, weight: weight});
            map.get(pointB).push({connectsTo: pointA, weight: weight});
        }
    }

    pointInMap(point, index, map) {
        let found = false;
        map.get(index).forEach( (obj) => {
            if (point === obj.connectsTo) {
                found = true;
            }
        });
        return found;
    }

    initGrid(rows, columns, width, height) {
        let grid = [];
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < columns; y++) {
                grid[x+y*rows] = [x, y];
            }
        }
        return this.scatter(grid, rows, columns, width, height)
    }

    scatter(grid, rows, cols, width, height) {
        for (let x = 0; x<rows; x++) {
            for (let y = 0; y<cols; y++) {
                let idx = x+y*rows;
                grid[idx] = this.randomizePoint(grid[idx], x, y, rows, cols, width, height);
            }
        }
        return grid;
    }

    randomizePoint(point, i, j, r, c, w, h) {
        let xd = w/c;
        let yd = h/r;
        let p = 0.4;
        let rdm = rndm.seedRange;
        let idx = i+j*r;
        return [Math.floor(point[0]+xd*i+rdm(-p, p)*xd), Math.floor(point[1]+yd*j+rdm(-p, p)*yd)];
    }

}