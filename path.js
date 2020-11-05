


var scrH = 480;
var scrW = 640;


// // повторить с интервалом 2 секунды
// let timerId = setInterval(() => console.log('tick'), 1000);

// // остановить вывод через 5 секунд
// setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);

function clearPage(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
    drawBoard(context, 20);
}

function clearPages() {
    var canvases = ["canvas", "canvasmove", "canvaspath"];
    for (const canvasname of canvases) {
        var canvas = document.getElementById(canvasname);
        if (canvas) {
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var w = canvas.width;
            canvas.width = 1;
            canvas.width = w;
        }
    }

}

function drawBoard(context, size) {
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
function addCoords(tablename, rName, rX, rY) {
    var table = document.getElementById(tablename);
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = rName;
    cell2.innerHTML = rX;
    cell3.innerHTML = rY;
}
