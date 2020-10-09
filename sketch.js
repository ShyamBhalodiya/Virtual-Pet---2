//Create variables here
var dog, happydog, database, foodStock, foodS, timeno, hour2;

function preload() {
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 300, 100, 100);
  dog.scale = 0.3;
  dog.addImage("1", dogimg);
  dog.addImage("2", happydog);

  food = createButton("ADD FOOD");
  food.position(550, 490);
  food.mousePressed(addfood);

  foodStock = database.ref("/Foodstock");
  foodStock.on("value", readFoodstock, error);

}

function draw() {
  background(0, 255, 0);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.changeImage("2");
  }
  drawSprites();
  //add styles here
  textSize(18);
  stroke(0);
  strokeWeight(1);
  text("Food remaining: " + foodS, 180, 150)
  text("Note: Press up arrow key to feed dog with milk", 50, 25);
}
function readFoodstock(data) {
  foodS = data.val();
}
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref("/").set({
    Foodstock: x
  })
}
function error() {
  console.log("Error");
}
function addfood() {
  foodS = foodS + 5;
  database.ref("/").set({
    Foodstock: foodS
  })
}

