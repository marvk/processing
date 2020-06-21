with (p5) {
    const spriteFrames = 18;
    const movingAverageLength = 5;

    let centerX;
    let centerY;

    let spriteWidth;
    let spriteHeight;

    let spriteData;
    let sprites = [];

    let lastMouse;
    let currentLocation;

    let lastSpeeds = []

    function preload() {
        spriteData = loadImage('dangling-3x.png');
    }

    function setup() {
        createCanvas(windowWidth, windowHeight);
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);

        frameRate(60);


        spriteWidth = spriteData.width;
        spriteHeight = spriteData.height / spriteFrames;
        console.log('spriteWidth: ' + spriteWidth)
        console.log('spriteHeight: ' + spriteHeight)

        for (let i = 0; i < spriteFrames; i++) {
            sprites.push(spriteData.get(0, i * spriteHeight, spriteWidth, spriteHeight))
        }

        handleMouseMove()

        currentLocation = createVector(width / 2, height / 2);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    function mouseMoved() {
        handleMouseMove();
    }

    function mouseDragged() {
        handleMouseMove();
    }

    function handleMouseMove() {
        lastMouse = createVector(mouseX, mouseY);
    }

    function draw() {
        background('#f2a72c');

        let lastLocation = currentLocation;
        currentLocation = p5.Vector.lerp(currentLocation, lastMouse, 0.1)

        const dist = p5.Vector.sub(lastLocation, currentLocation);

        pushSpeed(dist.x)

        // const f = round(((cos(frameCount / 40) + 1) / 2) * (spriteFrames - 2));

        const center = 8;
        const d = max(min(round(movingAverageSpeed()), 8), -8);
        const f = center + d;

        const sprite = sprites[f];

        image(sprite, currentLocation.x - round((spriteWidth) / 2) + 2, currentLocation.y - round((spriteHeight) / 2) + 14);
    }

    function pushSpeed(speed) {
        lastSpeeds.push(speed)

        if (lastSpeeds.length > movingAverageLength) {
            lastSpeeds.shift();
        }
    }

    function movingAverageSpeed() {
        let sum = 0;

        const n = min(movingAverageLength, lastSpeeds.length);
        for (let i = 0; i < n; i++) {
            sum += lastSpeeds[i];
        }

        const divisor = n * (n + 1) / 2;

        return round(sum / divisor);
    }
}
