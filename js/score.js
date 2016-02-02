//分值计算

/**
 * 定义分值对象
 */
var scoreObj = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	
	this.gameOver = false;//game over
	this.alpha = 0;
}

/**
 * 绘制吃食的数量
 */
scoreObj.prototype.draw = function(){
	var width = can1.width;
	var height = can1.height;
	
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	ctx1.fillStyle = "white";
	ctx1.fillText("SCORE:" + this.score, width * 0.5, height - 20);
	
	/*ctx1.fillText("num " + this.fruitNum, width * 0.5, height - 50);
	ctx1.fillText("double " + this.double, width * 0.5, height - 80);*/
	
	if(this.gameOver){
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1){
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		ctx1.fillText("GAMEOVER", width * 0.5, height * 0.5);
	}
	ctx1.restore();
}

/**
 * 分值增加
 */
scoreObj.prototype.addScore = function(){
	this.score += this.fruitNum * 1 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}
