/* this us just like.. a bunch of crap i tried that didn't work
** that i'm holding onto in case i find out later that actually
** it would have worked or smth....... 
** it'll go away later,,    */

"use strict";

// this tells linter that idgaf if variables are unused --
// REMOVE IT WHEN CODE IS COMPLETE and ready for testing!!
/* eslint no-unused-vars: "off" */

/**********************************
/  TESTS 
**********************************/

function test() {
  inv.push("things", "stuff");
}



/**********************************
/ GLOBAL VARIABLES
**********************************/

// these ones will be assigned when the game starts
let gameEnd = false; //player hasn't finished the game yet
let daysLeft = 3; //number of playable days left
let inv = []; //inventory
let memoriesFound = [];
let msgLog = []; //log of all text displayed in this playthrough

// these variables will update each game day
let daysPlayed = 0; //times the player has started a new day
let numExploresToday = 0;
let currentPlace = null; //where the player is right now
let openMenu = null; //is there a gui menu open right now?



/**********************************
/ DATA
**********************************/

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
const game = document.getElementById("gameDiv");

/******* HELPERS ******/

// takes name of element id
function showEl(name) {
  document.getElementById(name).style.display = "block";
}

// takes name of element id
function hideEl(name) {
  document.getElementById(name).style.display = "none";
}

//takes a dom node reference, removes innerhtml, and hides element
function emptyEl(elem) {
  elem.style.display = "none";
  elem.innerHTML = "";
}

// takes name of element class
function hideClass(name) {
  let cls = document.getElementsByClassName(name);
  console.log(cls);
  //cls.style.display = "none";
  for (let i=0; i < cls.length; ++i) {cls[i].style.display = "none";}
}

// advance textboxes to next screen
function advance(box) {
  console.log("advance " + box);

}

// this one is for a smaller textbox, e.g. result of actions
function showTextbox(msg) {
  msgLog.push(msg);

  let box = document.getElementById("msgBox");
  let para = document.createElement("p");
  para.innerText = msg;
  box.appendChild(para);

  box.onclick = advance(box);
  box.style.display = "block";
}

function hideTextbox() {
  let box = document.getElementById("msgBox");
  box.style.display = "none";
  emptyEl(box);
}

function hideStory() {
  let box = document.getElementById("storyBox");
  box.style.display = "none";
  box.innerHTML = "";
  console.log("hidestory");
}

// this one is for long text segments that occupy the whole screen
function showStory(text) {
  console.log("show story");
  let box = document.getElementById("storyBox");
  
  let para = document.createElement("p");
  para.appendChild(document.createTextNode(text));
  box.appendChild(para);
  
  let btn = document.createElement("button");
  btn.innerText = "continue";
  btn.onclick = hideStory;
  box.appendChild(btn);
  
  box.style.display = "block"; //show text box
}



/*
function showResult(result, spot) {
  //TODO - display a message about the result of exploring
}
no this is no good, separate the ui from the content */



/**********************************
 / SCREENS
 **********************************/


//inventory and spell requirement screen
function showInv() {
  console.log(inv);
  openMenu = "inv";
  let menu = document.getElementById("menuBox");

  let title = document.createElement("h3");
  title.innerText = "i have:";
  menu.appendChild(title);
  let items = "";
  for (let i = 0; i < inv.length - 1; i++) {
    items += `${inv[i]}, `;
  }
  if (inv.length >= 1) {
    items += `${inv[inv.length - 1]}`;
  }
  let content = document.createElement("p");
  content.innerText = items;
  menu.appendChild(content);
  //console.log(items);

  menu.appendChild(document.createElement("hr"));
  let reqH = document.createElement("h3");
  reqH.innerText = "requirements for the spell:";
  menu.appendChild(reqH);
  let reqP = document.createElement("p");
  reqP.innerText = "4 smooth stones, feathers, blah blah";
  menu.appendChild(reqP);

  showEl("menuBox");
}

function hideInv() {
  let menu = document.getElementById("menuBox");
  emptyEl(menu); //includes hiding box
  openMenu = null;
}

function toggleInv() {
  if (openMenu == "inv") {hideInv();}
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
  game.setAttribute("background-image", path);
}

//TODO game end scrapbook screen 
function showScrapbook() {}


/**********************************
* STORY
***********************************/

const story = {
  intro1: {
    text: "intro p 1",
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
  daysLeft--;
  daysPlayed++;
  //TODO go to hearth screen if appropriate 
}

function newDay() {
  numExploresToday = 0;
  currentPlace = null;
  openMenu = null;
  planDay();
}


function endGame() {
  //TODO display ending text
  
}

//TODO display opening text
function playIntro() {
  let intro = "I can't believe it's the end of my study abroad trip already!"; 
  // might need an array of strings if too long to show all at once
  showStory(intro);
  console.log("done intro");
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

/* /TODO what the fuck am i even doingn
function checkSave(key) {
  let data = localStorage.getItem(key);
  if (data) { //false if data=null
    return [];
  }
  return []; 
} */

//TODO 
function storeMems() {}

/* wanted to make a generic data saver but im really confused about 
types in js and it doesnt matter anyway since for now memories are the only
data we wanna save to localstorage anyway SHRUGGES
// key should be the name of an existing iterable 
function storeSave(key) {
  let arr = key;
  let string = "";
  for (let i=0; i < arr.length; i++) {
    string += ` ${arr[i]} `;
  }
  localStorage.setItem(key, string);
} */ 


/**********************************
/ START
**********************************/
//render game window
function render() {
  console.log("render");
}

//start game
function start() {
  console.log("starting");

  showEl("invBtn");
  hideEl("titleCard");

  // set variables to "new game" values
  gameEnd = false; //game is in progress
  daysLeft = 3; //number of playable days
  inv = []; //inventory
  memoriesFound = checkMems();
  msgLog = []; //log of all text displayed in this playthrough

  test();
  playIntro();
  /* // CORE GAME LOOP
  while(!gameEnd) {
    newDay();
    finishDay();
  }
  endGame(); */
  
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