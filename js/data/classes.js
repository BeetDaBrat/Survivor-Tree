const statType = Object.freeze({
  HEALTH: 1,
  MANA: 2,
  STRENGTH: 3,
  DEXTERITY: 4,
  CONSTITUTION: 5,
  INTELLIGENCE: 6,
  LUCK: 7,
  HPL: 8,
  MPL: 9,
  SPL: 10,
  DPL: 11,
  CPL: 12,
  IPL: 13,
  LPL: 14,
  EXPERIENCE: 15,
  EPL: 15,
  GOLD: 16,
  GPL: 17,
  HEALTHMAX: 18,
  MANAMAX: 19,
});

var classData = [
    //classname, healthmax, manamax, strength, dexterity, agility, constitution, intelligence, and per level amounts
    { 
        name : "<No Class>",
        health: new Decimal(10),
        mana: new Decimal(10),
        strength: new Decimal(10), 
        dexterity: new Decimal(10), 
        luck: new Decimal(10), 
        constitution: new Decimal(10), 
        intelligence: new Decimal(10),
        hpl: new Decimal(0), 
        mpl: new Decimal(0), 
        spl: new Decimal(0), 
        dpl: new Decimal(0), 
        lpl: new Decimal(0), 
        cpl: new Decimal(0), 
        ipl: new Decimal(0),
        startingWeapon : -1,
        critMult: new Decimal(1),
    },
    { 
        name : "Warrior",
        health: new Decimal(50),
        mana: new Decimal(10),
        strength: new Decimal(10), 
        dexterity: new Decimal(5), 
        luck: new Decimal(5), 
        constitution: new Decimal(10), 
        intelligence: new Decimal(5),
        hpl: new Decimal(6), 
        mpl: new Decimal(2), 
        spl: new Decimal(6), 
        dpl: new Decimal(2), 
        lpl: new Decimal(1), 
        cpl: new Decimal(4), 
        ipl: new Decimal(1),
        startingWeapon : 0,
        critMult: new Decimal(2),
    },
    { 
        name : "Archer",
        health: new Decimal(40),
        mana: new Decimal(15),
        strength: new Decimal(5), 
        dexterity: new Decimal(10), 
        luck: new Decimal(10), 
        constitution: new Decimal(5), 
        intelligence: new Decimal(5),
        hpl: new Decimal(4), 
        mpl: new Decimal(3), 
        spl: new Decimal(2), 
        dpl: new Decimal(5), 
        lpl: new Decimal(4), 
        cpl: new Decimal(2), 
        ipl: new Decimal(2),
        startingWeapon : 1,
        critMult: new Decimal(1.5),
      },
      { 
        name : "Sorcerer",
        health: new Decimal(30),
        mana: new Decimal(25),
        strength: new Decimal(5), 
        dexterity: new Decimal(7), 
        luck: new Decimal(7), 
        constitution: new Decimal(5), 
        intelligence: new Decimal(10),
        hpl: new Decimal(3), 
        mpl: new Decimal(5), 
        spl: new Decimal(1), 
        dpl: new Decimal(3), 
        lpl: new Decimal(2), 
        cpl: new Decimal(1), 
        ipl: new Decimal(7),
        startingWeapon : 2,
        critMult: new Decimal(1.33),
      },
      { 
        name : "Berserker",
        health: new Decimal(60),
        mana: new Decimal(10),
        strength: new Decimal(15), 
        dexterity: new Decimal(5), 
        luck: new Decimal(5), 
        constitution: new Decimal(5), 
        intelligence: new Decimal(5),
        hpl: new Decimal(3), 
        mpl: new Decimal(1), 
        spl: new Decimal(7), 
        dpl: new Decimal(2), 
        lpl: new Decimal(1), 
        cpl: new Decimal(2), 
        ipl: new Decimal(1),
        startingWeapon : 3,
        critMult: new Decimal(1.5),
    },
  ]

  function updateStats(l, c, r = false){ // level, classData, reset
    l = l - 1
	  let hdiff = player.healthMax.minus(player.health)
    let mdiff = player.manaMax.minus(player.mana)

    player.health = player.healthMax = getFinalStat(l, c, statType.HEALTH)
    player.mana = player.manaMax = getFinalStat(l, c, statType.MANA)
    player.strength = getFinalStat(l, c, statType.STRENGTH)
    player.dexterity = getFinalStat(l, c, statType.DEXTERITY)
    player.luck = getFinalStat(l, c, statType.LUCK)
    player.constitution = getFinalStat(l, c, statType.CONSTITUTION)
    player.intelligence = getFinalStat(l, c, statType.INTELLIGENCE)

	if(!r){
		player.health = player.health.minus(hdiff)
    player.mana = player.mana.minus(mdiff)
	}
}

function getFinalStat(l, c, s){
	let stat = new Decimal(0)

	switch(s){
		case statType.HEALTH:
			stat = Decimal.round(c.health.add(c.hpl * l).times(achievementEffect('a', 11).health).times(achievementEffect('a', 12).health)) 
			break;
		case statType.HEALTHMAX:
			stat = Decimal.round(c.health.add(c.hpl * l).times(achievementEffect('a', 11).health).times(achievementEffect('a', 12).health))
			break;
		case statType.MANA:
			stat = new Decimal(c.mana).add(c.mpl * l) 
			break;
		case statType.MANAMAX:
			stat = new Decimal(c.mana).add(c.mpl * l) 
			break;
		case statType.STRENGTH:
			stat = Decimal.round((c.strength.add(c.spl * l)).times(buyableEffect('g', 11).div(100).add(1)).times(achievementEffect('a', 11).strength))
			break;
		case statType.DEXTERITY:
			stat = Decimal.round((c.dexterity.add(c.dpl * l)).times(buyableEffect('g', 12).div(100).add(1)))
			break;
		case statType.CONSTITUTION:
      stat = Decimal.round((c.constitution.add(c.cpl * l)).times(buyableEffect('g', 13).div(100).add(1)).times(achievementEffect('a', 11).constitution))
			break;
		case statType.INTELLIGENCE:
			stat = Decimal.round((c.intelligence.add(c.ipl * l)).times(buyableEffect('g', 14).div(100).add(1)))
			break;
      case statType.LUCK:
        stat = Decimal.round((c.luck.add(c.lpl * l)).times(buyableEffect('g', 15).div(100).add(1)).times(achievementEffect('a', 12).luck))
        break;
      default:
			break;
	}

	return stat;
}

function classToolTip(c){ //c = classData
  return c.name + "<br/>Base(Per Level)<br/> Health: " +  c.health + "(+" + c.hpl +")"
              + "<br/> Mana: " +  c.mana + "(+" + c.mpl +")"
              + "<br/> Str: " +  c.strength + "(+" + c.spl +")"
              + "<br/> Dex: " +  c.dexterity + "(+" + c.dpl +")"
              + "<br/> Con: " +  c.constitution + "(+" + c.cpl +")"
              + "<br/> Int: " +  c.intelligence + "(+" + c.ipl +")"
              + "<br/> Lck: " +  c.luck + "(+" + c.lpl +")"
}

function getExpForNextLevel(l){ // l = level
  return new Decimal(l).times(10).add(10)
}

function addWeapon(id){
  if(!player.weapons.find((w) => w != null && w.name == weaponData[id].name)){
    let index = player.weapons.findIndex((w) => w == null)
    if(index >= 0){
      player.weapons[index] = weaponData[id];
      setGridData('s', 101 + index, player.weapons[index]);
    } 
  }
}

function getDamage(w, s, i, l){ //weapon, strength, intelligence, luck
  let damage = 0;
  switch(w.damageType){
    case damageType.PHYS:
      damage = w.attack[w.level].times(s.div(100).add(1))
      break;
    case damageType.MAG:
      damage = w.attack[w.level].times(i.div(100).add(1))
      break;
    default:
      break;
  }

  if(doCrit(l)){
    damage = damage.times(classData[player.classid].critMult);
  }

  return damage;
}

function getDamageReduction(c){ //constitution
  let	reduction = new Decimal(1).div(c.pow(0.6).div(100).add(1))
  return reduction;
}

function getDamageReduction(c){ //constitution
  let	reduction = new Decimal(1).div(c.pow(0.6).div(100).add(1))
  return reduction;
}

function getCooldown(w, d){ //weapon, dexterity
  let	cooldown = w.cooldown[w.level] / d.pow(0.5).div(100).add(1).toNumber()
  return cooldown;
}

function getCritChance(l){
  return l.pow(0.5).div(100).toNumber();
}

function doCrit(l){
  return(Math.random(1) <= getCritChance(l))
}

function updateSurvivorEQ(){ // called from load()
  for(i = 0; i < player.weapons.length; ++i){
    if(player.weapons[i] != null){
      player.weapons[i] = weaponData[player.weapons[i].id]
      setGridData('s', 101 + i, player.weapons[i]);
    }

    if(player.accessories[i] != null){
      player.accessories[i] = accesoryData[player.accessories[i].id]
      setGridData('s', 201 + i, player.accessories[i]);
    }
  }
}

function resetWeapons(){
  player.weapons = [null, null, null, null, null, null]
  player.accessories = [null, null, null, null, null, null]
}

function resetEnemies(){
  player.enemies = [enemyData[0], enemyData[0], enemyData[0], enemyData[0], enemyData[0], enemyData[0]]
}

function onDied(){
  player.points = new Decimal(0)
  player.classid = 0
  player.currentWorld = 0
  player.level = new Decimal(1)
  player.experience = new Decimal(0)
  player.tnl = getExpForNextLevel(player.level)

  resetWeapons();
  resetEnemies();
}

function onAttack(weapon, spawn){
  let piercing = weapon.piercing[weapon.level]
  for(i = 0; i < spawn.length; ++i){
      let enemy = player.enemies[i]
      let buyableid = enemy.buyable + i

      if(enemy.healthPool.gt(0) && piercing >= 0){
          piercing--;

          let attack = getDamage(weapon, player.strength, player.intelligence, player.luck)
          let spawncount = Decimal.ceil(enemy.healthPool.div(enemy.health))
          enemy.healthPool = enemy.healthPool.minus(attack).max(0);
          let newcount = Decimal.ceil(enemy.healthPool.div(enemy.health));

          setBuyableAmount('s', buyableid, newcount)
          
          let gold = enemy.gold.times(spawncount.minus(newcount))
          let experience = enemy.experience.times(spawncount.minus(newcount))
          player.experience = player.experience.add(experience)
          player.gold = player.gold.add(gold)

          while(player.experience.gte(player.tnl)){
              player.experience = player.experience.minus(player.tnl)
              player.level = player.level.add(1)
              player.tnl = getExpForNextLevel(player.level)
              updateStats(player.level, classData[player.classid])
          }
      }
  }
}
