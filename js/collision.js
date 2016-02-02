//判断鱼妈妈和果实之间的距离
function momFruitsCollision(){
	//游戏结束
	if(score.gameOver){
		return;	
	}
	
	//碰撞检测
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			// calculate distance between mom and fruits
			var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if(l < 900){
				// fruit eaten
				fruit.dead(i);
				
				//bigBodyCount ++, if gt 7 then eq 7
				mom.bigBodyCount++;
				if(mom.bigBodyCount > 7){
					mom.bigBodyCount = 7;
				}
				
				//eat a fruit,fruitNum++,and if is blue fruit,then fruitNum get double
				score.fruitNum++;
				if(fruit.fruitType[i] == 'blue'){
					//if fruitType is 'blue', then double eq 2
					score.double = 2;
				}
				
				//mom eat a fruit, born a wave
				wave.born(fruit.x[i], fruit.y[i]);
			}
		}
	}
}

//判断鱼妈妈喂食鱼宝宝 mom baby collision
function momBabyCollision(){
	//鱼妈妈吃到了果实，并且游戏未结束，检测碰撞，增加分数
	if(score.fruitNum == 0 || score.gameOver){
		return;
	}
	
	var l = calLength2(mom.x, mom.y, baby.x, baby.y);
	if(l < 900){
		//baby recover
		baby.babyBodyCount = 0;
	
		//mom recover
		mom.bigBodyCount = 0;
		
		//score update
		score.addScore();
		
		//draw halo
		halo.born(baby.x, baby.y);
	}
}
