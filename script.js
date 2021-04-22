var score = 0;
var highScore = 0;
var lowBlock = document.getElementById("lowBlock");
var character = document.getElementById("character");
var button = document.getElementById("btn");


var characterTop = 0;
var characterLeft = 0;
var characterWidth = 0;
var lowBlockTop = 0;
var lowBlockLeft = 0; 


var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

lowBlock.addEventListener("animationiteration",updateScore);
button.addEventListener("click", startGame);
document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function jump(){
    if(character.classList == "jumpAnimate"){return;}
    character.classList.add("jumpAnimate");
    setTimeout(removeJump,300); 
};


function removeJump(){
    character.classList.remove("jumpAnimate");
}


function getCSSvalues(){
    characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
    lowBlockTop = parseInt(window.getComputedStyle(lowBlock).getPropertyValue("top"));
    lowBlockLeft = parseInt(window.getComputedStyle(lowBlock).getPropertyValue("left"));
    
}


function checkDead(){
    if((lowBlockLeft>characterLeft) && (lowBlockLeft<(characterLeft+characterWidth)) && (characterTop>=130)){
      console.log("Game over");
      if (score>highScore){
      highScore = score;	  
      }
      score=0;	
      lowBlock.style.animation = "";	
    }
}


function updateScore(){
    score++;
    document.getElementById("score").innerHTML = score;
}


function startGame(){
    event.preventDefault();
    document.getElementById("score").innerHTML = score;
    document.getElementById("highScore").innerHTML = highScore;
    lowBlock.style.animation = "blockAnimate 1ms linear infinite";    
}


function inputs(){
  if (rightPressed) {
    characterLeft = characterLeft + 5;
    character.style.left = String(characterLeft) + "px";
  }
  if (leftPressed) {
    characterLeft = characterLeft - 5;
    character.style.left = String(characterLeft) + "px";
  }
  if (upPressed){
    jump();
  }
  if (downPressed){
    character.style.height = "20px";
    character.style.top = "180px";
    lowBlock.style.top = "160px";
  } else {
    character.style.height = "50px";
    character.style.top = "150px";
    lowBlock.style.top = "130px";
  } 
}


function boundaryCheck(){
if (characterLeft < 0){
    character.style.left = "0px";
} else if (characterLeft > 500){
    character.style.left = "480px";
}
}


function keyDown(event){
    if (event.keyCode == 37){
      leftPressed = true;
    }
    if (event.keyCode == 39){
      rightPressed = true;
    }
    if (event.keyCode == 38){
      upPressed = true;
    }
    if (event.keyCode == 40){
      downPressed = true;
    }
}


function keyUp(event){
    if (event.keyCode == 37){
      leftPressed = false;
    }
    if (event.keyCode == 39){
      rightPressed = false;
    }
    if (event.keyCode == 38){
      upPressed = false;
    }
    if (event.keyCode == 40){
      downPressed = false;
    }
}

function playGame(){
    inputs();
    getCSSvalues();
    boundaryCheck();
    //checkDead();
}

setInterval(playGame, 10);

