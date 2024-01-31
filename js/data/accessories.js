var accesoryData = [
    //name, defense, regen, manaregen, healthvamp, manavamp
        {
            id: 1,
            maxLevel: 5,
            level: 0,
            name: "Armor", 
            description: function() { return "Increases Defense.<br/> Defense: " + formatWhole(this.defense[this.level]) + "<br/> Health: " + this.statModifiers[statType.HEALTH][this.level] + "x" },
            defense: [new Decimal(10), new Decimal(15), new Decimal(20), new Decimal(25), new Decimal(30)], // flat damage reduction calculated before DR%
            regenHealth: new Decimal(0), // health gained per second
            regenMana: new Decimal(0), // mana gained per second
            vampHealth: new Decimal(0), // % damage converted to restoring health
            vampManma: new Decimal(0), // % damage converted to restoring mana
            statModifiers: { [statType.HEALTH]: [ new Decimal(1.1), new Decimal(1.15), new Decimal(1.2), new Decimal(1.25), new Decimal(1.3) ] },
            // array that increases stats (separate multiplier)
        }
]
