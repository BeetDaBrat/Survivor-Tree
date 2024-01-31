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
            classid: 1,
            display() { return player.classid == this.classid ? classData[this.classid].name + "(Selected)" : classData[this.classid].name },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = this.classid;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[this.classid], true)
                addWeapon(classData[this.classid].startingWeapon)
            },
            tooltip(){ return classToolTip(classData[this.classid]) }
        },
        12: {
            classid: 2,
            display() { return player.classid == this.classid ?  classData[this.classid].name + "(Selected)" : classData[this.classid].name },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = this.classid;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[this.classid], true)
                addWeapon(classData[this.classid].startingWeapon)
            },
            tooltip(){ return classToolTip(classData[this.classid]) }
        },
        21: {
            classid: 3,
            display() { return player.classid == this.classid ?  classData[this.classid].name + "(Selected)" : classData[this.classid].name },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = this.classid;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[this.classid], true)
                addWeapon(classData[this.classid].startingWeapon)
            },
            tooltip(){ return classToolTip(classData[this.classid]) }
        },
        22: {
            classid: 4,
            display() { return player.classid == this.classid ?  classData[this.classid].name + "(Selected)" : classData[this.classid].name },
            canClick() { return player.classid == 0 },
            onClick() {
                player.classid = this.classid;
                player['s'].unlocked = true;
                player['s'].points = new Decimal(1);
                updateStats(1, classData[this.classid], true)
                addWeapon(classData[this.classid].startingWeapon)
            },
            tooltip(){ return classToolTip(classData[this.classid]) }
        },
    },
})

addLayer("a", {
    tooltip(){ return "Achievements" },
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CCCCCC",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Achievements", // Name of prestige currency
    baseResource: "Achievements", // Name of resource prestige is based on
    baseAmount() {return this.layer.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
    layerShown(){ return true; },
    achievements :{
        11: {
            complete() { return hasAchievement(this.layer, this.id) },
            name: "Warrior Survival I",
            tooltip: function() {
                let tt = "Survive as the Warrior for 5 minutes.<br/>"
                + formatTime(this.complete() ? 300 : player.points * (player.classid == 1)) + "/" + formatTime(300);
                
                if(this.complete()){
                    tt += "<br/><br/>Reward:<br/>" 
                    + this.effect().health + "x health "
                    + this.effect().strength + "x strength "
                    + this.effect().constitution + "x constitution "
                    + "for the Warrior.";
                }

                return tt;
            },
            done(){ return player.points.gte(300) && player.classid == 1 },
            effect() {
                if(this.complete() && player.classid == 1){
                    return {
                        health: new Decimal(1.2),
                        strength: new Decimal(1.1),
                        constitution: new Decimal(1.25),
                    }
                }else{
                    return {
                        health: new Decimal(1),
                        strength: new Decimal(1),
                        constitution: new Decimal(1),
                    }
                }
            },
        },
        12: {
            complete() { return hasAchievement(this.layer, this.id) },
            name: "Archer Survival I",
            tooltip: function() {
                let tt = "Survive as the Archer for 5 minutes.<br/>"
                + formatTime(this.complete() ? 300 : player.points * (player.classid == 2)) + "/" + formatTime(300);
                
                if(this.complete()){
                    tt += "<br/><br/>Reward:<br/>" 
                    + this.effect().health + "x health "
                    + this.effect().dexterity + "x dexterity "
                    + this.effect().luck + "x luck "
                    + "for the Archer.";
                }

                return tt;
            },
            done(){ return player.points.gte(300) && player.classid == 2 },
            effect() { 
                if(this.complete() && player.classid == 2){
                    return {
                        health: new Decimal(1.1),
                        dexterity: new Decimal(1.25),
                        luck: new Decimal(1.2),
                    }
                }else{
                    return {
                        health: new Decimal(1),
                        dexterity: new Decimal(1),
                        luck: new Decimal(1),
                    }
                }
            },
        },
    }
})

addLayer("g", {
    tooltip(){ return "Gold:" + player.gold },
    name: "Meta Progression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#D0AA44",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Meta-Points", // Name of prestige currency
    baseResource: "Gold", // Name of resource prestige is based on
    baseAmount() {return player.gold}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
    layerShown(){return player.currentWorld == 0},
    tabFormat: {
        "Gold Progression": {
        content:[
        ["display-text", function() { return "Gold: " + player.gold }, { "font-size": "32px" } ],
        "blank",
        "buyables",
        ],
        }
    },
    buyables: {
        11: {
            purchaseLimit: 100,
            style() { 
                return this.canAfford() ? { 'background-color' :  "#AA9988" } : { 'background-color' :  "#333333" };
            },
            cost(x) { return x.times(5).add(5) },
            title(){ return "Weight Lifting" },
            display() { 
                return "Strength is increased by " + buyableEffect(this.layer, this.id) + "%.<br/>"
                     + this.cost() + " Gold<br/>"
                     + getBuyableAmount(this.layer, this.id)  + "/" + this.purchaseLimit
            },
            canAfford() { return player.gold.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer, this.id).times(10)
            },
            unlocked(){
                return true;
            },
            buy() {
                player.gold = player.gold.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                updateStats(player.level, classData[player.classid])
            },
        },
        12: {
            purchaseLimit: 100,
            style() { 
                return this.canAfford() ? { 'background-color' :  "#88AA88" } : { 'background-color' :  "#333333" };
            },
            cost(x) { return x.times(5).add(5) },
            title(){ return "Writing" },
            display() { 
                return "Dexterty is increased by " + buyableEffect(this.layer, this.id) + "%.<br/>"
                     + this.cost() + " Gold<br/>"
                     + getBuyableAmount(this.layer, this.id)  + "/" + this.purchaseLimit
            },
            canAfford() { return player.gold.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer, this.id).times(10)
            },
            unlocked(){
                return true;
            },
            buy() {
                player.gold = player.gold.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                updateStats(player.level, classData[player.classid])
            },
        },
        13: {
            purchaseLimit: 100,
            style() { 
                return this.canAfford() ? { 'background-color' :  "#AAAA88" } : { 'background-color' :  "#333333" };
            },
            cost(x) { return x.times(5).add(5) },
            title(){ return "Sparring" },
            display() { 
                return "Constitution is increased by " + buyableEffect(this.layer, this.id) + "%.<br/>"
                     + this.cost() + " Gold<br/>"
                     + getBuyableAmount(this.layer, this.id)  + "/" + this.purchaseLimit
            },
            canAfford() { return player.gold.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer, this.id).times(10)
            },
            unlocked(){
                return true;
            },
            buy() {
                player.gold = player.gold.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                updateStats(player.level, classData[player.classid])
            },
        },
        14: {
            purchaseLimit: 100,
            style() { 
                return this.canAfford() ? { 'background-color' :  "#8888AA" } : { 'background-color' :  "#333333" };
            },
            cost(x) { return x.times(5).add(5) },
            title(){ return "Reading" },
            display() { 
                return "Intelligence is increased by " + buyableEffect(this.layer, this.id) + "%.<br/>"
                     + this.cost() + " Gold<br/>"
                     + getBuyableAmount(this.layer, this.id)  + "/" + this.purchaseLimit
            },
            canAfford() { return player.gold.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer, this.id).times(10)
            },
            unlocked(){
                return true;
            },
            buy() {
                player.gold = player.gold.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                updateStats(player.level, classData[player.classid])
            },
        },
        15: {
            purchaseLimit: 100,
            style() { 
                return this.canAfford() ? { 'background-color' :  "#AA88AA" } : { 'background-color' :  "#333333" };
            },
            cost(x) { return x.times(5).add(5) },
            title(){ return "Bargaining" },
            display() { 
                return "Luck is increased by " + buyableEffect(this.layer, this.id) + "%.<br/>"
                     + this.cost() + " Gold<br/>"
                     + getBuyableAmount(this.layer, this.id)  + "/" + this.purchaseLimit
            },
            canAfford() { return player.gold.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer, this.id).times(10)
            },
            unlocked(){
                return true;
            },
            buy() {
                player.gold = player.gold.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                updateStats(player.level, classData[player.classid])
            },
        },
    }
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
            // Handle enemy spawning
            let spawn = worldData[player.currentWorld].spawn
            if(player.spawnTimer <= 0){
                player.spawnTimer += worldData[player.currentWorld].spawnTime;
                spawnEnemy(spawn);
            }
            player.spawnTimer -= diff
        
            // Handle player death and taking damage
            let takenDamage = getEnemyDPS(spawn);            
            
            this.bars.healthBar.enemyDPS = takenDamage;
            
            player.health = player.health.minus(takenDamage.times(diff))
            if(player.health.lte(0)){
                layerDataReset(this.layer)
                layerDataReset('c')

                onDied();
            }
            else{
                // Handle weapon attacks
                player.weapons.forEach(weapon => {
                    if(weapon != null){
                        weapon.cooldownTimer += diff
                        if(weapon.cooldownTimer >= getCooldown(weapon, player.dexterity)){
                            weapon.cooldownTimer -= getCooldown(weapon, player.dexterity)
                            
                            onAttack(weapon, spawn);
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
                    ["column", [["display-text", function() { return + format(player.strength.add(100)) + "% PAtk"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Dexterty: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.dexterity)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return + format(new Decimal(1).minus(new Decimal(1).div(player.dexterity.pow(0.5).div(100).add(1))).times(100)) + "% CRed"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Constitution: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.constitution)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return + format(new Decimal(100).minus(getDamageReduction(player.constitution).times(100))) + "% DRed"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Intelligence: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.intelligence)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return + format(player.intelligence.add(100)) + "% MAtk"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Luck: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return formatWhole(player.luck)}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return + format(getCritChance(player.luck) * 100) + "% CrCh"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],
                ["row",
                    [
                    ["column", [["display-text", "Crit Mult: ", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", "", {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ["column", [["display-text", function() { return + format(classData[player.classid].critMult) + "x"}, {"color": "silver", "font-size": "24px"}]], {'width': '200px'}],
                    ],
                ],

                ["blank", "16px"],
                ["display-text", "Equipment: ", {"color": "silver", "font-size": "20px"}],
                ["blank", "16px"],
                "grid",
                ["bar", "spawnBar"],
                ["blank", "16px"],
                "buyables",
                ["blank", "16px"],
                "clickables",
            ],
        },
    },

    bars: {
        healthBar: {
            enemyDPS: new Decimal(0),
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
            display() { return "Health: " + formatWhole(player.health) + "/" + formatWhole(player.healthMax) + " -" + format(this.enemyDPS) + "/s" },
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
        spawnBar: {
            fillStyle: {'background-color' : "#02FEFE"},
            baseStyle: {'background-color' : "#228888"},
            textStyle: {'text-shadow': '0px 0px 6px #000000'},
            direction: RIGHT,
            width: 500,
            height: 32,
            progress() 
            {   
                return 1 - player.spawnTimer / worldData[player.currentWorld].spawnTime;
            },
            display() { return "Spawn " + formatWhole(getSpawnQuntity()) + " enemies." },
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
            let tt = ""
            if(data instanceof Weapon){
                tt = data.name 
                    + "<br/>Damage: " + format(getDamage(data, player.strength, player.intelligence, player.luck.times(0)))
                    + "<br/>Cooldown: " + format(getCooldown(data, player.dexterity))
                    + "<br/>Piercing: " + format(data.piercing[data.level])
                    
            }
            return tt
        }
    },

    clickables: {
        11: {
            worldid: 1,
            display() { return player.currentWorld == this.worldid ? worldData[this.worldid].name + "(Selected)" : worldData[1].name },
            canClick() { return player.currentWorld == 0 && player.health.gt(0) },
            onClick() {
                player.currentWorld = this.worldid
                player.spawnTimer = worldData[player.currentWorld].spawnTime
            },
            unlocked(){ return player.currentWorld == 0 || player.currentWorld == this.worldid }
        },
        12: {
            worldid: 2,
            display() { return player.currentWorld == this.worldid ? worldData[this.worldid].name + "(Selected)" : worldData[2].name },
            canClick() { return player.currentWorld == 0 && player.health.gt(0) },
            onClick() {
                player.currentWorld = this.worldid
                player.spawnTimer = worldData[player.currentWorld].spawnTime
            },
            unlocked(){ return player.currentWorld == 0 || player.currentWorld == this.worldid }
        },
    },
    buyables: {
        11: {
            enemySlot: 0,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0;
            }
        },
        12: {
            enemySlot: 1,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0
            }
        },
        13: {
            enemySlot: 2,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0
            }
        },
        21: {
            enemySlot: 3,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0
            }
        },
        22: {
            enemySlot: 4,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0
            }
        },
        23: {
            enemySlot: 5,
            style: function() {
                if(this.unlocked()) {
                    return {'background-color' : player.enemies[this.enemySlot].color}
                }
                else{
                    return ""
                }
            },
            cost(x) { return new Decimal(0) },
            title(){
                if(this.unlocked()){
                    return player.enemies[this.enemySlot].name + " x" + getBuyableAmount(this.layer, this.id) 
                }
                else {
                    return "Empty"
                }
            },
            display() {
                if(this.unlocked()){ 
                    return "Health:" + format(player.enemies[this.enemySlot].healthPool) +
                        "<br/>DPS: " +  format(this.effect())
                }
                else{
                    return "Empty"
                }
            },
            canAfford() { return true },
            buy() {},
            effect(){
                if(this.unlocked()){
                    //console.log(player.enemies[0])
                    return player.enemies[this.enemySlot].dps.times(getBuyableAmount(this.layer, this.id)) 
                }
                else {
                    return new Decimal(0)
                }
            },
            unlocked(){
                return player.currentWorld != 0 && player.enemies[this.enemySlot].id != 0
            }
        },
    }
})
