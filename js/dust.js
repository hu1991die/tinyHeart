/**
 * 定义漂浮物对象
 */
var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];//振幅
	this.dustNO = [];//漂浮物图片序号
	
	this.alpha = 0;//正弦值
}

//漂浮物数量
dustObj.prototype.num = 50;

/**
 * 初始化函数
 */
dustObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = Math.random() * 15 + 25;
		this.dustNO[i] = Math.floor(Math.random() * 7);//归一[0,7)图片序号
	}
}

/**
 * 绘制漂浮物
 */
dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0007;
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		var NO = this.dustNO[i % 7];
		ctx1.drawImage(dustPic[NO], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}
