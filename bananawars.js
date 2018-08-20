var keys = {};
var keyText;

window.onkeyup = function(e) { 
  keys[e.keyCode] = false; 
}

window.onkeydown = function(e) { 
  keys[e.keyCode] = true; 
  keyText.innerHTML = e.keyCode;
}

window.onload = function(){
  keyText = document.getElementById("key");

  var canvas = document.getElementById("bananascene");
  var heightText = document.getElementById("height");
  

  var ctx = canvas.getContext("2d");

  var buildingHeight = 200;
  var buildingWidth = 100;
  var canvasHeight = 600;
  var canvasWidth = 1024;
  var buildingSpace = 100;
  var y = 400;

  var bx = buildingSpace;
  var by = 400;

  var gorilla = new Image();
  var banana = new Image();

  function draw() {

    ctx.beginPath();
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(buildingSpace, buildingHeight, buildingWidth, canvasHeight-buildingHeight);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(canvasWidth-buildingWidth-buildingSpace, buildingHeight, buildingWidth, canvasHeight-buildingHeight);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();
    
    gorilla.onload = function () {
      ctx.drawImage(gorilla, buildingSpace-23, y);
    };

    banana.onload = function () {
      ctx.drawImage(banana, bx, by);
    };

    gorilla.src = 'gorilla.png';
    banana.src = 'banana.png';


    if(keys[87] == true) {
      if (y > 174) { y = y - 1; }
      heightText.innerHTML = y;
    }

    if(keys[83] == true) {
      if (y < 550) { y = y + 1; }
      heightText.innerHTML = y;
    }

    if(keys[68] == true) {
      // throw banana!!!
      bx = bx + 2;
    }    

  };

  setInterval(draw, 10);

}