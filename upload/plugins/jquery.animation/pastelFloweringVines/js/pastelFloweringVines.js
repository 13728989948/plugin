var isDebug = false;// 是否为调试
var isDebug002 = false;// 是否为调试(蔓藤枝干生长坐标)

var running = false;// 是否正在运行

var petals = 5,// 花瓣数
    maxAge = 10000,// 单条蔓藤最大生长时间(毫秒)
    pzFlower = 0.5,// 值越大->花越多
    maxVines = 15,// 最大蔓藤数
    bloomTime = 3000,// 开花持续时间(毫秒)
    growthRate = 0.1,// 蔓藤生长率
    maxSeconds = 60,// 最大运行时间(秒)
    twistFactor = 14,// 值越小->枝,花,弯曲越多
    branchFactor = 5;// 值越小->枝越多

var myCanvas = document.getElementById("myCanvas");
var myCavContext = myCanvas.getContext("2d");

// 告诉浏览器所有Math函数视为全局
Object.getOwnPropertyNames(Math).map(function (p) {
    window[p] = Math[p];
});

// 告诉IE怎样执行Math
window["hypot"] = Math.hypot || function (a, b) {
        return sqrt(a * a + b * b);
    }
window["sign"] = Math.sign || function (a) {
        return (a > 0) ? 1 : -1;
    }

// 设置大小
setSize();

// 设置大小
function setSize() {
    var style = getComputedStyle(myCanvas);// 获取元素中所有可用的css属性列表
    myCanvas.width = parseFloat(style.width);
    myCanvas.height = parseFloat(style.height);
}

// 添加监听(Window)
window.addEventListener("resize", function () {
    setSize();// 设置大小
    if (!running) {
        requestAnimationFrame(paint);
    }
});

// 蔓藤数组
var vines = [newVine()];

// 新建蔓藤
function newVine(e) {
    if (isDebug) {
        console.info("新建蔓藤");
    }

    var x, y;
    if (e) {
        x = e.x || e.clientX;
        y = e.y || e.clientY;
    } else {
        x = random() * myCanvas.width;
        y = random() * myCanvas.height;
    }
    return {
        color: {
            h: random(),
            s: random(),
            l: random()
        },
        root: {
            x: x,
            y: y
        },
        stem: [{
            x: x + random() - 0.5,
            y: y + random() - 0.5
        }],
        flowers: [],
        age: 0
    }
}

var timestampOld,// 时间戳(旧的)
    ellapsed,// 时间差
    shadow = true;// 是否给上下文添加阴影

// 绘制
function paint(timestamp) {
    if (isDebug) {
        console.info("绘制,当前时间戳:" + timestamp);
    }

    myCavContext.fillStyle = "#222";
    myCavContext.fillRect(0, 0, myCanvas.width, myCanvas.height);
    myCavContext.lineCap = "round";

    // 添加阴影
    ellapsed = timestampOld ? (timestamp - timestampOld) : 30;
    if (shadow && ((timestamp < 500) || (ellapsed < 80))) {
        myCavContext.shadowBlur = 1;
        myCavContext.shadowOffsetY = 1;
        myCavContext.shadowOffsetX = 0.5;
    } else if (shadow) {
        shadow = false;
        myCavContext.shadowBlur = myCavContext.shadowOffsetY = myCavContext.shadowOffsetX = 0;
    }

    // 若在运行中->蔓藤生长
    if (running) {
        vines.forEach(growVine);
    }

    // 循环绘制蔓藤
    vines.forEach(paintVine);

    // 设置运行状态
    running = running && (timestamp < maxSeconds * 1000);

    if (running) {
        if (isDebug) {
            console.info("第几条蔓藤", vines.length, "蔓藤年龄", vines[vines.length - 1].age);
        }

        timestampOld = timestamp;

        // 绘制
        requestAnimationFrame(paint);
    }
}

// 蔓藤生长
function growVine(singleVine) {
    if (isDebug) {
        console.info("蔓藤生长");
    }

    // 年龄判断
    if (singleVine.age > maxAge) {
        return;
    }

    singleVine.age += ellapsed;

    var length = singleVine.stem.length,
        tip = singleVine.stem[length - 1],
        prev = singleVine.stem[length - 2] || singleVine.root,
        dx = tip.x - prev.x,
        dy = tip.y - prev.y,
        pfg = hypot(dx, dy);// 平方根

    if (isDebug002) {
        singleVine.stem.forEach(function (o) {
            console.info(round(o.x) + "," + round(o.y));
        })
    }

    if (random() < (1 / twistFactor)) {
        // console.info("tip:" + tip, "prev:" + prev, "dx:" + dx, "dy:" + dy, "pfg:" + pfg);

        var qx = 0.5 - (tip.x) / myCanvas.width,
            qy = 0.5 - (tip.y) / myCanvas.height;

        singleVine.stem.push({
            x: tip.x + (dx / pfg) + ((length % 2) ?
                2 * random() * (abs(qx) > 0.4 ? sign(qx) : sign(random() - 0.5)) : 0),
            y: tip.y + (dy / pfg) + ((length % 2) ?
                random() * (abs(qy) > 0.4 ? sign(qy) : sign(random() - 0.5)) : 0)
        });

        var r = random();
        if (!(length % 2)) {
            if (r < (1 / (vines.length * vines.length + branchFactor))) {
                vines.push(newVine(tip));
            } else if (r < pzFlower) {
                singleVine.flowers.push({
                    point: tip,
                    angle: PI + atan2(dx, dy),
                    color: {
                        h: random(),
                        s: random(),
                        l: random()
                    },
                    age: 0
                });
            }
        }
    } else {
        var d = growthRate * ellapsed * (0.5 + random());
        tip.x += d * dx / pfg;
        tip.y += d * dy / pfg;
    }

    // 限制蔓藤最大生长时间
    if ((singleVine.age >= maxAge)) {
        if (vines.length < maxVines) {
            vines.push(newVine(length % 2 ? prev : tip));
        }
        else {
            running = false;
        }
    }
}

// 绘制蔓藤
function paintVine(v) {

    if (isDebug) {
        console.info("绘制蔓藤");
    }

    myCavContext.strokeStyle = "hsl(" + [100 + v.color.h * 50, (60 + (v.color.s * 40) - (10 * v.age / maxAge)) + "%", (40 + (v.color.l * 20) - (30 * v.age / maxAge)) + "%"] + ")";
    myCavContext.lineWidth = 1 + 8 * (v.age / maxAge);
    myCavContext.shadowColor = "hsl(" + [120 + v.color.h * 50, (40 + (v.color.s * 40)) + "%", (10 + (v.color.l * 20)) + "%"] + ")";

    // console.info(myCavContext.strokeStyle, myCavContext.lineWidth);

    myCavContext.beginPath();
    myCavContext.moveTo(v.root.x, v.root.y);
    var i, n;
    for (i = 0, n = v.stem.length - 1; i < n; i = i + 2) {
        myCavContext.quadraticCurveTo(v.stem[i].x, v.stem[i].y, v.stem[i + 1].x, v.stem[i + 1].y);
    }
    if (i == n) {
        myCavContext.lineTo(v.stem[i].x, v.stem[i].y);
    }
    myCavContext.stroke();

    v.flowers.forEach(paintFlower);

    // 绘制花朵
    function paintFlower(f) {
        myCavContext.fillStyle = "hsl(" + [-120 + (v.color.h + f.color.h) * 0.5 * 180, (60 + (v.color.s + f.color.s) * 0.5 * 25 + 10 * (v.age / maxAge)) + "%", (50 + (v.color.l + f.color.l) * 0.5 * 40 + 10 * (v.age / maxAge)) + "%"] + ")";
        myCavContext[shadow ? "shadowColor" : "strokeStyle"] = "hsl(" + [-110 + (f.color.h) * 160, (60 + (f.color.s) * 25) + "%", (30 + (f.color.l) * 30) + "%"] + ")";
        myCavContext.save();
        myCavContext.translate(f.point.x, f.point.y);
        myCavContext.rotate(f.angle);
        myCavContext.moveTo(2, 0);
        var maturity = f.age / bloomTime, sigma = ((maturity < 0.505) ? 0.05 : (maturity - 0.5)) * 4 * PI / petals;
        for (var j = 0; j < petals; j++) {
            myCavContext.save();
            myCavContext.rotate(j * sigma);
            myCavContext.beginPath();
            myCavContext.bezierCurveTo(
                maturity * (-5), 1 + maturity * (4),
                maturity * (-2), 3 + maturity * (9),
                0, 3 + maturity * (9)
            );
            myCavContext.bezierCurveTo(
                maturity * (2), 3 + maturity * (9),
                maturity * (5), 1 + maturity * 4,
                0, 0
            );
            myCavContext.closePath();
            myCavContext.fill();
            if (!shadow) {
                myCavContext.lineWidth = 0.5;
                myCavContext.stroke();
            }
            myCavContext.restore();
        }
        myCavContext.restore();
        if (running && (f.age < bloomTime)) {
            f.age += ellapsed;
        }
    }
}

running = true;
requestAnimationFrame(paint);// 高性能的帧动画