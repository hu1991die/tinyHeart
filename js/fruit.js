var fruitObj = function(){
	this.alive = [];//boolean
	this.x = [];
	this.y = [];
	this.h = [];//图片高度
	this.spd = [];//速度
	this.fruitType = [];
	this.aneNO = [];//海葵的编号
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 40;//果实池的果实数量

/**
 * 初始化函数
 */
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0.02)
		this.fruitType[i] = "";
		this.aneNO[i] = 0;
	}
	
	//加载图片
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}

/**
 * 绘制果实
 */
fruitObj.prototype.draw = function(){
	var fruitPic;
	for (var i = 0; i < this.num; i++) {
		//draw fruit
		//find an ane, grow , fly up
		
		if(this.alive[i]){
			
			if(this.fruitType[i] == "blue"){
				fruitPic = this.blue;
			}else{
				fruitPic = this.orange;
			}
			
			if(this.h[i] <= 14){//grow
				//找到果实是长在哪个海葵上面的
				var NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.h[i] += this.spd[i] * deltaTime;
			}else{
				this.y[i] -= this.spd[i] * 3 * deltaTime;
			}
			
			ctx2.drawImage(fruitPic, this.x[i] - this.h[i] * 0.5, this.y[i] - this.h[i] * 0.5, this.h[i], this.h[i]);
			
			if(this.y[i] < 10){
				this.alive[i] = false;
			}
		}
	}
}

/**
 * 果实出生
 * @param {Object} i
 */
fruitObj.prototype.born = function(i){
	//找到一个海葵
	this.aneNO[i] = Math.floor(Math.random() * ane.num);//0-49 取整;
	this.h[i] = 0;
	this.alive[i] = true;
	
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue"//orange, blue
	}else{
		this.fruitType[i] = "orange";
	}
}

/**
 * 果实被吃了
 */
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

/**
 * 果实监听
 */
function fruitMonitor(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			num++;
		}
	}
	
	if(num < 20){
		//send fruit
		sendFruit();
		return;
	}
}

/**
 * 发送一个果实
 */
function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			//born fruit
			fruit.born(i);
			return;
		}
	}
}
