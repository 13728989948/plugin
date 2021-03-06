// screen size variables
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight, HALF_WIDTH = window.innerWidth / 2,
    HALF_HEIGHT = window.innerHeight / 2,

// canvas element and 2D context
    canvas = document.createElement('canvas'), context = canvas.getContext('2d'),

// notional field of view for 3D projection
    fov = 150,

// to convert from degrees to radians,
// multiply by this number!
    TO_RADIANS = Math.PI / 180,

// array to store multiple points
    points = [],
// the amount to rotate every frame.
    rotateAmount = 0;

init();

// call the loop function every 1000/30 mils, in
// other words, 30 times a second.
setInterval(loop, 1000 / 30);

function init() {

    // CANVAS SET UP
    container = document.createElement('div');
    document.body.appendChild(container);

    container.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    // move origin into the centre of the screen
    context.translate(HALF_WIDTH, HALF_HEIGHT);

    // create 500 3D points
    for (var i = 0; i < 500; i++) {
        points.push(new Point3D(randomRange(-100, 100), randomRange(-100, 100), randomRange(-100, 100)));
    }

    // set up a mouse listener that sets the rotate amount on a mouseDown.
    // in other words, the points start rotating when you click!
    document.addEventListener('mousedown', function () {
        rotateAmount = 2;
    }, false);
}

function loop() {

    // points = points.sort(function(a,b){return (b.z - a.z);});

    // clear the canvas
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(-HALF_WIDTH, -HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);

    // iteratate through each point
    for (i = 0; i < points.length; i++) {
        var point = points[i];

        // rotate it
        point.rotateY(rotateAmount);

        // render it
        draw3Din2D(point, context);
    }
}

// The 3D Point object.
// now with added method to rotate around the Y axis.
function Point3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    // rotates the point around the origin by the specified
    // number of degrees. Uses the trig that you've probably
    // forgotten from school to adjust only the x and z
    // co-ordinates, hence, rotating around the Y axis.

    this.rotateY = function (angle) {

        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempz = this.z;
        var tempx = this.x;

        this.x = (tempx * cosRY) + (tempz * sinRY);
        this.z = (tempx * -sinRY) + (tempz * cosRY);
    };
}

// draws a 3D point in a 2D canvas. Assumes
// origin of the canvas is set to the middle
// using the translate method.
function draw3Din2D(p3d, c) {

    // first, work out how small it should be
    // using the z pos ( how far away it is :) )
    var scale = fov / (fov + p3d.z);

    // then multiply the 3D x and y by this scale
    // to get the 2D x and y.

    var x2d = (p3d.x * scale);
    var y2d = (p3d.y * scale);

    // and then draw a 2px wide and 2px long line at this point.
    c.lineWidth = 2;
    c.fillStyle = "rgb(255,255,255)";
    // c.strokeStyle = "rgb(255,255,255)";
    c.beginPath();
    c.arc(x2d, y2d, 1, 0, Math.PI * 2, true);
    c.fill();
    // c.stroke();
}

// returns a random number between the two limits provided
function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}