with (p5) {
    function setup() {
        import('../sketch1/script.js').then(m => {
            m.setup()
        })

    }

    function windowResized() {
        // import('../sketch1/script.js').then(m => {
        //     m.windowResized()
        // })
    }

    function draw() {
        // import('../sketch1/script.js').then(m => {
        //     m.draw()
        // })
    }
}


function test() {
    let a = ""

    a === "lol"
}