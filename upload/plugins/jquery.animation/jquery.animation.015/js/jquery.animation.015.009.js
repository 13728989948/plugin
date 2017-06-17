// screen size variables
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight, HALF_WIDTH = window.innerWidth / 2,
    HALF_HEIGHT = window.innerHeight / 2,

// mouse variables
    mouseX = HALF_WIDTH, mouseY = HALF_HEIGHT, mouseDown = false,

// particle variables
    particles = [], spareParticles = [];
MAX_PARTICLES = 200;

function init() {

    // CANVAS SET UP
    container = document.body;

    initMouseListeners();
    setInterval(loop, 1000 / 30);
}

function loop() {

    // make some particles
    if (mouseDown)
        makeParticle(4);
    else
        makeParticle(1);

    // iteratate through each particle
    for (i = 0; i < particles.length; i++) {
        var particle = particles[i];

        // render it
        particle.render();

        // and then update. We always render first so particle
        // appears in the starting point.
        particle.update();

        // Very simple collision detection with the floor

        if (particle.posY > SCREEN_HEIGHT - 100) {
            particle.velY *= -0.98;
            particle.posY = SCREEN_HEIGHT - 100;
        }
    }

    // Keep taking the oldest particles away until we have
    // fewer than the maximum allowed.
    while (particles.length > MAX_PARTICLES) {
        particle = particles.shift();
        container.removeChild(particle.domElement);
        spareParticles.push(particle);
    }
}

function makeParticle(particleCount) {
    var particle;

    for (var i = 0; i < particleCount; i++) {

        // create a new particle in the middle of the stage
        if (spareParticles.length > 0) {
            // if one is already in the spare array, recycle it
            particle = spareParticles.pop();
            particle.posX = HALF_WIDTH;
            particle.posY = HALF_HEIGHT;
        } else {
            // otherwise make a new one
            particle = new DOMParticle(HALF_WIDTH, HALF_HEIGHT, "images/jquery.animation.015_p_002.png", 64, 64);
        }

        container.appendChild(particle.domElement);
        // particle.transform3D = true;

        // give it a random x and y velocity
        particle.velX = randomRange(-15, 15);
        particle.velY = randomRange(-15, 15);
        particle.size = randomRange(0.5, 1);
        particle.gravity = 2;
        particle.drag = 0.98;
        particle.shrink = 0.98;

        // add it to the array
        particles.push(particle);
    }
}

function initMouseListeners() {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
}

function onMouseMove(event) {
    event.preventDefault();
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseDown(event) {
    mouseDown = true;
}

function onMouseUp(event) {
    mouseDown = false;
}