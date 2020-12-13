var towerImage, tower;

var doorImage, door, doorsGroup;

var climberImage, climber, climbersGroup;

var ghostImage, ghost;

var invisibleBlockGroup;

var gameState = "PLAY";

function preload(){
  
  towerImage = loadImage("tower.png");
  
  doorImage =loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
} 

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,20,20);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;

}

function draw(){
  
  if(gameState === "PLAY"){
    
    if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 5;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 5;
  }
  
  if(keyDown("SPACE")){
    ghost.velocityY = -10;
  }
    
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(tower.y > 400){
    tower.y = 300;
  }
    
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  } 

  drawSprites();
} 
  if(gameState === "END"){
    stroke("Yellow");
    fill("Red");
    textSize(50);
    text("Game Over", 175,300);
  }

}

function spawnDoors(){
  
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    var climber = createSprite(200,10);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;
    
    door.velocityY = 2;
    climber.x = door.x;
    climber.velocityY = 2;
  
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    climber.addImage(climberImage);
    door.addImage(doorImage);
  
    door.lifetime = 350;
    climber.lifetime = 350;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
