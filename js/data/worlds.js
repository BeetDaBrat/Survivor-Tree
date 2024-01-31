var worldData = [
    //name, spawntime (seconds), spawn [index, chance, buyableid]
    {
        name: "Limbo",
        spawnTime: 1, 
        spawn: [
            {
                id: -1,
                weight: 0,
            }
        ],
    },       
    {
        name: "Plains",
        spawnTime: 5, 
        spawn: [
            {
                slot: 0,
                id: 1, //Rat Id
                weight: 50,
            },
            {
                slot: 1,
                id: 2, //Snake Id
                weight: 25,
            },
            {
                slot: 2,
                id: 1,
                weight: 50,
            },

        ],
    },       
    {
        name: "Cave",
        spawnTime: 3, 
        spawn: [
            {
                slot: 0,
                id: 3,
                weight: 100,
            },
            {
                slot: 1,
                id: 3,
                weight: 100,
            },
            {
                slot: 2,
                id: 4,
                weight: 67,
            },
            {
                slot: 3,
                id: 4,
                weight: 67,
            },
        ],
    },       
]

function spawnEnemy(s){ //s = spawn
    let selection = getWeightedObject(worldData[player.currentWorld].spawn)
    let enemy = enemyData[selection.id]; // Grab enemy data using the id
    let chosenslot = selection.slot;

    if(player.enemies[chosenslot].id == 0){
        enemy = player.enemies[chosenslot] = Object.assign({}, enemy); // make a unique copy
    }else{
        enemy = player.enemies[chosenslot]
    }

    let buyableid = getBuyableID(enemy.buyable, chosenslot);  // Use buyable id based on slot in spawn
    
    enemy.healthPool = enemy.healthPool.add(enemy.health.times(Decimal.floor(Decimal.pow(player.points, 0.3)))); // Add helath to the pool based on survival time
    setBuyableAmount('s', buyableid, enemy.healthPool.div(enemy.health).ceil()); // update visuals using a buyable slot
}

function getBuyableID(base, index){
    return base + (index  > 2 ? 10 + index % 3 : index % 3);
}

function getSpawnQuntity(){
    return Decimal.floor(Decimal.pow(player.points, 0.3));
}

function getWeightedObject(wt){ //weighted table array, requires weight property
    let sorted = wt.sort((a, b) => b.weighted - a.weight)
    let totalWeight = 0;
    let total = 0;
    let roll = Math.random();

    sorted.forEach(element => {
        totalWeight += element.weight;
    });

    for(const element of sorted) {
        total += element.weight / totalWeight;
        if(roll <= total){
            return element;
        }
    };

    return null;
}
