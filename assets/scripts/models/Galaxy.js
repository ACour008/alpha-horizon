import StarSystem from "StarSystem";
import GraphData from "../generators/GraphData";
// 1px = 1 ly. May change later.

export default class Galaxy {

    constructor(size) {
        this.width = size.width;
        this.height = size.height;
        this.starSystems = [];
    }

    // GETTERS AND SETTERS
    getAllStarSystems() { return this.starSystems; }
    getStarSystemAt(index) { return this.starSystems[index]; }

    generate(maxSystems, gridSize, probabilities) {
        let graphData = GraphData.place(this.width, this.height, gridSize, probabilities.graphEdge);
        // Create star Systems
        for (let i = 0; i < maxSystems; i++) {
            let posData = graphData.nodePositions[i];
            let pos = cc.v2(posData[0], posData[1]);
            let edges = graphData.edges.get(i);

            let starSystem = new StarSystem(i, `StarSystem_${i}`, pos, edges);
            this.starSystems.push(starSystem);
        }
        this.edges = graphData.edges;
    }

    getShortestPaths(maxSys) {
        // Dijkstra's Algorithm
        // everytime we set out to visit a new node, choose the neighbor w the smallest cost
        // once moved to that node, check each of its neighboring nodes
        // for each neighboring node, calc the cost by summing the cost of the edges that lead to the node we're checking from the starting node
        // if the cost is less than a known distance, update the shortest cost that is on file for that node
    }
}