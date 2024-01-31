var enemyData = [
    //name, health, experience, dps
    {
        id: 0,
        name: "Blank", 
        health: new Decimal(0),
        healthPool: new Decimal(0),
        experience: new Decimal(0),
        dps: new Decimal(0.0),
        buyable: 11,
        gold: new Decimal(0),
        color: "black",
    },       
    {
        id: 1,
        name: "Rat", 
        health: new Decimal(10),
        healthPool: new Decimal(0),
        experience: new Decimal(2),
        dps: new Decimal(0.1),
        buyable: 11,
        gold: new Decimal(2),
        color: "grey",
    },       
    {
        id: 2,
        name: "Snake", 
        health: new Decimal(13),
        healthPool: new Decimal(0),
        experience: new Decimal(3),
        dps: new Decimal(0.125),
        buyable: 11,
        gold: new Decimal(2),
        color: "green",
    },       
    {
        id: 3,
        name: "Worm", 
        health: new Decimal(30),
        healthPool: new Decimal(0),
        experience: new Decimal(6),
        dps: new Decimal(1/3),
        buyable: 11,
        gold: new Decimal(5),
        color: "brown",
    },       
    {
        id: 4,
        name: "Cave Rat", 
        health: new Decimal(55),
        healthPool: new Decimal(0),
        experience: new Decimal(10),
        dps: new Decimal(0.45),
        buyable: 11,
        gold: new Decimal(8),
        color: "#CC7722",
    },       


]

function getEnemyDPS(spawn)  {
    let takenDamage = new Decimal(0);
    
    for(i = 0; i < spawn.length; ++i){
        if(player.enemies[i].id != 0){
            takenDamage = takenDamage.add(buyableEffect('s', getBuyableID(11, i)));
        }
    }

    takenDamage = takenDamage.times(getDamageReduction(player.constitution));
    return takenDamage;
}