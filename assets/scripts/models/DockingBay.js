export default class DockingBay {
   
    /* The constructor for the Docking Bay. Instantiated by any orbital that can be landed on.
     * @param maxBays {integer} - maximum number of docking bays
    */
    constructor(maxBays, planetName) {
        this.maxBays = maxBays;
        this.availableBays = maxBays;
        this.orbitalName = planetName
    }

    processLandingRequest(ship) {
        console.log(ship.playerData);
        console.log(`${this.orbitalName}: Processing landing request for: ${ship.playerData[0].pilotName}.`);
    }
}