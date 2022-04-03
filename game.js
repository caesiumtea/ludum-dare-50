/**********************************
/ GRAPHICS
**********************************/

function draw() {
  var canvas = document.getElementById("game");
  // var canvas = document.querySelector("#game");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
  }
}

/**********************************
/ LOGIC
**********************************/
class Resource {
  constructor(noun, maxForage, whereFound) {
    
  }
}

// list of resources, AKA items that can be repeatedly foraged
var feathers = {
  noun: "feathers",
  maxForage: 3,
  whereFound: ["tree", "bush"] 
}

var buds = {
  noun: "flower buds",
  maxForage: 8,
  whereFound: ["tree", "bush"] 
}



// try to collect resources from the map 
function forage(resource) {
  let maxAmount = resource.maxForage; //placeholder, should vary by resource
  let collected = Math.random() * maxAmount;
  return Math.floor(collected) + 1; // add 1 to ensure nonzero amount
}


/**********************************
/ UI
**********************************/

// localStorage.setItem('memories', memories)


/**********************************
/ START
**********************************/
// initialize core variables
var gameEnd = false;
var daysLeft = 3; //number of playable days left
var inv = []; //inventory
var memories = [];

function start() {
  return
}


/**********************************
/ temp reference!!! delete this!
**********************************/
//if(!localStorage.getItem('name')) {
//  setUserName();
//} else {
//  let storedName = localStorage.getItem('name');
//}
