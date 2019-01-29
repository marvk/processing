with (p5) {
    let DEBUG = false;

    let SIZE = 900;

    let PARTICLES = [];

    let CENTER;

    let POS;
    let VELOCITY;
    let ANGLE;

    let T = 0;

    function setup() {
        createCanvas(SIZE, SIZE);

        CENTER = new Point2D(Math.round(width / 2), Math.round(height / 2));
        POS = CENTER.clone();
        VELOCITY = 10;
        ANGLE = random(0, TWO_PI);

        frameRate(60);
        draw();
    }

    function draw() {

        background(255);
        noStroke();

        POS.translatePolar(ANGLE, VELOCITY);
        POS.wrapWalls();

        VELOCITY += random(-0.5, 0.5);
        VELOCITY = Math.min(Math.max(VELOCITY, -10), 10);
        ANGLE += random(-0.1, 0.1);

        fill(0);
        ellipse(POS.x, POS.y, 3, 3);

        for (let i = 0; i < 20; i++) {
            PARTICLES.push(createRandomParticle(POS));
        }


        PARTICLES.forEach(p => {
            fill(p.color);
            p.iterate();
            rect(p.location.x, p.location.y, 2, 2);
            //ellipse(p.location.x, p.location.y, 10, 10);
        });

        PARTICLES = PARTICLES.filter(p => p.timeout > 0);
    }

    function createRandomParticle(point) {


        let r = random(0, 4);
        let direction;

        if (r < 1) {
            direction = TWO_PI / 8;
        } else if (r < 2) {
            direction = TWO_PI / 4 + TWO_PI / 8;
        } else if (r < 3) {
            direction = TWO_PI / 2 + TWO_PI / 8;
        } else {
            direction = TWO_PI - TWO_PI / 8;
        }

        direction += random(-0.1, 0.1) + ANGLE;


        return new Particle(
            point.clone(),
            direction,
            random(5, 25),
            100,
            [255 - random(225, 255), 255 - random(100, 200), 255 - random(0, 20), 255]
        )
    }

    class Point2D {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        translatePolar(theta, r) {
            let dx = r * Math.cos(theta);
            let dy = r * Math.sin(theta);
            this.translate(dx, dy);
        }

        translatePoint(other) {
            this.translate(other.x, other.y);
        }

        translate(dx, dy) {
            this.x += dx;
            this.y += dy;
        }

        scale(v) {
            this.x *= v;
            this.y *= v;
        }

        normalize() {
            let length = sqrt(this.x * this.x + this.y * this.y);
            this.x = this.x / length;
            this.y = this.y / length;
        }

        clone() {
            return new Point2D(this.x, this.y);
        }

        wrapWalls() {
            this.x = (this.x + width) % width;
            this.y = (this.y + height) % height;
        }
    }

    class Particle {
        constructor(location, angle, velocity, timeout, color) {
            this.location = location;
            this.angle = angle;
            this.velocity = velocity;
            this.timeout = timeout;
            this.color = color;
        }

        iterate() {
            this.location.translatePolar(this.angle, this.velocity);
            this.location.wrapWalls();
            this.timeout -= 1;
            this.velocity *= 0.95;

            if (this.velocity < 1 || this.timeout < 26) {
                this.color[3] -= 10;
            }
        }
    }
}