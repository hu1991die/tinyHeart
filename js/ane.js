//定义海葵对象
var aneObj = function(){
	this.x = [];//海葵间距
	this.h = [];//海葵高度
}

//画50个海葵
aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = i * 16 + Math.random() * 20;//[0,1)
		this.h[i] = 200 + Math.random() * 50;
	}
	
//	console.log('a');
}

//绘制海葵
aneObj.prototype.draw = function(){
	ctx2.save();
	
	//每个海葵都是一样的属性
	ctx2.globalAlpha = 0.5;
	ctx2.lineWidth  = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	
	for (var i = 0; i < this.num; i++) {
		//beginPath, moveto, lineTo,stroke, strokeStyle, lineWidth, lineCap, globalAlaph
		ctx2.beginPath();
		ctx2.moveTo(this.x[i], canHeight);
		ctx2.lineTo(this.x[i], canHeight - this.h[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}
