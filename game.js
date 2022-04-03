"use strict"; 

// this tells linter that idgaf if variables are unused --
// REMOVE IT WHEN CODE IS COMPLETE and ready for testing!!
/* eslint no-unused-vars: "off" */

/**********************************
/ GLOBAL VARIABLES
**********************************/

// these ones will be assigned when the game starts
let gameEnd = false; //player hasn't finished the game yet
let daysLeft = 3; //number of playable days left
let inv = []; //inventory
let memoriesFound = [];

// these variables will update each game day
let daysPlayed = 0; //times the player has started a new day
let numExploresToday = 0;
let currentPlace = null; //where the player is right now


/**********************************
/ DATA
**********************************/

// number of resources required to cast the time spell
const spell = {
  "feathers": 5,
  "buds": 20,
  "twigs": 10
};
// TODO med priority: make multiple versions of spell for high-low quality



// resources, AKA items that can be repeatedly foraged
const resources = {
  "feathers": {
    "name": "feathers",
    "maxForage": 3,
    "whereFound": ["tree", "bush"] 
  },
  "buds": {
    "name": "flower buds",
    "maxForage": 8,
    "whereFound": ["tree", "bush"] 
  },
  "twigs": {
    "name": "cedar twigs",
    "maxForage": 5,
    "whereFound": ["tree", "bush"]
  }
};



/**********************************
/ GRAPHICS
**********************************/

//TODO decide whether to use canvas or normal elements!!
function draw() {
  let canvas = document.getElementById("game");
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
  }
}



/**********************************
 / SCREENS
 **********************************/

//TODO define inventory (and spellbook) screen

//TODO new day (and game start) screen

//TODO day planner screen

//TODO map screen (start with woods, add another for town later)

//TODO hearth (spellcasting) screen

//TODO game end scrapbook screen 



/**********************************
 / UI
 **********************************/

//TODO 'check inventory' button (should always be on screen)

/*
function showResult(result, spot) {
  //TODO - display a message about the result of exploring
}
no this is no good, separate the ui from the content */

// this one is for a smaller textbox, e.g. result of actions
function showTextbox(msg) {}

// this one is for long text segments that occupy the whole screen
function showStory(text) {}


/**********************************
 / LOGIC
 **********************************/

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
  planDay();
}

function endGame() {
  //TODO display ending text
  
}

//TODO display opening text
function playIntro() {
  let intro = ""; // might need an array of strings if too long to show all at once
  // call ui function like showStory(intro) or smth
}

/**********************************
/ START
**********************************/
// initialize core variables

function start() {
  // set variables to "new game" values
  gameEnd = false; //game is in progress
  daysLeft = 3; //number of playable days
  inv = []; //inventory
  memoriesFound = [];
  
  playIntro();
  // CORE GAME LOOP
  while(!gameEnd) {
    newDay();
    finishDay();
  }
  endGame(); 
  
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