var scrH = 480;
var scrW = 640;
var offset = 100;

var tsmitterX = 0;
var tsmitterY = 0;

var points = [{
    name: '',
    x: 111,
    y: 111
}];


var table; // таблица координат приемников


let receivers = [{
        "name": "Yuka",
        "x": 0,
        "y": 0
    },
    {
        "name": "Miky",
        "x": 0,
        "y": 0
    },
    {
        "name": "Volga",
        "x": 0,
        "y": 0
    }
];

var myGeo = {
    x: 0,
    y: 0
};




function draw() {

    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        canvas.getContext("2d").clearRect(0, 0, scrW, scrH);
        clearPage(ctx, canvas);
        //clear Table
        table = document.getElementById("rtable");
        if (table) {
            table.innerHTML = "";
        }
        drawBoard(ctx, 20);

        for (receiver of receivers) {
            ctx.fillStyle = "#fd7e14";
            var receiverX = Math.floor(Math.random() * (scrW - offset)) + offset / 2;
            var receiverY = Math.floor(Math.random() * (scrH - offset)) + offset / 2;
            ctx.arc(receiverX, receiverY, 5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            receiver.x = receiverX;
            receiver.y = receiverY;
            addCoords(receiver.name, receiver.x, receiver.y);

            //text
            ctx.font = "14px serif";
            ctx.fillStyle = "#fd7e14";
            ctx.fillText(receiver.name, receiver.x - 10, receiver.y + 20);
        }

    }
}

function drawpath() {
    genTargets(3);
    // test
    var canvas = document.getElementById("canvaspath");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        clearPage(ctx, canvas);


        // for (point of points) {
        //     //target pos
        //     ctx.beginPath();
        //     ctx.fillStyle = "red";
        //     var receiverX = point.x;
        //     var receiverY = point.y;
        //     ctx.arc(receiverX, receiverY, 4, 0, Math.PI * 2, true);
        //     ctx.closePath();
        //     ctx.fill();

        //     //text
        //     ctx.font = "12px serif";
        //     ctx.fillStyle = "#dc3545";
        //     ctx.fillText(point.name, point.x - 10, point.y + 20);
        // }

        // var i = 0;
        // var prevX = -100;
        // var prevY = -100;


        // for (point of points) {

        //     if (i >= 0 && prevY > 0 && prevX > 0) {
        //         ctx.beginPath();
        //         ctx.strokeStyle = "#dc354582";
        //         ctx.lineWidth = 5;
        //         ctx.moveTo(prevX, prevY);
        //         ctx.lineTo(point.x, point.y);
        //         ctx.closePath();
        //         ctx.stroke();
        //         prevX = point.x;
        //         prevY = point.y;
        //     } else {
        //         prevX = point.x;
        //         prevY = point.y;
        //     }
        //     i++;
        // }
        start();
    }
}

function clearPage(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
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





function genTargets(count) {
    points.splice(0, points.length);
    for (let index = 0; index < count; index++) {
        points.push({
            name: "point " + index,
            x: Math.floor(Math.random() * (scrW - offset)) + offset / 2,
            y: Math.floor(Math.random() * (scrH - offset)) + offset / 2
        });
    }
}


function start() {
    // test
    var canvas = document.getElementById("canvaspath");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        for (var i = 0; i <= points.length; i++) {
            if (i == 0) {
                ctx.beginPath();
                ctx.fillStyle = "#ffc107";
                var receiverX = points[i].x;
                var receiverY = points[i].y;
                myGeo.x = receiverX;
                myGeo.y = receiverY;
                ctx.arc(receiverX, receiverY, 6, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
        }

        for (receiver of receivers) {
            var radius = calcDistance(myGeo, receiver);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#20c99714";
            ctx.arc(receiver.x, receiver.y, radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
            //ctx.fill();
            console.log("Маяк: ", receiver.name, "Расстояние до передатчика: " + radius);
        }


        // геометрия
        for (var i = 1; i<receivers.length; i++) {
            calcMiddle(receivers[i-1], receivers[i], myGeo);
        }
    }
}



genTargets(3);