class vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.arr = [this.x, this.y];
    }

    add(otherVector) {
        return new vector(this.x + otherVector.x, this.y + otherVector.y)
    }

    sub(otherVector) {
        return new vector(this.x - otherVector.x, this.y - otherVector.y)
    }

    normalize(len) {
        if ((this.x == 0 && this.y == 0) || len == 0) {
            return;
        }
        var angle = Math.atan2(this.y, this.x);
        var nx = Math.cos(angle) * len;
        var ny = Math.sin(angle) * len;

        return new vector(nx, ny)
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

function getDistanceVec(from, to) {

    var xs = to.x - from.x,
        ys = to.y - from.y;

    xs *= xs;
    ys *= ys;

    return Math.abs(Math.sqrt(xs + ys));
};

function getActualPos(pos) {
    return new vector(window.innerWidth / pos.x, window.innerHeight / pos.y);
};