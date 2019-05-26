'use strict';

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

function updateField() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < listStars.length; index++) {
        drawStar(listStars[index]);
    }

    var actualX = window.innerWidth / playerStar.pos[0];
    var actualY = window.innerHeight / playerStar.pos[1];

    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.font = "16px Consolas";
    ctx.fillText("YOU->", actualX - 25, actualY + 5);

    for (let index = 0; index < listStars.length; index++) {
        var starOther = listStars[index];
        if (starOther != playerStar && starOther.evolutionStage >= 5) {
            var distance = getDistance(actualX, actualY, window.innerWidth / starOther.pos[0], window.innerHeight / starOther.pos[1]);

            if (distance < starOther.radius && distance > starOther.innerRadius) {
                if (playerStar.evolutionStage < 5) {
                    ctx.fillText("NO ONE TO HEAR!", actualX, actualY - 10);
                    break;
                }
            }
        }
    }

    ctx.fillStyle = "#555555";
    ctx.fillRect(0, 0, 146, 25);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "left";
    ctx.font = "16px Consolas";
    ctx.fillText(yearsCurrent + " years", 10, 16);
}

function drawStar(star) {
    let size = star.evolutionStage + 1;

    var actualX = window.innerWidth / star.pos[0];
    var actualY = window.innerHeight / star.pos[1];
    var maxX = window.innerWidth;
    var maxY = window.innerHeight;


    if ((star.evolutionStage >= 5 || star.radius > 0) &&
        (star.innerRadius < getDistance(actualX, actualY, 0, 0) || star.innerRadius < getDistance(actualX, actualY, maxX, maxY) ||
            star.innerRadius < getDistance(actualX, actualY, 0, maxY) || star.innerRadius < getDistance(actualX, actualY, maxX, 0))) {
        size = 4;
        let radius = star.radius;
        star.radius++;

        // no more radio
        if (star.evolutionStage >= 8)
            star.innerRadius++;

        let alpha = 0;
        while (radius > star.innerRadius) {
            ctx.strokeStyle = `hsl(${star.colorValues[0]},${star.colorValues[1]}%,${star.colorValues[2]}%,${star.colorValues[3]-alpha})`;
            ctx.beginPath();
            ctx.arc(actualX, actualY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            radius -= 0.5;
            if (alpha < 0.95)
                alpha += 0.03;
        }
    }

    ctx.fillStyle = star.colorString;
    ctx.beginPath();
    ctx.arc(actualX, actualY, size, 0, 2 * Math.PI);
    ctx.fill();

    if (star.evolutionStage > 0) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "16px Consolas";
        ctx.fillText("LIFE: " + enumEvolution[+star.evolutionStage], actualX, actualY + 18);
    }

    if (star.status != "") {
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "left";
        ctx.font = "16px Consolas";
        ctx.fillText(star.status, actualX + 10, actualY);
    }
}

const randomColor = (() => {
    "use strict";

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return () => {
        var h = randomInt(0, 360);
        var s = randomInt(42, 98);
        var l = randomInt(40, 90);

        var obj = {
            values: [h, s, l, 1],
            string: `hsla(${h},${s}%,${l}%,1)`
        };

        return obj

        //return `hsl(${h},${s}%,${l}%)`;
    };
})();

function getDistance(x1, y1, x2, y2) {

    var xs = x2 - x1,
        ys = y2 - y1;

    xs *= xs;
    ys *= ys;

    return Math.abs(Math.sqrt(xs + ys));
};