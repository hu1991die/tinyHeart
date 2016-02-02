/**
 * 定义鱼宝宝对象
 */
var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	
	/*this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();*/
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;//时间间隔
	
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

/**
 * 初始化函数
 */
babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	
	/*this.babyEye.src = "img/babyEye0.png";
	this.babyBody.src = "img/babyFade0.png";
	this.babyTail.src = "img/babyTail0.png";*/
}

/**
 * 绘制鱼宝宝
 */
babyObj.prototype.draw = function(){
	//lerp x, y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	
	//dela angle Math.atan2(y, x)
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer >= 50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	//baby eye count 
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		//睁着眼睛的持续时间
		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
		}else{
			this.babyEyeInterval = 200;
		}
	}
	
	//baby body count
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 500){
		this.babyBodyCount = this.babyBodyCount + 1;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			
			//game over
			score.gameOver = true;			
		}
		
		//babyBodyTimer reset
		this.babyBodyTimer %= 500;
	}
	
	//ctx1
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	/*ctx1.drawImage(this.babyTail, -this.babyTail.width * 0.5 + 25, -this.babyTail.height * 0.5);
	ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
	ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5);*/

	var babyTailCount = this.babyTailCount;
	var babyBodyCount = this.babyBodyCount;
	var babyEyeCount = this.babyEyeCount;
	
	ctx1.drawImage(babyTails[babyTailCount], -babyTails[babyTailCount].width * 0.5 + 25, -babyTails[babyTailCount].height * 0.5);
	ctx1.drawImage(babyBodies[babyBodyCount], -babyBodies[babyBodyCount].width * 0.5, -babyBodies[babyBodyCount].height * 0.5);
	ctx1.drawImage(babyEyes[babyEyeCount], -babyEyes[babyEyeCount].width * 0.5, -babyEyes[babyEyeCount].height * 0.5);
	ctx1.restore();
	
//	console.log("this.x=" + this.x + ", this.y=" + this.y);
}
