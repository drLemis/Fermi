'use strict';

const colorBackground = "#050505";

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

function updateField() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < listStars.length; index++) {
        drawStar(listStars[index]);
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

    if (star.evolutionStage >= 5) {
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
            ctx.arc(window.innerWidth / star.pos[0], window.innerHeight / star.pos[1], radius, 0, 2 * Math.PI);
            ctx.stroke();
            radius -= 0.5;
            if (alpha < 0.9)
                alpha += 0.03;
        }
    }

    ctx.fillStyle = star.colorString;
    ctx.beginPath();
    ctx.arc(window.innerWidth / star.pos[0], window.innerHeight / star.pos[1], size, 0, 2 * Math.PI);
    ctx.fill();

    if (star.evolutionStage > 0) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "16px Consolas";
        ctx.fillText("LIFE: " + enumEvolution[+star.evolutionStage], window.innerWidth / star.pos[0], window.innerHeight / star.pos[1] + 16);
    }

    if (star.status != "") {
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "left";
        ctx.font = "16px Consolas";
        ctx.fillText(star.status, window.innerWidth / star.pos[0]+10, window.innerHeight / star.pos[1]);
    }


    if (star == playerStar) {
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.font = "16px Consolas";
        ctx.fillText("YOU->", window.innerWidth / star.pos[0] - 25, window.innerHeight / star.pos[1] + 5);

        for (let index = 0; index < listStars.length; index++) {
            var starOther = listStars[index];
            if (starOther != star && starOther.evolutionStage >= 5) {
                var distance = Math.getDistance(window.innerWidth / star.pos[0], window.innerHeight / star.pos[1], window.innerWidth / starOther.pos[0], window.innerHeight / starOther.pos[1]);

                if (distance < starOther.radius && distance > starOther.innerRadius) {
                    if (star.evolutionStage < 5) {
                        ctx.fillText("NO ONE TO HEAR!", window.innerWidth / star.pos[0], window.innerHeight / star.pos[1] - 10);
                        break;
                    }
                }
            }
        }
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

Math.getDistance = function (x1, y1, x2, y2) {

    var xs = x2 - x1,
        ys = y2 - y1;

    xs *= xs;
    ys *= ys;

    return Math.abs(Math.sqrt(xs + ys));
};