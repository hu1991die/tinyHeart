//定义海葵对象
var aneObj = function(){
	//start point, control point, end point(sin)
	this.rootx = [];//海葵间距（开始点）
	this.headx = [];
	this.heady = [];
	this.amp = [];//振幅值
	this.alpha = 0;//正弦值
}

//画50个海葵
aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;//[0,820)
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 20 + 30;
	}
	
//	console.log('a');
}

/**
 * 绘制海葵
 */
aneObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0007;
	var l = Math.sin(this.alpha);//[-1,1]
	
	ctx2.save();
	
	//每个海葵都是一样的属性
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth  = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	
	for (var i = 0; i < this.num; i++) {
		//beginPath, moveto, lineTo,stroke, strokeStyle, lineWidth, lineCap, globalAlaph
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}
