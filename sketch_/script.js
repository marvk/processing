with (p5) {
    let centerX;
    let centerY;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);

        frameRate(60);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    function draw() {

    }
}
