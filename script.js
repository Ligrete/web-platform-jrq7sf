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
    y: 0,
    sx: 0,
    sy: 0
};

function restartCalc() {
    clearPages();

    clearTimeout(intervalCalc);
    this.myGeo = {
        x: 0,
        y: 0,
        sx: 0,
        sy: 0
    };

    this.receivers = [{
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

    this.points = [{
        name: '',
        x: 111,
        y: 111
    }];

    draw();


}


function draw() {

    console.log('draw.js');

    var canvas = document.getElementById("canvas");
    if (canvas) {
        var ctx = canvas.getContext("2d");
        // canvas.getContext("2d").clearRect(0, 0, scrW, scrH);
        clearPage(ctx, canvas);
        table = document.getElementById("rtable");
        if (table) {
            table.innerHTML = "";
        }
        for (receiver of receivers) {
            ctx.fillStyle = "#fd7e14";
            var receiverX = Math.floor(Math.random() * (scrW - offset)) + offset / 2;
            var receiverY = Math.floor(Math.random() * (scrH - offset)) + offset / 2;
            ctx.arc(receiverX, receiverY, 5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            receiver.x = receiverX;
            receiver.y = receiverY;
            addCoords("rtable", receiver.name, receiver.x, receiver.y);

            //text
            ctx.font = "14px serif";
            ctx.fillStyle = "#fd7e14";
            ctx.fillText(receiver.name, receiver.x - 10, receiver.y + 20);
        }

        drawpath();
        start();

    }
}

function drawpath() {
    console.log('drawpath.js');
    genTargets(3);
    // test
    var canvas = document.getElementById("canvaspath");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        for (point of points) {
            //target pos
            ctx.beginPath();
            ctx.fillStyle = "red";
            var receiverX = point.x;
            var receiverY = point.y;
            ctx.arc(receiverX, receiverY, 4, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            //text
            ctx.font = "12px serif";
            ctx.fillStyle = "#dc3545";
            ctx.fillText(point.name, point.x - 10, point.y + 20);
        }

        var i = 0;
        var prevX = -100;
        var prevY = -100;


        for (point of points) {

            if (i >= 0 && prevY > 0 && prevX > 0) {
                ctx.beginPath();
                ctx.strokeStyle = "#dc354582";
                ctx.lineWidth = 5;
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(point.x, point.y);
                ctx.closePath();
                ctx.stroke();
                prevX = point.x;
                prevY = point.y;
            } else {
                prevX = point.x;
                prevY = point.y;
            }
            i++;
        }
    }
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
    console.log('start.js');
    // test
    var canvas = document.getElementById("canvaspath");
    if (canvas) {
        var ctx = canvas.getContext("2d");
        for (var i = 0; i <= points.length; i++) {
            if (i == 0) {
                ctx.beginPath();
                ctx.fillStyle = "#ffc107";
                var receiverX = points[i].x;
                var receiverY = points[i].y;
                myGeo.x = receiverX;
                myGeo.y = receiverY;
                myGeo.sx = receiverX;
                myGeo.sy = receiverY;
                ctx.arc(receiverX, receiverY, 6, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
        }

        for (receiver of receivers) {
            var radius = calcDistance(myGeo, receiver);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#20c99714";
            ctx.arc(receiver.x, receiver.y, radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
            //ctx.fill();
            console.log("Маяк: ", receiver.name, "Расстояние до передатчика: " + radius);
        }





        // геометрия
        for (var i = 1; i < receivers.length; i++) {
            calcMiddle(receivers[i - 1], receivers[i], myGeo);
        }

        setTimeout(() => {
            moveObj(myGeo, 0);
            console.log('start move');
        }, 2000);

    }
}

function drawObj(target) {


    var canvas = document.getElementById("canvaspath");
    if (canvas) {
        var ctx = canvas.getContext("2d");
        clearPage(ctx, canvas);
        ctx.beginPath();
        ctx.arc(target.x, target.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#ffc107";
        ctx.fill();
        ctx.closePath();




        for (receiver of receivers) {
            var radius = calcDistance(myGeo, receiver);
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#FF7C00"; //#ff4d00
            // ctx.strokeStyle = "#20c99714"; 
            ctx.arc(receiver.x, receiver.y, radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
            //ctx.fill();
        }


        for (receiver of receivers) {
            ctx.beginPath();
            ctx.fillStyle = "#FF7C00";
            ctx.arc(receiver.x, receiver.y, 5, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();


            //text
            ctx.font = "14px serif";
            ctx.fillStyle = "#FF7C00";
            ctx.fillText(receiver.name, receiver.x - 10, receiver.y + 20);
        }

        var i = 0;
        var prevX = -100;
        var prevY = -100;


        for (point of points) {

            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            //text
            ctx.font = "12px serif";
            ctx.fillStyle = "#dc3545";
            ctx.fillText(point.name, point.x - 10, point.y + 20);

            if (i >= 0 && prevY > 0 && prevX > 0) {
                ctx.beginPath();
                ctx.strokeStyle = "#dc354582";
                ctx.lineWidth = 5;
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(point.x, point.y);
                ctx.closePath();
                ctx.stroke();
                prevX = point.x;
                prevY = point.y;
            } else {
                prevX = point.x;
                prevY = point.y;
            }
            i++;
        }

        ctx.beginPath();
        ctx.arc(geoTotal.x, geoTotal.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#03FF00";
        ctx.fill();
        ctx.closePath();


        postable = document.getElementById("calctable");
        if (postable) {
            postable.innerHTML = "";
        }

        var table = [{
                name: "RealPos",
                x: myGeo.x,
                y: myGeo.y
            },
            {
                name: "CalculatedPos",
                x: geoTotal.x,
                y: geoTotal.y
            }
        ];
        

        for (const item of table) {
            addCoords("calctable", item.name, Math.round(item.x), Math.round(item.y));
        }


    }



}



var intervalCalc;
var geoTotal = {
    x: 0,
    y: 0
}


function moveObj(startPos, i) {

    clearPages();

    var fMid;
    var sMid;
    var fMid1;
    var fMid2;
    var sMid1;
    var sMid2;
    var total = {
        x: 0,
        y: 0
    };
    for (var index = 1; index < receivers.length; index++) {
        if (index == 1) {
            fMid = calcMiddle(receivers[index - 1], receivers[index], myGeo);
        } else if (index == 2) {
            sMid = calcMiddle(receivers[index - 1], receivers[index], myGeo);
        }
    }
    if (fMid && sMid) {
        fMid1 = Math.round((fMid.x1 + fMid.y1) / 2);
        fMid2 = Math.round((fMid.x2 + fMid.y2) / 2);
        sMid1 = Math.round((sMid.x1 + sMid.y1) / 2);
        sMid2 = Math.round((sMid.x2 + sMid.y2) / 2);

        if (fMid1 == sMid1 && fMid1 != sMid2) {
            geoTotal.x = fMid.x1;
            geoTotal.y = fMid.y1;
        } else if (fMid1 == sMid2 && fMid1 != sMid1) {
            geoTotal.x = fMid.x1;
            geoTotal.y = fMid.y1;
        } else if (fMid1 != sMid2 && fMid1 != sMid1) {
            geoTotal.x = fMid.x2;
            geoTotal.y = fMid.y2;
        }
        console.log("Средние значения: ", fMid1, fMid2, sMid1, sMid2);
        console.log("Среднее значение передатчика: ", Math.round((myGeo.x + myGeo.y) / 2));
        console.log("Вычисленное местоположение: ", geoTotal.x, geoTotal.y);
    }

    var dx, dy;
    if (myGeo.x < scrW && myGeo.x >= 0 && myGeo.y < scrH && myGeo.y >= 0) {
        if (points && points[i] && (Math.round(points[i].x) != Math.round(startPos.x) || Math.round(points[i].y) != Math.round(startPos.y))) {
            dx = points[i].x - startPos.sx;
            dy = points[i].y - startPos.sy;
            startPos.x += dx * 0.01;
            startPos.y += dy * 0.01;
            // console.log("dx,dy: ", dx, dy);
            // console.log(startPos.x, startPos.y);

        } else if (i < points.length) {
            startPos.sx = startPos.x;
            startPos.sy = startPos.y;
            i++;
            dx = 0;
            dy = 0;
        }
    }

    drawObj(startPos);

    intervalCalc = setTimeout(() => {
        if (i < points.length) {
            moveObj(myGeo, i);
        }
    }, 200);
}


draw();