
var buildingHeight = 200;
var buildingWidth = 100;
var canvasHeight = 600;
var canvasWidth = 1024;
var buildingSpace = 100;

var left_y = 400;
var right_y = 400;

var left_x = buildingSpace - 23;
var right_x = canvasWidth - buildingSpace - 8;

var left_bx = buildingSpace;
var left_by = 400;

var right_bx = canvasWidth - buildingSpace - 60;
var right_by = 400;

var left_bananaThrown = false;
var right_bananaThrown = false;

var left_death = false;
var right_death = false;

var bananaSplat = false;
var waitingForRestart = false;

var left_gorilla = new Image();
var right_gorilla = new Image();

var left_banana = new Image();
var right_banana = new Image();

var left_building = new Image();
var right_building = new Image();

var keys = {};
var keyText;

window.onkeyup = function(e) { 
  keys[e.keyCode] = false; 
}

window.onkeydown = function(e) { 
  keys[e.keyCode] = true; 
  keyText.innerHTML = e.keyCode;
}

function init() {
  left_building.src = 'tower.png';
  right_building.src = 'tower.png';
  left_gorilla.src = 'gorilla_left.png';
  right_gorilla.src = 'gorilla_right.png';
  left_banana.src = 'banana_left.png';
  right_banana.src = 'banana_right.png';

  window.requestAnimationFrame(draw);
}

function draw() {
  var heightText = document.getElementById("height");
  var canvas = document.getElementById("bananascene");
  var ctx = canvas.getContext("2d");

  ctx.globalCompositeOperation = 'destination-under';

  keyText = document.getElementById("key");
    
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.beginPath();
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#66c2ff";
  ctx.fill();
  ctx.closePath();

  ctx.drawImage(left_building, buildingSpace, buildingHeight);
  ctx.drawImage(right_building, canvasWidth-buildingWidth-buildingSpace, buildingHeight);

  ctx.drawImage(left_gorilla, left_x, left_y);
  ctx.drawImage(right_gorilla, right_x, right_y);

  ctx.drawImage(left_banana, left_bx, left_by);
  ctx.drawImage(right_banana, right_bx, right_by);

  if(waitingForRestart) {
    if((keys[32] == true))
    {
      left_y = 400;
      right_y = 400;

      left_x = buildingSpace - 23;
      right_x = canvasWidth - buildingSpace - 8;

      left_bx = buildingSpace;
      left_by = 400;

      right_bx = canvasWidth - buildingSpace - 60;
      right_by = 400;

      left_death = false;
      right_death = false;

      waitingForRestart = false;
    }
    else
    {
      ctx.font = "32px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("Press Space to restart", (canvasWidth/2)-150, canvasHeight/2);
      // do nothing
    }
  } else {

    // Banana follows monkey
    if(left_bananaThrown == false && !bananaSplat) {
      left_by = left_y;
    }

    // Up
    if(keys[87] == true) {
      if (left_y > 174) { left_y = left_y - 1; }
      heightText.innerHTML = left_y;
    }

    // Down
    if(keys[83] == true) {
      if (left_y < 550) { left_y = left_y + 1; }
      heightText.innerHTML = left_y;
    }

    // throw banana!!!
    if(keys[68] == true) {
      left_bananaThrown = true;
    } 

    if(left_bananaThrown == true) {
      left_bx = left_bx + 10;

      if(left_bx > canvasWidth) {
        left_bx = buildingSpace;
        left_bananaThrown = false;
      }
    }  

    // if left gorilla is hit by right banana, left death!!!
    if((Math.abs(right_bx - left_x) < 20) && (Math.abs(right_by - left_y) < 40))
    {
      left_death = true;
    }

    if(left_death) {
      left_y = left_y + 5;
      left_x = left_x - 1.4;

      if (left_y > canvasHeight) {
        waitingForRestart = true;
      }
    }

    // right gorilla

    // Banana follows monkey
    if(right_bananaThrown == false && !bananaSplat) {
      right_by = right_y;
    }

    // Up
    if(keys[38] == true) {
      if (right_y > 174) { right_y = right_y - 1; }
      heightText.innerHTML = right_y;
    }

    // Down
    if(keys[40] == true) {
      if (right_y < 550) { right_y = right_y + 1; }
      heightText.innerHTML = right_y;
    }

    // throw banana!!!
    if(keys[37] == true && !bananaSplat) {
      right_bananaThrown = true;
    } 

    if(right_bananaThrown == true) {
      right_bx = right_bx - 10;

      if(right_bx < 0) {
        right_bx = canvasWidth - buildingSpace - 60;
        right_bananaThrown = false;
      }
    }

    // if right gorilla is hit by left banana, right death!!!
    if((Math.abs(left_bx - right_x) < 20) && (Math.abs(left_by - right_y) < 40))
    {
      right_death = true;
    }

    if(right_death) {
      right_y = right_y + 5;
      right_x = right_x + 1.4;

      if (right_y > canvasHeight) {
        waitingForRestart = true;
      }
    }

    // BANANA SPLAT

    if(Math.random() > 0.96) {
      if((Math.abs(right_bx - left_bx)) < 50 && (Math.abs(right_by - left_by) < 50)){
        right_bananaThrown = false;
        left_bananaThrown = false;
        bananaSplat = true;
        
      }
    }

    if(bananaSplat) {
      right_by = right_by + 10;
      left_by = left_by + 10;

      if(right_by > canvasHeight && left_by > canvasHeight) {
        bananaSplat = false;
        right_bx = canvasWidth - buildingSpace - 60;
        left_bx = buildingSpace;
      }
    }
  }

  window.requestAnimationFrame(draw);
}

init();