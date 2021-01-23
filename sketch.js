var hotAB,hotABIMG;
var database,position;
var BG,BGIMG;

function preload(){
hotABIMG=loadAnimation("Hot Air ballon-02.png","Hot Air ballon-03.png","Hot Air ballon-04.png");
BGIMG=loadImage("Hot Air ballon-01.png");
}

function setup(){
    createCanvas(1000,500);
    database = firebase.database();
   
    hotAB = createSprite(250,250,10,10);
    hotAB.addAnimation("fly",hotABIMG);
    hotAB.scale=0.5;

    var hotABLoc = database.ref('hotAB/position');
    hotABLoc.on("value",readHeight);
}

function draw(){
    background(BGIMG);
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0);
    }
    else if(keyDown(UP_ARROW)){
       updateHeight(0,-10);
       hotAB.scale=hotAB.scale-0.01;

    }
    else if(keyDown(DOWN_ARROW)){
       updateHeight(0,+10);
       hotAB.scale=hotAB.scale+0.01;
    }
    drawSprites();
}

function updateHeight(x,y){
  database.ref('hotAB/position').set({
    'x':height.x + x ,
    'y':height.y + y
  })
}
function readHeight(data){
  height=data.val();
  hotAB.x = height.x;
  hotAB.y = height.y;
}
function showError(){
  console.log("Error in writing to the database")
}