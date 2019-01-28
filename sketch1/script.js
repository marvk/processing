with (p5) {
    let DEBUG = false;
    let SIZE = 800;

    let HEX_RADIUS = 3;
    let HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
    let HEX_HEIGHT = 2 * HEX_RADIUS;
    let HEX_ROW_HEIGHT = 3 * HEX_HEIGHT / 4;

    let HEX_NUM_X;
    let HEX_NUM_Y;

    let POINTS = [];

    function setup() {
        createCanvas(SIZE - SIZE % HEX_WIDTH, SIZE - SIZE % HEX_ROW_HEIGHT);

        HEX_NUM_X = width / HEX_WIDTH + 1;
        HEX_NUM_Y = height / HEX_ROW_HEIGHT + 1;

        frameRate(1);


        f(
            new Point3D(0, 0, 0),
            30,
            0,
            POINTS,
            random(0, 10000),
            new Point3D(-1, 1, 0)
        );
    }

    function f(previous, i, branchDepth, list, seed, direction) {
        if (i === 0) {
            return;
        }

        let current = previous.clone();
        current.translatePoint(direction);

        //list.push(current);

        let c = current;

        list.push(new Point3D(c.x, c.y, c.z));
        list.push(new Point3D(c.y, c.x, c.z));
        list.push(new Point3D(c.z, c.y, c.x));
        list.push(new Point3D(c.x, c.z, c.y));
        list.push(new Point3D(c.z, c.x, c.y));
        list.push(new Point3D(c.y, c.z, c.x));

        randomSeed(seed);
        let nextSeed = random(0, 1000000);
        let r = Math.floor(random(0, 100));

        let branch = r < (1 / ((branchDepth + 1) / 10));
        let straight = r < 95;

        if (branch) {
            f(current, i - 1, branchDepth + 1, list, nextSeed, direction.left());
            f(current, i - 1, branchDepth + 1, list, nextSeed, direction.right());
        }

        if (straight) {
            f(current, i - 1, branchDepth, list, nextSeed, direction);
        }
    }

    function draw() {
        background(50);
        fill(255);
        noStroke();


        for (let y = 0; y < HEX_NUM_Y; y++) {
            let yPrime = (3 * HEX_HEIGHT / 4) * y;

            for (let x = 0; x < HEX_NUM_X; x++) {
                let xOffset = y % 2 === 0 ? HEX_WIDTH / 2 : 0;
                let xPrime = HEX_WIDTH * x + xOffset;

                let c = color(255);

                let point2D = new Point2D(x, y);
                point2D.translate(Math.round(-HEX_NUM_X / 2), Math.round(-HEX_NUM_Y / 2));

                let point3D = point2D.oddrToCube();

                let doColor = contains(POINTS, point3D);

                //let doColor = point3D.x === 0 || point3D.z === 0 || point3D.y === 0;

                if (doColor) {
                    c = color(random(0, 255), random(0, 255), random(0, 255));
                } else {
                    c = color(20);
                }

                fill(c);
                stroke(c);

                drawHexagon(xPrime, yPrime, HEX_RADIUS);

                if (DEBUG) {
                    fill(255);
                    stroke(0);
                    text(str(point2D.x) + "     " + str(point2D.y), xPrime - 10, yPrime);
                }
            }
        }
    }

    function contains(list, point3d) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].equals(point3d)) {
                return true;
            }
        }

        return false;
    }


    function drawHexagon(x, y, radius) {
        let center = new Point2D(x, y);

        beginShape();
        for (let i = 0; i < 6; i++) {
            let point = hexagonCorner(center, radius, i);
            vertex(point.x, point.y);
        }
        endShape(CLOSE);
    }

    function hexagonCorner(center, radius, i) {
        let angleDeg = 60 * i - 30;
        let angleRad = PI / 180 * angleDeg;

        return new Point2D(center.x + radius * cos(angleRad), center.y + radius * sin(angleRad));
    }

    class Point2D {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        axialToCube() {
            return new Point3D(this.x, -this.x - this.y, this.y);
        }

        translatePoint(other) {
            this.translate(other.x, other.y);
        }

        translate(x, y) {
            this.x += x;
            this.y += y;
        }

        oddrToCube() {
            let x = this.x - (this.y - (this.y & 1)) / 2;
            let z = this.y;
            let y = -x - z;

            return new Point3D(x, y, z);
        }
    }

    class Point3D {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        cubeToAxial() {
            return new Point2D(this.x, this.z);
        }

        cubeToOddr() {
            let col = this.x + (this.z - (this.z & 1)) / 2;
            let row = this.z;

            return new Point2D(col, row);
        }

        equals(other) {
            return this.constructor === other.constructor && this.x === other.x && this.y === other.y && this.z === other.z;
        }

        translatePoint(other) {
            this.translate(other.x, other.y, other.z);
        }

        translate(x, y, z) {
            this.x += x;
            this.y += y;
            this.z += z;
        }

        left() {
            let result = this.clone();
            result._left();
            return result;
        }

        right() {
            let result = this.clone();
            result._right();
            return result;
        }

        _left() {
            if (this.x === 0) {
                let temp = this.x;
                this.x = this.y;
                this.y = temp;
            } else if (this.y === 0) {
                let temp = this.y;
                this.y = this.z;
                this.z = temp;
            } else if (this.z === 0) {
                let temp = this.z;
                this.z = this.x;
                this.x = temp;
            }
        }

        _right() {
            if (this.x === 0) {
                let temp = this.z;
                this.z = this.x;
                this.x = temp;
            } else if (this.y === 0) {
                let temp = this.x;
                // noinspection JSSuspiciousNameCombination
                this.x = this.y;
                this.y = temp;
            } else if (this.z === 0) {
                let temp = this.y;
                this.y = this.z;
                this.z = temp;
            }
        }

        clone() {
            return new Point3D(this.x, this.y, this.z);
        }
    }
}