var Ring = function (radius, numOfItems) {
    for (var i = numOfItems - 1; i >= 0; i--) {
        var angle = i * Math.PI * 2 / numOfItems;

        var x = Math.sin(angle) * radius;
        var y = Math.cos(angle) * radius;
        var z = 0;

        this.pointsArray.push(this.make3DPoint(x, y, z));
    }
};

Ring.prototype = new DisplayObject3D();

$(document).ready(function () {
    var camera = new Camera3D();
    camera.init(0, 0, 0, 300);
    var container = $("#item");
    var item = new Object3D(container);
    item.addChild(new Ring(200, $("#item ul li").length));
    var scene = new Scene3D();
    scene.addToScene(item);
    var mouseX, mouseY = 0;
    var offsetX = $("#item").offset().left;
    var offsetY = $("#item").offset().top;
    var speed = 6000;

    $(document).mousemove(function (e) {
        mouseX = e.clientX - offsetX - (container.width() / 2);
        mouseY = e.clientY - offsetY - (container.height() / 2);
    });
    axisRotation.x = 1.5;
    var animateIt = function () {
        if (mouseX != undefined) {
            axisRotation.y += (mouseX) / speed;
        }
        scene.renderCamera(camera);
    };
    setInterval(animateIt, 20);
});