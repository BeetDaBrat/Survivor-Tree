let modInfo = {
	name: "The Survivor Tree",
	id: "survivortreeprime",
	author: "BeetDaBrat",
	pointsName: "",
	modFiles: ["layers.js", "tree.js", "data/classes.js", "data/enemies.js", "data/weapons.js", "data/accessories.js", "data/worlds.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: -1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "The Beginning",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]



function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.currentWorld != 0
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	//if (hasUpgrade('e', 12)) gain = gain.times(upgradeEffect('e', 12))
	//if (hasMilestone('e', 0)) gain = gain.times(milestoneEffect('e', 0))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {return {
	best: 0,
	currentWorld: 0,
	classid: 0,
	health: new Decimal(50),
	healthMax: new Decimal(50),
	mana: new Decimal(10),
	manaMax: new Decimal(10),
	strength: new Decimal(10),
	dexterity: new Decimal(5),
	luck: new Decimal(5),
	constitution: new Decimal(10),
	intelligence: new Decimal(5),
	level: new Decimal(1),
	experience: new Decimal(0),
	tnl: new Decimal(getExpForNextLevel(1)),
	spawnTimer: 0,
	weapons: [null, null, null, null, null, null],
	accessories: [null, null, null, null, null, null],
	gold: new Decimal(500),
	enemies: [enemyData[0], enemyData[0], enemyData[0], enemyData[0], enemyData[0], enemyData[0]], //default to blank enemy so decimals load correctly
}}

// Display extra things at the top of the page
var displayThings = [
	function() { 
		if(player.points.gt(player.best))
			player.best = player.points
		return "Best Time: " + formatTime(player.best)
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}