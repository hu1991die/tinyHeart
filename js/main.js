//body 的内容加载完成之后执行game函数
document.body.onload = game;

var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;//画布宽度
var canHeight;//画布高度

var lastTime;//上一帧执行的时间
var deltaTime;//两帧之间间隔的时间

var bgPic = new Image();//背景图片

var ane;//海葵
var fruit;//果实
var mom;//鱼妈妈
var baby;//鱼宝宝

var mx;
var my;

var babyTails = [];//鱼宝宝尾巴数组
var babyEyes = [];//鱼宝宝眼睛数组
var babyBodies = [];//鱼宝宝身体数组

var momTails = [];//鱼妈妈尾巴数组
var momEyes = [];//鱼妈妈眼睛数组
var momOrangeBodies = [];//鱼妈妈橙色身体数组
var momBlueBodies = [];//鱼妈妈蓝色身体数组

var score;//游戏分值统计

var wave;//波纹

var halo;

var dust;//漂浮物
var dustPic = [];//漂浮物图片

/**
 * 游戏入口
 */
function game(){
//	console.log("onload");
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameLoop();
}

/**
 * 初始化函数
 */
function init(){
	//获取canvas context
	can1 = document.getElementById("canvas1");//front fishes,dust,UI,circle
	ctx1 = can1.getContext("2d");
	
	can2 = document.getElementById("canvas2");//after background,ane,fruits
	ctx2 = can2.getContext("2d");
	
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";//left,center,right
	
	//添加检测鼠标的事件
	can1.addEventListener("mousemove", onMouseMove, false);
	
	//背景图片
	bgPic.src = "img/background.jpg";
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	//海葵初始化
	ane = new aneObj();
	ane.init();
	
	//果实初始化
	fruit = new fruitObj();
	fruit.init();
	
	//鱼妈妈初始化
	mom = new momObj();
	mom.init();
	
	//鱼宝宝初始化
	baby = new babyObj();
	baby.init();
	
	//鼠标移动坐标
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	
	//鱼宝宝尾巴初始化
	for (var i = 0; i < 8; i++) {
		babyTails[i] = new Image();
		babyTails[i].src = "img/babyTail" + i + ".png";
	}
	
	//鱼宝宝眼睛初始化
	for (var i = 0; i < 2; i++) {
		babyEyes[i] = new Image();
		babyEyes[i].src = "img/babyEye" + i + ".png";
	}
	
	//鱼宝宝身体初始化
	for (var i = 0; i < 20; i++) {
		babyBodies[i] = new Image();
		babyBodies[i].src = "img/babyFade" + i + ".png";
	}
	
	//鱼妈妈尾巴初始化
	for (var i = 0; i < 8; i++) {
		momTails[i] = new Image();
		momTails[i].src = "img/bigTail" + i + ".png";
	}
	
	//鱼妈妈眼睛初始化
	for (var i = 0; i < 2; i++) {
		momEyes[i] = new Image();
		momEyes[i].src = "img/bigEye" + i + ".png"; 
	}
	
	//鱼妈妈橙色&蓝色身体初始化
	for (var i = 0; i < 8; i++) {
		momOrangeBodies[i] = new Image();
		momBlueBodies[i] = new Image();
		
		momOrangeBodies[i].src = "img/bigSwim" + i + ".png";
		momBlueBodies[i].src = "img/bigSwimBlue" + i + ".png";
	}
	
	//分值初始化
	score = new scoreObj();
	
	//波纹初始化
	wave = new waveObj();
	wave.init();
	
	//初始化
	halo = new haloObj();
	halo.init();
	
	//漂浮物初始化
	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "img/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();
}

function gameLoop(){
	requestAnimFrame(gameLoop);//setInterval, setTimeout, frame per second
//	console.log("loop");
	
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 50){
		deltaTime = 50;
	}
	
//	console.log(deltaTime);

	//绘制背景图片
	drawBackground();
	
	//绘制海葵
	ane.draw();
	
	fruitMonitor();
	//绘制果实
	fruit.draw();
	
	ctx1.clearRect(0, 0, canWidth, canHeight);
	//绘制鱼妈妈
	mom.draw();
	
	//判断鱼妈妈吃果实
	momFruitsCollision();
	
	//绘制鱼宝宝
	baby.draw();
	
	//判断鱼妈妈喂食鱼宝宝
	momBabyCollision();
	
	//绘制分数
	score.draw();
	
	//绘制波纹
	wave.draw();
	
	//绘制
	halo.draw();
	
	//绘制漂浮物
	dust.draw();
}

/**
 * 鼠标移动事件
 * @param {Object} e
 */
function onMouseMove(e){
	//如果游戏已经结束了，则鼠标不可控制
	if(!score.gameOver){
		if(e.offsetX || e.layerX){
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}
