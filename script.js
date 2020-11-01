console.log('hello!')

var scrH = 480;
var scrW = 640;
var offset = 50;


let receivers = [
    {
        "name": "Yuka"
    },
    {
        "name": "Miky"
    },
    {
        "name": "Volga"
    }
];





function draw() {

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

function drawBoard(context, size){
    var p = 0;
    for (var x = 0; x <= scrW; x += size) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, scrH + p);
    }

    for (var x = 0; x <= scrH; x += size) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(scrW + p, 0.5 + x + p);
    }
    context.strokeStyle = "#424344";
    context.stroke();
    context.closePath();
}

// receivers coords tab
function addCoords(rName, rX, rY) {
    var table = document.getElementById("rtable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = rName;
    cell2.innerHTML = rX;
    cell3.innerHTML = rY;
}