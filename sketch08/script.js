with (p5) {
    let centerX;
    let centerY;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        centerX = Math.round(width / 2);
        centerY = Math.round(height / 2);

        frameRate(0);
        draw();
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

    function draw() {
        fill("#FFFFFF10");
        noStroke();

        let yMin = 0;
        let yMax = 1;

        let yInterval = yMax - yMin;

        let xMin = 3.69;
        let xMax = 3.7;

        const mul = 100;

        for (let i = 0; i < windowWidth * mul; i++) {
            const r = lerp(xMin, xMax, i / (windowWidth * mul));

            const arr = log_map(r, 0.5);

            for (let e of arr) {
                const x = i / mul;
                const y = windowHeight - (((e[0] - yMin) * (1 / yInterval)) * windowHeight);

                rect(x, y, 1, 1);
            }

        }
    }

    function inter() {

    }

    function log_map(r, x) {
        for (let i = 0; i < 100; i++) {
            x = logistic(x, r)
        }

        let arr = [to_val(x)]

        for (let i = 0; i < 50; i++) {
            x = logistic(x, r)
            const rounded = _round(x);
            if (contains(arr, rounded)) {
                break;
            }

            arr.push(to_val(x))
        }

        return arr;
    }

    function contains(arr, rounded) {
        for (let e of arr) {
            if (e[1] === rounded) {
                return true;
            }
        }
        return false;
    }

    function to_val(x) {
        return [x, _round(x)]
    }

    function _round(x) {
        return round(x * 1000)
    }

    function logistic(x, r) {
        return r * x * (1 - x);
    }
}
