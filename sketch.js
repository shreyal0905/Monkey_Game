var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var gameState = END;
var score =0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana = loadImage("banana.png");
  stone = loadImage("stone.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("UP_ARROW") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);

    

    textSize(25);
    fill ("white");
    text("score = "+ score, width-300, 50);
    score = score +Math.round(frameCount/60);

    if(spawnFood .isTouching(monkey)){
      spawnFood.destroyEach();
      score = score+2;
      monkey.scale+=0.1;
    }

    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
    else if(gameState === END){
      backgr.velocityX = 0;
      monkey.visible = false;

      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();

      textSize(30);
      fill (255);
      text("Game Over",300,255);
    }

  }

  spawnFood();
  spawnObstacles();


  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(random(120,200));
    banana.addImage(banana);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifeTime = 300;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    stone = createSprite(600,250,40,10);
    Math.round(random(10,60));
    stone.addImage(stone);
    stone.scale =0.1;
    stone.velocityX = -3;
    obstacleGroup.add(stone);
  }
}

