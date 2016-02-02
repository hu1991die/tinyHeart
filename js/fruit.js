var fruitObj = function(){
	this.alive = [];//boolean
	this.x = [];
	this.y = [];
	this.h = [];//图片高度
	this.spd = [];//速度
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0.02)
		this.fruitType[i] = "";
	}
	
	//加载图片
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}

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
			
			if(this.h[i] <= 14){
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

fruitObj.prototype.born = function(i){
	//找到一个海葵
	var aneId = Math.floor(Math.random() * ane.num);//0-49 取整
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.h[aneId];
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
	
	if(num < 15){
		//send fruit
		sendFruit();
		return;
	}
}

function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			//born fruit
			fruit.born(i);
			return;
		}
	}
}
