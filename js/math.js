

function calcDistance(firstPos, secondPos) {
    if (secondPos.x && secondPos.y && firstPos.x && firstPos.y) {
        var distance = Math.sqrt((secondPos.x - firstPos.x) ** 2 + (secondPos.y - firstPos.y) ** 2);
        return distance
    } else {
        return 'error!!!!!!!'
    }
}

//http://algolist.ru/maths/geom/intersect/circlecircle2d.php

function calcMiddle(firstPoint, secondPoint, target) {
    // a = (r0^2 - r1^2 + d^2 ) / (2d)
    // h^2 = r0^2 - a^2
    // P2 = P0 + a ( P1 - P0 ) / d
    //"p0" is first receiver
    //"p1" is second receiver
    // "r0" is distance to target from p0
    // "r1" is distance to target from p1
    // "a" - distance to the point of intersection between two circles  as will be named "p2"
    // "d" - distance between two receivers
    // "h" - distance between two receivers p2 point
    r0 = calcDistance(firstPoint, target);
    r1 = calcDistance(secondPoint, target);
    d = calcDistance(firstPoint, secondPoint);
    a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
    h = r0 ** 2 - a ** 2;
    p2x = firstPoint.x + a * (secondPoint.x - firstPoint.x) / d;
    p2y = firstPoint.y + a * (secondPoint.y - firstPoint.y) / d;
    //x3 = x2 +- h ( y1 - y0 ) / d
    // y3 = y2 -+ h ( x1 - x0 ) / d
    p3x1 = p2x - Math.sqrt(h) * (secondPoint.y - firstPoint.y) / d;
    p3y1 = p2y + Math.sqrt(h) * (secondPoint.x - firstPoint.x) / d;
    p3x2 = p2x + Math.sqrt(h) * (secondPoint.y - firstPoint.y) / d;
    p3y2 = p2y - Math.sqrt(h) * (secondPoint.x - firstPoint.x) / d;
    // console.log(r0, "- is distance to target from p0");
    // console.log(r1, "- is distance to target from p1");
    // console.log(d, "- distance between two receivers");
    // console.log(a, "- distance to the point of intersection between two circles");
    // console.log(Math.sqrt(h), "- distance between two receivers 'p2' point");
    console.log("Координаты передатчика вычислена: ","от "+firstPoint.name+" и "+secondPoint.name+" - ", p3x1, p3y1);
    console.log("Координаты передатчика вычислена: ","от "+firstPoint.name+" и "+secondPoint.name+" - ", p3x2, p3y2);
    console.log("Координаты передатчика на самом деле: ", target.x, target.y);

    var canvas = document.getElementById("canvasmove");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        clearPage(ctx, canvas);
        ctx.fillStyle = "#007bffbf";
        ctx.arc(p3x1, p3y1, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "#007bffbf";
        ctx.arc(p3x2, p3y2, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }
}