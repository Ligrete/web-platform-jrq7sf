console.log('path.js')



var scrH = 480;
var scrW = 640;
var offset = 50;

var tsmitterX = 0;
var tsmitterY = 0;

var points = [];


// // повторить с интервалом 2 секунды
// let timerId = setInterval(() => console.log('tick'), 1000);

// // остановить вывод через 5 секунд
// setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);


genTargets();

function genTargets() {
 for (let index = 0; index < 5; index++) {
   points.push({
    name: "point "+index,
    x: Math.floor(Math.random() * (scrW-offset))+offset/2,
    y: Math.floor(Math.random() * (scrH-offset))+offset/2
  });
 }
}


function start() {
  // test
  var canvas = document.getElementById("canvasmove");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    let i = 0;
    for (point of points) {
      if (i == 1)
        ctx.beginPath();
        ctx.fillStyle = "#ffc107";
        var receiverX = point.x;
        var receiverY = point.y;
        ctx.arc(receiverX, receiverY, 6, 0, Math.PI*2 ,true);
        ctx.closePath();
        ctx.fill();
        i++;
    }
  }
}



function drawpath() {
    // test
    var canvas = document.getElementById("canvaspath");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      clearPage(ctx, canvas);

      for (point of points) {
        console.log(point.name+" "+point.x+" "+point.y);
        //target pos
        ctx.beginPath();
        ctx.fillStyle = "red";
        
        var receiverX = point.x;
        var receiverY = point.y;
        ctx.arc(receiverX, receiverY, 4, 0, Math.PI*2 ,true);
        ctx.closePath();
        ctx.fill();
      }
      start();
    }
}

function clearPage(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
    context.closePath();
    context.fill();

}

