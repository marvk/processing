with (p5) {
    let centerX;
    let centerY;

    let seed;
    let speed = 1 / 100;


    let mic;
    let fft;
    let amplitude;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);

        seed = random();

        mic = new AudioIn();
        mic.start();
        fft = new p5.FFT();
        mic.connect(fft);

        amplitude = new p5.Amplitude(0.5);
        amplitude.setInput(mic);
        amplitude.toggleNormalize(true);

        frameRate(60);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
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

        const spectrum = fft.analyze();

        for (let i = 0; i < 1000; i++) {
            const timeOffset = random(0, TWO_PI);
            const currentTime = time * random(-speed, speed) + timeOffset;

            const spectrumIndex = (int)((currentTime / TWO_PI) * 200);

            const spectrumOffset = spectrum[spectrumIndex];

            const levelOffset = amplitude.getLevel() * 200;
            const currentRadius = radius + spectrumOffset;

            const x = centerX + sin(currentTime) * currentRadius;
            const y = centerY + cos(currentTime) * currentRadius;

            noStroke();
            fill("#ffffff");
            // ellipse(x, y, 5, 5);

            if (i % 2 === 1) {
                noFill();
                const distance = dist(x, y, lastX, lastY);
                const df = 255 - 255 * (distance / (currentRadius * 2));
                stroke(255, df, 0, df);
                line(x, y, lastX, lastY);
            }

            lastY = y;
            lastX = x;
        }
    }
}
