
window.onload = function(){
  var canvas = document.getElementById("bananascene");
  var ctx = canvas.getContext("2d");

  var buildingHeight = 200;
  var buildingWidth = 100;
  var canvasHeight = 600;
  var canvasWidth = 1024;
  var buildingSpace = 100;

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

  var gorilla = new Image();
  gorilla.onload = function () {
    ctx.drawImage(gorilla, buildingSpace-23, 400);
  };

  gorilla.src = 'gorilla.png';
}