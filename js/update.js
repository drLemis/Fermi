'use strict'

let yearsCurrent = 0;
let yearsForFirstStage = 750 // 750 preferred

window.setInterval(function () {
    yearsCurrent++;

    listStars.forEach(star => {
        if (star.evolutionStage > 0 && star.evolutionStage < 9) {
            if (yearsCurrent - star.yearsEvolution > yearsForFirstStage / star.evolutionStage && yearsCurrent - star.yearsEvolution > yearsForFirstStage / Math.pow(star.evolutionStage, 2) * star.yearsMod && Math.random() < 0.1) {
                star.yearsEvolution = yearsCurrent;
                star.evolutionStage++;
            }
        }

        if (star.evolutionStage == 0 && Math.random() < 0.0001) {
            star.yearsEvolution = yearsCurrent;
            star.evolutionStage++;
        } else if (star.evolutionStage > 0 && Math.random() < 0.0001 / star.yearsMod) {
            star.yearsEvolution = yearsCurrent;
            star.evolutionStage--;

            if (star.slaves.length > 0) {
                star.slaves[0].slaves = star.slaves[0].slaves.concat(star.slaves);
                star.slaves[0].slaves.push(star);

                star.slaves.forEach(subslave => {
                    subslave.ruler = star.slaves[0];
                });
            }

            if (Math.random() < 0.01) {
                star.evolutionStage = 0;
                star.status = "DEATH!"
                if (star.slaves.length > 0) {
                    var index = star.slaves[0].slaves.indexOf(star);
                    if (index > -1) {
                        star.slaves[0].slaves.splice(index, 1);
                    }
                }
            } else {
                star.yearsMod * 0.5;
                if (Math.random() > 0.5)
                    star.status = "WAR!"
                else
                    star.status = "PLAGUE!"
            }

            star.slaves.forEach(slave => {
                slave.ruler = star.slaves[0];
            });

            star.slaves
        }

        if (star.evolutionStage >= 7 && Math.random() < 0.0005) {
            var distance = Infinity;
            var targetStar;
            for (let index = 0; index < listStars.length; index++) {
                const starOther = listStars[index];
                var newDistance = getDistanceVec(star.pos, starOther.pos);
                if (starOther != star && starOther.evolutionStage < 3 && newDistance < distance) {
                    targetStar = starOther;
                    distance = newDistance;
                }
            }

            if (distance < Infinity) {
                var ship = new Ship();
                ship.homeStar = star;
                ship.pos = new vector(star.pos.x, star.pos.y);
                ship.changeColor(star.colorString);
                ship.posTarget = new vector(targetStar.pos.x, targetStar.pos.y);
                ship.targetStar = targetStar;
                listShips.push(ship);
            }
        }

        if (star.status != "" && yearsCurrent - star.yearsEvolution >= 100) {
            star.status = "";
        }
    });

    listShips.forEach(ship => {
        var dx = ship.targetStar.pos.x - ship.pos.x;
        var dy = ship.targetStar.pos.y - ship.pos.y;
        var dist = getDistanceVec(ship.pos, ship.targetStar.pos);
        var thrust = 0.001;

        var velX = (dx / dist) * thrust;
        var velY = (dy / dist) * thrust;

        if (dist > velX && dist > velY) {
            ship.pos.x = +ship.pos.x + +velX;
            ship.pos.y = +ship.pos.y + +velY;
        } else {
            ship.targetStar.changeColor(ship.homeStar.colorValues);
            ship.targetStar.ruler = ship.homeStar.ruler;
            ship.homeStar.slaves.push(ship.targetStar);
            ship.targetStar.evolutionStage = ship.homeStar.evolutionStage;
            ship.targetStar.yearsEvolution = yearsCurrent;

            var index = listShips.indexOf(ship);
            if (index > -1) {
                listShips.splice(index, 1);
            }
        }
    });

    updateField();
}, 33);