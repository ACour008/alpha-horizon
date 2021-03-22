const StarType = cc.Enum({
    // mass (kg)        // radius (km)          // px
BLUE: 0,            // 1.193e32         1, 044, 000             8960 px
WHITE: 1,           // 3.205e30         904,800                 1664 px
ORANGE: 2,          // 1.885e30         696,000                 1280 px
RED: 3,             // 5.655e29         278, 400                512 px
});

const PlanetType = cc.Enum( {
    //                   // MASS (km)                     // SCREEN (px)      // RADIUS (km)
    ASTEROIDAL: 0,     // 5.972e16 kg max.              16 px               0 - 1000
    MERCURIAN: 1,      // 5.972e16 - 5.972e23           32 - 64 px          1000  - 2500 km
    SUBTERRAN: 2,      // 5.972e23 kg - 2.986e24        64 - 96 px          2500 - 3,250 km
    TERRAN: 3,         // 2.986e24 kg -  1.1944e25 kg   96 - 128 px         3,250 - 6,500 km
    SUPERTERRAN: 4,    // 1.1944e25 kg - 5.972e25       128 -  160 px       65,00 - 13,000 km
    NEPTUNIAN: 5,      // 5.972e37 kg - 2.986e26        192 - 224 px        13,000 - 24,800 km
    JOVIAN: 6          // 2.986e26 - 2.986e28           224 - 256 px        24,800 - 71,500 km (radius)
});

const OrbitalType = cc.Enum({
    ASTEROID: 0,
    MOON: 1,
    JUMPGATE: 2,
    PLANET: 3,
    STAR: 4,
});

const JumpGateType = cc.Enum ({
    SPHERE: 0,
    CITY: 1,
    SQUIDHEAD: 2
});

export default {
    OrbitalType,
    PlanetType,
    JumpGateType,
    StarType
}