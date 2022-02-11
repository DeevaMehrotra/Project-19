var bgImg, bg;
var meteorImg, meteor, meteorGroup;
var gameOver, gameOverImg;
var rocket, rocketImg;
var dieSound;
var gameState = "play"

function preload(){
  bgImg = loadImage("bg.png");
  meteorImg = loadImage("meteoroit.png");
  rocketImg = loadImage("rocket.png");
  dieSound = loadSound("die.mp3");
  gameOverImg = loadImage("gameOverImg.png")
}

function setup() {
  createCanvas(600, 600);
  bg = createSprite(300,300);
  bg.addImage("bg",bgImg);
  bg.velocityY = 17;
  bg.scale = 5
  
  meteorGroup = new Group();

  rocket = createSprite(200,200,50,50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.8;
  
  gameOver = createSprite(width/2, height/2-50);
  gameOver.addImage(gameOverImg);

  gameOver.visible = false;

}

function draw() {
  background(200);

  
  
  if(bg.y > 400){
      bg.y = 300
    }

  if(keyDown("left_arrow")) {
    rocket.x = rocket.x-5
  }
if(keyDown("right_arrow")) {
  rocket.x = rocket.x+5
}

  if(keyDown("space")) {
    rocket.velocityY=-5
  }

  rocket.velocityY = rocket.velocityY+0.8 



 if(meteorGroup.isTouching(rocket)) {
    rocket.remove();
    meteorGroup.setVelocityYEach(0);
    gameOver.visible = true;
    bg.velocityY = 0;

    dieSound.play();

    meteorGroup.setLifetimeEach(-1);

    fill("yellow");
  textSize(40);
  text("GameOver!", 300, 300);
 }

 spawnMeteor();

 drawSprites();

}

function spawnMeteor() {
  if(frameCount % 100 === 0) {
    meteor = createSprite(300, -50);
    meteor.addImage(meteorImg);
    meteor.scale=0.15;
    meteor.x =Math.round(random(100,500));
    meteor.velocityY = 1;
    meteor.lifetime = 600;
    meteorGroup.add(meteor);

  }
}