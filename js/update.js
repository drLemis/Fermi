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

            if (Math.random() < 0.01) {
                star.evolutionStage = 0;
                star.status = "DEATH!"
            } else {
                star.yearsMod * 0.5;
                if (Math.random() > 0.5)
                    star.status = "WAR!"
                else
                    star.status = "PLAGUE!"
            }
        }
        
        if (star.status != "" && yearsCurrent - star.yearsEvolution >= 100) {
            star.status = "";
        }

    });

    updateField();
}, 33);