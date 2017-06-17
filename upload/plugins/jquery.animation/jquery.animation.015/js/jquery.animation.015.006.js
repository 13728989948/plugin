// screen size variables
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight, HALF_WIDTH = window.innerWidth / 2,
    HALF_HEIGHT = window.innerHeight / 2,

// mouse variables
    mouseX = HALF_WIDTH, mouseY = HALF_HEIGHT, mouseDown = false,

    canvas = document.createElement('canvas'), context = canvas.getContext('2d'),

// particle variables
    particles = [], MAX_PARTICLES = 100, particleImage = new Image();
particleImage.src = 'images/jquery.animation.015_p_002.png';

function init() {

    // CANVAS SET UP
    document.body.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    initMouseListeners();

    setInterval(loop, 1000 / 30);
}

function loop() {

    // make a particle
    makeParticle(1);

    // clear the canvas
    context.fillStyle = "rgb(0,0,0)";
    // context.fillStyle="rgba(0,0,0,0.2)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // iteratate through each particle
    for (i = 0; i < particles.length; i++) {
        var particle = particles[i];

        // render it
        particle.render(context);

        // and then update. We always render first so particle
        // appears in the starting point.
        particle.update();
    }

    // Keep taking the oldest particles away until we have
    // fewer than the maximum allowed.

    while (particles.length > MAX_PARTICLES)
        particles.shift();
}

function makeParticle(particleCount) {

    for (var i = 0; i < particleCount; i++) {

        // create a new particle in the middle of the stage
        var particle = new ImageParticle(particleImage, HALF_WIDTH, HALF_HEIGHT);
        // var particle = new ImageParticle(particleImage, mouseX, mouseY);

        // give it a random x and y velocity
        particle.velX = randomRange(-6, 6);
        particle.velY = randomRange(-6, 6);
        particle.size = randomRange(1, 5);
        particle.gravity = 0;
        particle.drag = 0.98;
        particle.shrink = 0.97;

        // sets the blend mode so particles are drawn with an additive blend
        // particle.compositeOperation = 'lighter';

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