//Create variables here
var dog, happydog, database, foodStock, foodS, foodObj, Nameinput;

function preload() {
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  //dog
  dog = createSprite(750, 300, 100, 100);
  dog.scale = 0.3;
  dog.addImage("1", dogimg);
  dog.addImage("2", happydog);
  dog.debug = true;

  //food object
  foodObj = new Food();
  foodObj.getfoodstock();

  //add food button
  addfood = createButton("Add Food");
  addfood.position(750, 500);
  addfood.mousePressed(() => {
    foodObj.addfood();
  });

  //deduct food button
  Deductfood = createButton("Feed Dog");
  Deductfood.position(850, 500);

  //input for name
  Nameinput = new Form();
  NameObj = new Name();
  NameObj.getname();

}

function draw() {
  background(0, 255, 0);

  //display methods of food and nameinput
  foodObj.display();
  Nameinput.display();
  NameObj.display();

  //mouse pressed condition
  Deductfood.mousePressed(() => {
    dog.changeImage("2");
    foodObj.deductfood();
    foodObj.lastfed = hour();
    database.ref("/").update({
      Lastfeed: foodObj.lastfed
    })
  });

  drawSprites();

  //lastfeed time
  foodObj.getlastfedtime();
  foodObj.displaylastfedtime();
  //text
  textSize(15);
  text("Food Stock = " + foodObj.foodstock, 100, 50);
}