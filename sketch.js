var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;
var highscore = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

var gameOver,gImage,restart,rImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gImage = loadImage("gameOver.png");
  rImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,90);
  restart.addImage(rImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(255);
  text("Score: "+ Math.round(score), 500,50);
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  
  text("High score: "+Math.round(highscore),400,50);
  
  if(score>=highscore)
  {
    HighScore();
  }
  
  if(gameState === PLAY)
  { 
    score = score + 0.25;
    
    ground.velocityX = -(6+3*score/100);
  
    if(keyDown("space")&&trex.y>= 155 ) 
    {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8;
  
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
    
    if(obstaclesGroup.isTouching(trex))
    {
      gameState = END;
    }
  }
  
  else if(gameState === END)
  {
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1); 
    
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    
    gameOver.visible = true;
    
    restart.visible = true;
    
    trex.velocityY = 0;
    
    if(mousePressedOver(restart))
    {
       reset();
    }
}
    
   drawSprites();
}
  


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(630,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 230;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(650,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
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
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  score = 0;
  
  trex.changeAnimation("running",trex_running);
}

function HighScore()
{
    highscore = score;
}