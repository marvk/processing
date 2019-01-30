with (p5) {
    let DIAMETER_X = 25;
    let DIAMETER_Y = 10;

    let NOISE_SCALE = 0.001;

    let T = 0;
    let T_D = 0.005;

    let CENTER_X;
    let CENTER_Y;

    let WAVE_SIZE = 200;

    function setup() {
        createCanvas(windowWidth, windowHeight);

        setVars();

        background(255);
        frameRate(30);

    }
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        setVars();

    }
    function setVars() {
        CENTER_X = width / 2;
        CENTER_Y = height / 2;
    }

    function draw() {

        T += T_D;

        //background(255);
        noStroke();
        fill(255, 255, 255, 25);

        rect(0, 0, width, height);
        for (let x = -DIAMETER_X * 5; x < width + DIAMETER_X * 5; x += DIAMETER_X) {
            beginShape();
            for (let y = -DIAMETER_Y; y < height + DIAMETER_Y; y += DIAMETER_Y) {


                //noStroke();
                //fill(r * 255);
                //rect(x, y, DIAMETER_X, DIAMETER_Y);
                noFill();

                stroke(0);
                let r = noise(x * NOISE_SCALE + T, y * NOISE_SCALE);
                let offset = (r - 0.5) * WAVE_SIZE;

                vertex(x + (DIAMETER_X / 2) + offset, y + (DIAMETER_Y / 2));
            }
            endShape();
        }
    }
}
