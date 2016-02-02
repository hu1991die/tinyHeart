/**
 * 定义波纹对象
 */
var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];//是否闲置
	this.r = [];//半径
}

//初始化数量
waveObj.prototype.num = 10;

/**
 * 初始化函数
 */
waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

/**
 * 绘制波纹
 */
waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	for (var i = 0; i < this.num; i++) {
		if(this.alive[i]){
			//draw wave
			this.r[i] += deltaTime * 0.03;
			
//			console.log(this.r[i]);

			//判断波纹的生命值
			if(this.r[i] > 50){
				this.alive[i] = false;
				break;
			}
			
			var alpha = 1 - this.r[i] / 50;
			
			//api 
			//绘制路径（非闭合路径）
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2, false);
			ctx1.closePath();
			
			//波纹描边
			ctx1.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

/**
 * 产生波纹
 */
waveObj.prototype.born = function(x, y){
	//born wave
	for (var i = 0; i < this.num; i ++) {
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			
//			console.log("x:" + x + ", y:" + y);

			return;
		}
	}
}
