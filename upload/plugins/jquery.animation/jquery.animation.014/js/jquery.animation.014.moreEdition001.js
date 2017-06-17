// 定义,初始化
var canvas = document.createElement("canvas"), context = canvas.getContext("2d");

// 设置实体
canvas.width = 600;
canvas.height = 600;

// 将可画区添加到body中
document.body.appendChild(canvas);

// 定义,初始化(2)
var c = context, generation = 0, tree;

makeTree();// 制作Tree

// 绑定监听鼠标
// canvas.addEventListener("mousedown", makeTree, false);

// 制作Tree
function makeTree() {

	// 构造树枝
	tree = new BranchObject(0.6, 0, 1);
}

setInterval(loop, 1000 / 30);

// 循环
function loop() {
	c.save();
	c.clearRect(0, 0, 600, 600);
	c.translate(300, 580);
	c.rotate(-Math.PI / 2);
	c.scale(1, 1);

	// 更新生长
	tree.updateGrowth();

	// 更新旋转
	tree.updateRotation();

	// 渲染
	tree.render(c);

	c.restore();
}

// 获取随机范围
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

// 树枝对象
function BranchObject(scale, angle, generation) {
	this.children = [];// 子元素
	this.scale = scale;// 比例
	this.angle = angle;// 角度
	this.generation = generation;// 生成层级(值越少层级越多)
	this.growth = 0;// 总增长量
	this.growthVel = 0;// 单次增量
	this.growDelay = randomRange(0, 1);// 增长延时
	this.growSpeed = randomRange(0.01, 0.05);// 增长速度比率
	this.growSpring = 0.8;// 增长乘子
	this.rotation = 0;// 总旋转度
	this.rotationVel = 0;// 单词旋转量
	this.rotationDelay = this.growDelay;// 旋转延时
	this.rotationSpeed = randomRange(0.02, 0.05);// 旋转速度比率
	this.rotationSpring = 0.9;// 旋转乘子

	// 当生成层级小于10时->继续Push子元素
	if (generation < 5) {
		this.children.push(new BranchObject(randomRange(0.7, 0.99), randomRange(-Math.PI / 7, -Math.PI / 6), generation + 1));
		this.children.push(new BranchObject(randomRange(0.7, 0.99), randomRange(Math.PI / 7, Math.PI / 6), generation + 1));
	}

	// 更新生长
	this.updateGrowth = function() {
		if (this.growDelay > 0) {
			this.growDelay--;
		} else {
			this.growthVel *= this.growSpring;
			this.growthVel += ((1 - this.growth) * this.growSpeed);
			this.growth += this.growthVel;
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].updateGrowth();
			}
		}
	};

	// 更新旋转
	this.updateRotation = function() {
		if (this.rotationDelay > 0) {
			this.rotationDelay--;
		} else {
			this.rotationVel *= this.rotationSpring;
			this.rotationVel += ((1 - this.rotation) * this.rotationSpeed);
			this.rotation += this.rotationVel;
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].updateRotation();
			}
		}
	};

	// 渲染
	this.render = function(c) {
		var isCreateSpecial = false;// 是否创建特殊的东西

		// 当总增长量为0时直接返回
		if (this.growth == 0) {
			return;
		}

		// 设置是否创建特殊的东西
		if (this.generation == 5) {
			isCreateSpecial = true;
		}

		c.save();// 保存
		var growth = this.growth;// 总增长量
		var rotation = this.rotation;// 总旋转度

		var lineWidth = (20 - this.generation) * ((growth * 0.5) + 0.5);// 树枝宽度
		var lineLength = 150 * growth;// 生长高度

		c.strokeStyle = "white";// 树的颜色
		c.lineWidth = 3;// 线条粗细

		c.rotate(angle * rotation);// 旋转

		// 开始路径(画主树枝)
		c.beginPath();
		if (!isCreateSpecial) {
			c.moveTo(0, lineWidth);
			c.lineTo(lineLength, lineWidth * this.scale);
			c.moveTo(lineLength, -lineWidth * this.scale);
			c.lineTo(0, -lineWidth);
		} else {
			c.moveTo(0, lineWidth);
			c.lineTo(lineLength, lineWidth * this.scale);
			c.moveTo(lineLength, -lineWidth * this.scale);
			c.lineTo(0, -lineWidth);
		}
		c.stroke();

		// 开始路径(画树枝节点圆圈)
		c.beginPath();
		if (!isCreateSpecial) {
			c.arc(lineLength, 0, lineWidth * this.scale, 0, Math.PI * 2, true);// 圆圈
		} else {
			c.arc(lineLength, 0, lineWidth * this.scale, 0, Math.PI * 2, true);// 圆圈
		}
		c.stroke();

		// 开始路径(画树枝节点姜巴)
		c.beginPath();
		c.lineWidth = 1;
		c.moveTo(0, lineWidth);
		c.lineTo(0, -lineWidth);
		c.stroke();

		c.translate(lineLength, 0);
		c.scale(scale, scale);

		// 循环画子类
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].render(c);
		}

		c.restore();
	};
}