addLayer("c", {
    name: "Class", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
        unlocked: true,
		points: new Decimal(1),
    }},
    branches: ['s'],
    color: "#2222D0",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Choice", // Name of prestige currency
    baseResource: "Survival Time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = 0;
        return gain
    },
    layerShown(){return true},
    tabFormat: {
        "Class Select": {
            content: 
            [
                ["blank", "125px"],
                "clickables"
            ],
        },
    },
    clickables: {
        11: {
            display() { return player.classid == 1 ? "Warrior(Selected)" : "Warrior" },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = 1;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[1], true)
            },
            tooltip(){ return classToolTip(classData[1]) }
        },
        12: {
            display() { return player.classid == 2 ? "Archer(Selected)" : "Archer" },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = 2;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[2], true)
            },
            tooltip(){ return classToolTip(classData[2]) }
        },
        21: {
            display() { return player.classid == 3 ? "Sorcerer(Selected)" : "Sorcerer" },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = 3;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[3], true)
            },
            tooltip(){ return classToolTip(classData[3]) }
        },
        22: {
            display() { return player.classid == 4 ? "Berserker(Selected)" : "Berserker" },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = 4;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[4], true)
            },
            tooltip(){ return classToolTip(classData[4]) }
        },
    },
})

addLayer("s", {
    name: "Survivor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked : false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Survivor", // Name of prestige currency
    baseResource: "Class Choice", // Name of resource prestige is based on
    baseAmount() {return player['c'].points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        //if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        //if (hasMilestone('e', 1)) mult = mult.times(milestoneEffect('e', 1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = 0;
        return gain
    },
    prestigeNotify() { return false },
    layerShown(){return true},
    
    update(diff){
        if(player.currentWorld != 0){
            if(player.spawnTimer <= 0){
                player.spawnTimer += worldData[player.currentWorld].spawnTime
                let enemy = enemyData[worldData[player.currentWorld].spawn[0].id]
                let buyableid = enemy.buyable
                enemy.healthPool = enemy.healthPool.add(enemy.health.times(Decimal.floor(Decimal.pow(player.points, 0.3))))
                setBuyableAmount(this.layer, buyableid, Decimal.ceil(enemy.healthPool.div(enemy.health)))

            }
            player.spawnTimer -= diff
        
            player.health = player.health.minus(buyableEffect(this.layer, enemyData[worldData[player.currentWorld].spawn[0].id].buyable).times(diff))
            if(player.health.lte(0)){
                worldData[player.currentWorld].spawn.forEach(s => {
                    enemyData[s.id].healthPool= new Decimal(0)
                });
                layerDataReset(this.layer)
                layerDataReset('c')
                player.points = new Decimal(0)
                player.classid = 0
                player.currentWorld = 0
                player.level = new Decimal(1)
                player.experience = new Decimal(0)
                player.tnl = getExpForNextLevel(player.level)

                resetWeapons()
            }
            else{
                let spawn = worldData[player.currentWorld].spawn
                player.weapons.forEach(weapon => {
                    if(weapon != null){
                        weapon.cooldownTimer += diff
                        if(weapon.cooldownTimer >= getCooldown(weapon, player.dexterity)){
                            weapon.cooldownTimer -= getCooldown(weapon, player.dexterity)
                            let piercing = weapon.piercing[weapon.level]
                            let attack = getDamage(weapon, player.strength, player.intelligence)
                            for(i = 0; i < spawn.length && i <= piercing; ++i){
                                let enemy = enemyData[spawn[i].id]
                                let buyableid = enemy.buyable
                                if(enemy.healthPool.gt(0)){
                                    
                                    enemy.healthPool = Decimal.max(enemy.healthPool.minus(attack), 0)
                                    let spawncount = getBuyableAmount(this.layer, buyableid)
                                    let newcount = Decimal.ceil(enemy.healthPool.div(enemy.health))

                                    setBuyableAmount(this.layer, buyableid, Decimal.ceil(enemy.healthPool.div(enemy.health)))

                                    let experience = enemy.experience.times(spawncount.minus(newcount))
                                    player.experience = player.experience.add(experience)

                                    while(player.experience.gte(player.tnl)){
                                        player.experience = player.experience.minus(player.tnl)
                                        player.level = player.level.add(1)
                                        player.tnl = getExpForNextLevel(player.level)
                                        updateStats(player.level, classData[player.classid])
                                    }
                                }
                            }
                        }

                    }
                })
            }

        }
    },
    
    tabFormat: {
        "Survivor": {
            content: [
                ["row",
                    [
                        ["display-text", function(){ return classData[player.classid].name }, { "font-size" : "24px" }]
                    ],
                ],
                ["row",
                    [
                        ["bar", "expBar"]
                    ],
                ],
                ["row",
                    [
                        ["bar", "healthBar"], ["bar", "manaBar"]
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Strength: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.strength)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Dexterty: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.dexterity)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Agility: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.agility)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Constitution: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.constitution)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Intelligence: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.intelligence)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["blank", "32px"],
                ["display-text", "Equipment: ", {"color": "silver", "font-size": "24px"}],
                "grid",
                ["blank", "32px"],
                "clickables",
                ["blank", "32px"],
                "buyables",
            ],
        },
    },

    bars: {
        healthBar: {
            fillStyle: {'background-color' : "#FE0102"},
            baseStyle: {'background-color' : "#222222"},
            textStyle: {'text-shadow': '0px 0px 6px #000000'},
            
            direction: RIGHT,
            width: 250,
            height: 32,
            progress() 
            {   
                return player.health.div(player.healthMax)  
            },
            display() { return "Health: " + formatWhole(player.health) + "/" + formatWhole(player.healthMax) },
        },
        manaBar: {
            fillStyle: {'background-color' : "#0201FE"},
            baseStyle: {'background-color' : "#222222"},
            textStyle: {'text-shadow': '0px 0px 6px #000000'},
            direction: RIGHT,
            width: 250,
            height: 32,
            progress() 
            {   
                return player.mana.div(player.manaMax)  
            },
            display() { return "Mana: " + formatWhole(player.mana) + "/" + formatWhole(player.manaMax) },
        },
        expBar: {
            fillStyle: {'background-color' : "#02FEFE"},
            baseStyle: {'background-color' : "#222222"},
            textStyle: {'text-shadow': '0px 0px 6px #000000'},
            direction: RIGHT,
            width: 500,
            height: 32,
            progress() 
            {   
                return player.experience.div(player.tnl)
            },
            display() { return "Level: " + player.level + "(" + format(player.experience) + "/" + formatWhole(player.tnl) + ")" },
        },
    },

    grid: {
        rows: 2,
        cols: 6,
        getStartData(id){
            return null
        },
        getTitle(data, id){
            title = "Empty"
            if(data != null)
               title = data.name + "<br/>Level: " + (data.level + 1)
            return title
        },
        getStyle(data, id) {
            if(data instanceof Weapon){
                let pct = (data.cooldownTimer * 100 / data.cooldown)
                return {'background': 'linear-gradient(to top, #FC0 ' + 0 + '%, #333 '+ pct +'%)'}
            }
            return {'background-color': '#444444'}
        },
        getTooltip(data, id){
            if(data instanceof Weapon){
                return data.name 
                    + "<br/>Damage: " + format(getDamage(data, player.strength, player.intelligence))
                    + "<br/>Cooldown: " + format(getCooldown(data, player.dexterity))
                    
            }
            return ""
        }
    },

    clickables: {
        11: {
            display() { return player.currentWorld == 1 ? worldData[1].name + "(Selected)" : worldData[1].name },
            canClick() { return player.currentWorld == 0 && player.health.gt(0) },
            onClick() {
                player.currentWorld = 1
                player.spawnTimer = worldData[player.currentWorld].spawnTime
            },
        },
        12: {
            display() { return player.currentWorld == 2 ? worldData[2].name + "(Selected)" : worldData[2].name },
            canClick() { return player.currentWorld == 0 && player.health.gt(0) },
            onClick() {
                player.currentWorld = 2
                player.spawnTimer = worldData[player.currentWorld].spawnTime
            },
        },
    },
    buyables: {
        11: {
            style: {'background-color' : "grey"},
            cost(x) { return new Decimal(0) },
            title(){ return enemyData[0].name + " x" + getBuyableAmount(this.layer, this.id) },
            display() { 
                return "Health:" + format(enemyData[0].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {},
            effect(){
                return enemyData[0].dps.times(getBuyableAmount(this.layer, this.id)) 
            },
            unlocked(){
                if(player.currentWorld != 0){
                    return worldData[player.currentWorld].spawn.find((s) => enemyData[s.id].buyable == this.id)
                }
                else{
                    return false
                }
            }
        },
    }
})
