with (p5) {
    let CENTER;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        CENTER = new Point2D(Math.round(width / 2), Math.round(height / 2));

        frameRate(60);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    function draw() {

    }
}
