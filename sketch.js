var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

var PLAY = 1
var ENd = 0;
var gameState = 1;

var Survival;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(700, 450);

  monkey = createSprite(80, 300, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.12;

  ground = createSprite(400, 350, 1200, 10);

  score = 0;
  Survival = 0;

  obstacleGroup = createGroup();
  FoodGroup = new Group();
}


function draw() {
  background("black");

  if (gameState === 1) {
    monkey.collide(ground);

    objects();
    food();
    Survival = Math.round(frameCount / frameRate())

    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }

    if (keyDown("space") && monkey.y >= 298.95) {
      monkey.velocityY = -15;

    }
    monkey.velocityY = monkey.velocityY + 0.8;


    if (monkey.isTouching(FoodGroup)) {
      score = score + 2;
      FoodGroup.destroyEach();
    } else if (monkey.isTouching(obstacleGroup)) {
      textSize(45)
      text("You Lose", 250, 200);

      gameState = 0;


    }

  }
  if (gameState === 0) {
    monkey.velocity = 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.velocityX = 0;
  }

  drawSprites();
  stroke("white");
  textSize(20);
  strokeWeight(2);
  text("" + score, 40, 40);

  text("Survival Time " + Survival, 340, 40);


}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(700, Math.round(random(110, 230)), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -10 - score / 2;
    banana.scale = 0.12;
    FoodGroup.add(banana);
  }
}

function objects() {
  if (frameCount % 180 === 0) {
    var obstacle = createSprite(700, 315, 20, 20)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10 - score / 2;
    obstacleGroup.add(obstacle);
  }
}