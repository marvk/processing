with (p5) {
    let centerX;
    let centerY;

    let seed;

    let speed = 1 / 300;

    let capturer

    function setup() {
        createCanvas(getPreferredWidth(), getPreferredHeight());
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);
        seed = random();

        capturer = new CCapture({format: 'webm', autoSaveTime: 10, verbose: true});
        capturer.start();

        frameRate(60);
    }

    function windowResized() {
        resizeCanvas(getPreferredWidth(), getPreferredHeight());
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);
    }

    function getPreferredWidth() {
        // return windowWidth;
        return 1000;
    }

    function getPreferredHeight() {
        // return windowHeight;
        return 1000;
    }

    function draw() {
        const time = frameCount;
        const radius = min(width, height) / 3;

        background("#10071a");
        randomSeed(seed);

        noStroke();
        fill("#ffffff");
        let lastX = null;
        let lastY = null;

        for (let i = 0; i < 10000; i++) {
            const timeOffset = random(0, TWO_PI);
            const currentTime = time * random(-speed, speed) + timeOffset;
            const x = centerX + sin(currentTime) * radius;
            const y = centerY + cos(currentTime) * radius;

            noStroke();
            fill("#ffffff");
            // ellipse(x, y, 5, 5);

            if (i % 2 === 1) {
                noFill();
                const distance = dist(x, y, lastX, lastY);
                const df = 255 - 255 * (distance / (radius * 2));
                stroke(255, df, 0, df);
                line(x, y, lastX, lastY);
            }

            lastY = y;
            lastX = x;
        }

        console.log(frameCount);

        if (frameCount === 600) {
            capturer.stop();
            capturer.save();
        } else {
            capturer.capture(document.getElementById('defaultCanvas0'));
        }

        // drawFrame(radius);
    }

    function drawFrame(radius) {
        noFill();
        stroke("#ffffff");
        ellipse(centerX, centerY, radius * 2, radius * 2);
    }
}
