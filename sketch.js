var PLAY = 1;
var END = 0;
var gameState = PLAY;

var soldier, soldier_running, soldier_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  soldier_running = loadAnimation("army1.png","army2.png");
  
  groundImage = loadImage("jungle.jpg");
  
  obstacle1 = loadImage("landmine.png");
  obstacle2 = loadImage("landmine.png");
  obstacle3 = loadImage("landmine.png");
  obstacle4 = loadImage("landmine.png");
  obstacle5 = loadImage("landmine.png");
  obstacle6 = loadImage("landmine.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(800, 400);
  
  ground = createSprite(0,0,600,200);
  ground.addImage("ground",groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -1;

  soldier = createSprite(50,180,20,50);
  soldier.addAnimation("running", soldier_running);

  soldier.scale = 0.5;
   
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  soldier.scale = 0.3;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  
  console.log("Hello" + 5);
  
  soldier.setCollider("circle",0,0,40);
  
  
  score = 0;
  
}

function draw() {
  
  background(0);
  
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  console.log("ground.x ",ground.x)
  
  if (ground.x < 100){
    ground.x = 300;
    
  }

  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    restart.visible = false;
    
    //scoring
    score = score + Math.round(frameCount/60);
    
    
    
    //jump when the space key is pressed
    if(keyDown("space")&& soldier.y >= 100) {
        soldier.velocityY = -12;
    }
    
    //add gravity
    soldier.velocityY = soldier.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(soldier)){
        // soldier.velocityY = -12;
        // jumpSound.play();
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      //ground.velocityX = 0;
      soldier.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
   }
  
 
  //stop soldier from falling down
  soldier.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,200,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

