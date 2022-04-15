"use strict";

// this tells linter that idgaf if variables are unused --
// REMOVE IT WHEN CODE IS COMPLETE and ready for testing!!
/* eslint no-unused-vars: "off" */

/**********************************
/  TESTS 
**********************************/

function test() {
  gameState.inv.push("things", "stuff");
}



/**********************************
/ GLOBAL VARIABLES
**********************************/
let gameState = {
  phase: "intro", //others: 
  daysLeft: 3,
  daysPlayed: 0,
  numExploresToday: 0,
  inv: [],
  memoriesFound: [],
  msgLog: [],
  openMenu: null
};




/**********************************
/ DATA
**********************************/

class Resource {
  constructor({noun, maxForage, where}) {
    this.noun = noun;
    this.maxForage = maxForage;
    this.whereFound = where;
  }
}

class Place {
  constructor({title, bg, hotspots}) {
    this.title = title;
    this.bgImg = bg;
    this.hotspots = hotspots;
  }
}

/******* IMAGES ******/
const bgs = {
  "hearth": {
    "path": "img/bg-hearth.png"
  },
  "places": {
    "path": "img/bg-places.png"
  },
  "woods": {
    "path": "img/bg-woods.png" //TODO
  },
  "journal": {
    "path": "img/bg-journal.png" //TODO
  }
};

// needs to be an object instead of array so they can be found with allMems[string] when parsing save data
const allMems = [
  "dryadella",
  "gargoyle"
];

// number of resources required to cast the time spell
const spell = {
  "feathers": 5,
  "flowers": 20,
  "twigs": 10,
  "stones": 4
};
// TODO med priority: make multiple versions of spell for high-low quality

const spellText = [
  "Seven feathers of the -",
  "Four stones even and smooth, all edges washed away by the water's ebb and flow, shall bear the memory ",
  "Thirteen blossoms of morning glory "
];

// resources, AKA items that can be repeatedly foraged
const resources = {
  "feathers": {
    "name": "feathers",
    "maxForage": 3,
    "whereFound": ["tree", "bush"]
  },
  "flowers": {
    "name": "flower petals",
    "maxForage": 5,
    "whereFound": ["tree", "bush"] 
  },
  "twigs": {
    "name": "cedar twigs",
    "maxForage": 5,
    "whereFound": ["tree", "bush"]
  },
  "stones": {
    "name": "smooth stones",
    "maxForage": 3,
    "whereFound": ["lake"]
  }
};



/**********************************
/ GRAPHICS
**********************************/
function draw() {
  //const canvas = document.querySelector("canvas");
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;

  const bg = new Image();
  bg.src = "img/bg-hearth.png";

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0);
  };

}

/******* HELPERS ******/


// this one is for a smaller textbox, e.g. result of actions
function showTextbox(msg) {
  gameState.msgLog.push(msg);

  let box = document.getElementById("msgBox");
  let para = document.createElement("p");
  para.innerText = msg;
  box.appendChild(para);

  box.onclick = advance(box);
  box.style.display = "block";
}

function hideTextbox() {
}

function hideStory() {
  console.log("hidestory");
}

// this one is for long text segments that occupy the whole screen
function showStory(text) {
  console.log("show story");

}



//on any keypress, continue to next screen
window.addEventListener("keydown", () => {
  advance();
});

//on any keypress, continue to next screen
window.addEventListener("keydown", () => {
  advance();
});

//TODO - decides what screen to show next in response to player action
function advance() {}

/**********************************
 / SCREENS
 **********************************/


//inventory and spell requirement screen
function showInv() {
  console.log(gameState.inv);
  gameState.openMenu = "inv";
  //let menu = document.getElementById("menuBox");

  // title.innerText = "i have:";
  let items = "";
  for (let i = 0; i < gameState.inv.length - 1; i++) {
    items += `${gameState.inv[i]}, `;
  }
  if (gameState.inv.length >= 1) {
    items += `${gameState.inv[gameState.inv.length - 1]}`;
  }
  //console.log(items);

  // "requirements for the spell:";
  // "4 smooth stones, feathers, blah blah";

  // showEl("menuBox");
}

function hideInv() {
  //let menu = document.getElementById("menuBox");
  
  gameState.openMenu = null;
}

function toggleInv() {
  if (gameState.openMenu == "inv") {hideInv();}
  else {showInv();}
}

//TODO new day (and game start) screen
function showDefault() {}

//TODO day planner screen
function showPlanner() {}

//TODO map screen (start with woods, add another for town later)
function showMap() {}

//TODO hearth (spellcasting) screen
function showHearth() {
  let path = bgs.hearth.path;
}

//TODO game end scrapbook screen 
function showScrapbook() {}


/**********************************
* STORY
***********************************/

//add a prop for textbox type?
const story = {
  intro1: {
    text: "I can't believe it's the last week of my study abroad trip already!",
    next: "intro2"
  },
  intro2: {
    text: "intro p 2",
    next: null
  },
  ending: {
    text: "",
    next: null
  }
};




/**********************************
* LOGIC
***********************************/

const dailyChances = 3; // how many times per day player can gather resources or click a place on a map

// try to collect resources from the map
function gather(resource) {
  let maxAmount = resource.maxForage;
  let collected = Math.random() * maxAmount;
  return Math.floor(collected) + 1; // add 1 to ensure nonzero amount
}

// interact with a specific spot on a map
function check(hotspot) {
  //TODO - if spot is for random gathering, gatherResult = gather(the resource at this spot)
  //TODO - see if a memory is found
  //TODO if spot has a special dialog, call the ui function
  //TODO increase numExploresToday
}

// show map and listen for player to click a spot
function visitMap() {
  //TODO - onclick check( )
}

function planDay() {
  //TODO - show day planner screen and let player pick where to go
}

function finishDay() {
  gameState.daysLeft--;
  gameState.daysPlayed++;
  //TODO go to hearth screen if appropriate 
}

function newDay() {
  gameState.phase = "newDay";
  gameState.numExploresToday = 0;
  gameState.openMenu = null;
  planDay();
}


function endGame() {
  //TODO display ending text
  gameState.phase = "ending";
}

// read localStorage for memories found and mark those memories found for current run
function checkMems() {
  let result = [];
  let save = localStorage.getItem("memoriesFound"); //it's a string
  if (save) { //skip if no save data exists - save will be null which evaluates false
    /*loop over allMems
    if (save.includes(allMems[i])) {result.push(allMems[i])} */
    if (save.includes("gargoyle")) {result.push("gargoyle");}
    if (save.includes("dryadella")) {result.push("dryadella");}
  }
  //console.log(result);
  return result; //will be [] if no save data
}

//TODO 
function storeMems() {}



/**********************************
/ START
**********************************/

//start game
function start() {
  console.log("starting");

  // showEl("invBtn");
  // hideEl("titleCard");

  // set variables to "new game" values
  gameState.daysLeft = 3; //number of playable days
  gameState.inv = []; //inventory
  gameState.memoriesFound = checkMems();
  gameState.msgLog = []; //log of all text displayed in this playthrough

  test();
  advance();
  
}


/**********************************
/ temp reference!!! delete this!
**********************************/

// localStorage.setItem('memories', memories)
//if(!localStorage.getItem('name')) {
//  setUserName();
//} else {
//  let storedName = localStorage.getItem('name');
//}

// class Resource {
//   constructor(noun, maxForage, whereFound) {
    
//   }
// }