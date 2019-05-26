'use strict';

let listStars = [];
let playerStar;

const enumEvolution = ["", "civilized", "centralized", "colonial", "technological", "advanced", "space", "modern", "futuristic", "transcendental"];

class Star {
	name = "";
	pos = [0, 0];
	colorValues = [0,0,0,0];
	colorString = "hsl(0,0%,0%,1)";
	radius = 0;
	innerRadius = 0;
	evolutionStage = Math.random() < 0.05;
	yearsEvolution = yearsCurrent;
	yearsMod = Math.random() * Math.random();
	status = "";
	
	changeColor(array) {
		this.colorString = `hsl(${array[0]},${array[1]}%,${array[2]}%,${array[3]})`;
		this.colorValues = [];
		this.colorValues = array;
	} 
}

function generateStarList(amount) {
	listStars = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let index = 0; index < amount; index++) {
        let star = new Star();
		star.name = "test";
		star.changeColor(randomColor().values);
        star.pos[0] = (window.innerWidth / (getRandomArbitrary(50, canvas.width - 50))).toFixed(2);
        star.pos[1] = (window.innerHeight / (getRandomArbitrary(50, canvas.height - 50))).toFixed(2);

		star.habitable = Math.random() < 0.1;
        listStars.push(star);
	}
	
	playerStar = listStars[0]
    updateField();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}