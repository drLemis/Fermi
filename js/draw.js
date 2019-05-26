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

    for (let index = 0; index < listShips.length; index++) {
        drawShip(listShips[index]);
    }

    var actualPos = getActualPos(playerStar.pos);

    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.font = "16px Consolas";
    ctx.fillText("YOU->", actualPos.x - 25, actualPos.y + 5);

    for (let index = 0; index < listStars.length; index++) {
        var starOther = listStars[index];
        if (starOther != playerStar && starOther.evolutionStage >= 5) {
            var starOtherPos = getActualPos(starOther.pos);
            var distance = getDistanceVec(actualPos, starOtherPos);

            if (distance < starOther.radius && distance > starOther.innerRadius) {
                if (playerStar.evolutionStage < 5) {
                    ctx.fillText("NO ONE TO HEAR!", actualPos.x, actualPos.y - 10);
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

    var actualPos = getActualPos(star.pos);
    var maxPos = new vector(window.innerWidth, window.innerHeight);


    if ((star.evolutionStage >= 5 || star.radius > 0) &&
        (star.innerRadius < getDistanceVec(actualPos, {x:0,y:0}) || star.innerRadius < getDistanceVec(actualPos, maxPos) ||
            star.innerRadius < getDistanceVec(actualPos, {x:0, y:maxPos.y}) || star.innerRadius < getDistanceVec(actualPos, {x:maxPos.x, y:0}))) {
        size = 4;
        let radius = star.radius;
        star.radius++;

        // no more radio
        if (star.evolutionStage >= 8 || star.innerRadius > 0)
            star.innerRadius++;

        let alpha = 0;
        while (radius > star.innerRadius) {
            ctx.strokeStyle = `hsl(${star.colorValues[0]},${star.colorValues[1]}%,${star.colorValues[2]}%,${star.colorValues[3]-alpha})`;
            ctx.beginPath();
            ctx.arc(actualPos.x, actualPos.y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            radius -= 0.5;
            if (alpha < 0.95)
                alpha += 0.03;
        }
    }

    ctx.fillStyle = star.colorString;
    ctx.beginPath();
    ctx.arc(actualPos.x, actualPos.y, size, 0, 2 * Math.PI);
    ctx.fill();

    if (star.evolutionStage > 0) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "16px Consolas";
        ctx.fillText("LIFE: " + enumEvolution[+star.evolutionStage], actualPos.x, actualPos.y + 18);
        
        if (star.ruler != null && star.ruler != star) {
            var from = getActualPos(star.pos);
            var to = getActualPos(star.ruler.pos);
            ctx.strokeStyle = star.ruler.colorString
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        }
    }

    if (star.status != "") {
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "left";
        ctx.font = "16px Consolas";
        ctx.fillText(star.status, actualPos.x + 10, actualPos.y);
    }
}

function drawShip(ship) {
    var actualPos = getActualPos(ship.pos);

    ctx.fillStyle = ship.homeStar.colorString;
    ctx.beginPath();
    ctx.arc(actualPos.x, actualPos.y, 2, 0, 2 * Math.PI);
    ctx.fill();
}