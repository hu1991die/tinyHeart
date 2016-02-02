/**
 * 定义鱼妈妈对象
 */
var momObj = function(){
	this.x;
	this.y;
	this.angle;//角度
	
	/*this.bigBody = new Image();
	this.bigEye = new Image();
	this.bigTail = new Image();*/
	
	this.bigTailTimer = 0;
	this.bigTailCount = 0;
	
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 600;
	
	this.bigBodyCount = 0;
}

/**
 * 初始化
 */
momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	
	/*this.bigBody.src = "img/bigSwim0.png";
	this.bigEye.src = "img/bigEye0.png";
	this.bigTail.src = "img/bigTail0.png";*/
}

/**
 * 绘制鱼妈妈
 */
momObj.prototype.draw = function(){
	
	//lerp x, y
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	
//	console.log("this.x:" + this.x + ", this.y:" + this.y);

	//detal angle
	//Math.atan2(y, x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI
	
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//mom tail count
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer >= 50){
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}
	
	//mom eye count
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;
		
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random() * 1800  + 2000;//[1800, 3800);
		}else{
			this.bigEyeInterval = 230;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	/*ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
	ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);
	ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);*/
	
	var bigTailCount = this.bigTailCount;
	var bigBodyCount = this.bigBodyCount;
	var bigEyeCount = this.bigEyeCount;
	
	ctx1.drawImage(momTails[bigTailCount], -momTails[bigTailCount].width * 0.5 + 30, -momTails[bigTailCount].height * 0.5);
	if(score.double == 1){
		//if double eq 1 then draw orange
		ctx1.drawImage(momOrangeBodies[bigBodyCount], -momOrangeBodies[bigBodyCount].width * 0.5, -momOrangeBodies[bigBodyCount].height * 0.5);
	}else{
		//else if double eq 2 then draw blue
		ctx1.drawImage(momBlueBodies[bigBodyCount], -momBlueBodies[bigBodyCount].width * 0.5, -momBlueBodies[bigBodyCount].height * 0.5);
	}
	ctx1.drawImage(momEyes[bigEyeCount], -momEyes[bigEyeCount].width * 0.5, -momEyes[bigEyeCount].height * 0.5);
	ctx1.restore();
}
