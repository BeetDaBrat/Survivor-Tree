const damageType = Object.freeze({
    PHYS: 1,
    MAG: 2,
});

class Weapon{
    constructor(id, name, attack, cooldown, piercing, damageType, manaCost, regenHealth, regenMana, vampHealth, vampMana){
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.cooldown = cooldown;
        this.piercing = piercing;
        this.damageType = damageType;
        this.manaCost = manaCost;
        this.regenHealth = regenHealth;
        this.regenMana = regenMana;
        this.vampHealth = vampHealth;
        this.vampMana = vampMana;
        this.cooldownTimer = 0;
        this.level = 0
    }
}

var weaponData = [
    //id, name, attack, cooldown, piercing, damagetype, manacost,
    //  regen, manaregen, healthvamp, manavamp
    new Weapon(0, "Sword", [new Decimal(10)], [2], [new Decimal(0)], damageType.PHYS, [new Decimal(0)],
        [new Decimal(0)], [new Decimal(0)], [new Decimal(0)], [new Decimal(0)]),
    new Weapon(1, "Bow", [new Decimal(7)], [1.5], [new Decimal(1)],  damageType.PHYS, [new Decimal(0)],
        [new Decimal(0)], [new Decimal(0)], [new Decimal(0)], [new Decimal(0)]),       
    new Weapon(2, "Staff", [new Decimal(7)], [1.75], [new Decimal(1)], damageType.MAG, [new Decimal(1)],
        [new Decimal(0)], [new Decimal(0.15)], [new Decimal(0)], [new Decimal()]),       
    new Weapon(3, "Axe", [new Decimal(15)], [2.67], [new Decimal(0)], damageType.PHYS, [new Decimal(0)],
        [new Decimal(0)],  [new Decimal(0)], [new Decimal(0)], [new Decimal(0)]),       
]
