addLayer("e", {
    name: "Experience Shard", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ES", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Experience Shard", // Name of prestige currency
    baseResource: "Survival Time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        if (hasUpgrade('e', 14)) mult = mult.times(2)
        if (hasUpgrade('e', 21)) mult = mult.times(upgradeEffect('e', 21))
        
        if (hasUpgrade('v', 11)) mult = mult.times(2)
        
        if (hasMilestone('e', 1)) mult = mult.times(milestoneEffect('e', 1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = 0;
        if (hasMilestone('e', 2)) gain += 0.1
        
        if (hasMilestone('v', 0)) gain += 0.9
        return gain
    },
    hotkeys: [
        {key: "e", description: "E: Reset for Exprience Shards", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Leveling Up",
            description: "Double your Survival Time gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Another Level",
            description: "Increase Survival Time gain based on Experience Shards.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.pow(0.5).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Unlocked New Powerup",
            description: "Increase Experience Shard gain based on Survival Time.",
            cost: new Decimal(10),
            effect() {
                return player.points.pow(0.10).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Found Common Accessory",
            description: "Double Experience Shard gain.",
            cost: new Decimal(25),
        },
        15: {
            title: "Reached Level 10",
            description: "Increase Survival Time based on Survival Time",
            cost: new Decimal(625),
            effect() {
                return Decimal.log10(player.points.max(1)).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Found Uncommon Weapon",
            description: "Increase Experience Shards gain based on Survival Time",
            cost: new Decimal(25000),
            effect() {
                return Decimal.log10(player.points.max(1)).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Unlocked New Ability",
            description: "10x Survival Time gain",
            cost: new Decimal(500000),
            effect() {
                return new Decimal(10)
            },
        },

    },
    milestones: {
        0: {
            requirementDescription: "100 Experience Shards",
            effectDescription() { return "Triple Survival Time gain." },
            done() { return player[this.layer].points.gte(100) },
            effect() {
                return new Decimal(3);
            }
        },
        1: {
            requirementDescription: "10000 Experience Shards",
            effectDescription() { return "Increase Experience Shard gain based on Experience Shards.<br/>" + format(milestoneEffect(this.layer, this.id))+"x" },
            done() { return player[this.layer].points.gte(10000) },
            effect() {
                return new Decimal(player[this.layer].points.pow(0.10).max(1));
            }
        },
        2: {
            requirementDescription: "2e6 Experience Shards",
            effectDescription: "Automatically generate 10% of Experience Shards per second.",
            done() { return player[this.layer].points.gte(2e6) || player['v'].best.gte(1) }
        }
    },
})

addLayer("v", {
    name: "Vampire Gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "VG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1e7), // Can be a function that takes requirement increases into account
    resource: "Vampire Gold", // Name of prestige currency
    baseResource: "Experience Shards", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('v', 13)) mult = mult.times(upgradeEffect('v', 13))
        if (hasUpgrade('v', 14)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = 0;
        return gain
    },
    hotkeys: [
        {
            key: "s", description: "S: Reset for Scouting Distance", onPress(){
                if (canReset(this.layer)){ 
                    doReset(this.layer)
                    doReset(v)
                }
                
            }
        },
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Begin Search",
            description: "Double Experience Shard gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Continue Search",
            description: "Increase Survival Time gain based on Vampire Gold.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.pow(0.5).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Still Havent Found",
            description: "Increase Vampire Gold gain based on Survival Time.",
            cost: new Decimal(5),
            effect() {
                return player.points.pow(0.15).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "What I'm Looking For",
            description: "Triple Vampire Gold gain.",
            cost: new Decimal(25),
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Vampire Gold",
            effectDescription: "Automatically generate 100% of Experience Shards per second.",
            done() { return player.v.points.gte(100) }
        }
    },
})
