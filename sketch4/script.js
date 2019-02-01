with (p5) {
    let CENTER_X;
    let CENTER_Y;

    let NOISE_SCALE = 0.1;
    let ROUGHNESS = 2;
    let POW = 10;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        setCenters();

        noLoop();
        // frameRate(60);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        setCenters();
    }

    function setCenters() {
        CENTER_X = Math.round(width / 2);
        CENTER_Y = Math.round(height / 2);
    }

    function draw() {
        beginShape();
        let BASE_HEIGHT = 200;
        let SIDE_DISTANCE = 100;

        let xOriginRight = width - SIDE_DISTANCE;
        let yOriginRight = height - BASE_HEIGHT;

        let xOriginCenter = CENTER_X;
        let yOriginCenter = 400;

        let xOriginLeft = SIDE_DISTANCE;
        let yOriginLeft = height - BASE_HEIGHT;

        let SIDE_RESOLUTION = 50;

        let xDiffRight = (xOriginCenter - xOriginRight) / SIDE_RESOLUTION;
        let yDiffRight = (yOriginCenter - yOriginRight) / SIDE_RESOLUTION;

        vertex(xOriginRight, yOriginRight + 100);

        for (let i = 1; i <= SIDE_RESOLUTION; i++) {
            let x = xOriginRight + xDiffRight * i;
            let off = -Math.pow(offset(i), 1 + (i / SIDE_DISTANCE) * POW);
            let y = yOriginRight + yDiffRight * i + off;
            vertex(x, y);
        }

        let xDiffLeft = (xOriginLeft - xOriginCenter) / SIDE_RESOLUTION;
        let yDiffLeft = (yOriginLeft - yOriginCenter) / SIDE_RESOLUTION;

        for (let i = 1; i < SIDE_RESOLUTION; i++) {
            let x = xOriginCenter + xDiffLeft * i;
            let index = SIDE_RESOLUTION - i;

            let off = -Math.pow(offset(SIDE_RESOLUTION+i), 1 + (index / SIDE_DISTANCE) * POW);
            let y = yOriginCenter + yDiffLeft * i + off;
            vertex(x, y);
        }

        vertex(xOriginLeft, yOriginLeft + 100);

        endShape();
    }

    function offset(i) {
        let number1 = 1 + noise(i * NOISE_SCALE) * ROUGHNESS;
        return number1;
    }
}
