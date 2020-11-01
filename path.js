console.log('path.js')

var scrH = 480;
var scrW = 640;
var offset = 50;





function drawpath() {
    // test
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      canvas.getContext("2d").clearRect(0, 0, scrW, scrH);
      clearPage(ctx, canvas);
      drawBoard(ctx, 20);

      for (receiver of receivers) {
        ctx.fillStyle = "#fd7e14";
        var receiverX = Math.floor(Math.random() * (scrW-offset))+offset/2;
        var receiverY = Math.floor(Math.random() * (scrH-offset))+offset/2;
        ctx.arc(receiverX, receiverY, 5, 0, Math.PI*2 ,true);
        ctx.closePath();
        ctx.fill();
        addCoords(receiver.name, receiverX, receiverY);
      }
    }
}

function clearPage(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
    //clear Table
    var table = document.getElementById("rtable");
    table.innerHTML = "";
}

