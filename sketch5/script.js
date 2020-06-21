with (p5) {
    let CENTER_X;
    let CENTER_Y;

    let t = 0;

    let TIME_SCALE = 1;

    let NUM_PER_FRAME = 5;

    let C1 = "#0f7173";
    let C2 = "#f05d5e";

    function setup() {
        createCanvas(windowWidth, windowHeight);
        CENTER_X = Math.round(width / 2);
        CENTER_Y = Math.round(height / 2);

        background("#272932");

        frameRate(60);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    function draw() {
        t += TIME_SCALE;


        strokeWeight(1);

        fill(C1);
        for (let i = 0; i < TIME_SCALE; i += TIME_SCALE / NUM_PER_FRAME) {
            drawFrame(CENTER_X, CENTER_Y, t + i, 0);
        }

        fill(C2);
        for (let i = 0; i < TIME_SCALE; i += TIME_SCALE / NUM_PER_FRAME) {
            drawFrame(CENTER_X, CENTER_Y, (t + i) * 1.05, 0);
        }
    }

    function drawFrame(x, y, t, offset) {
        ellipse(x + sin(t / 10 + offset) * 200, y + sin(t / 20 + offset) * 400, 100, 300);
    }
}
