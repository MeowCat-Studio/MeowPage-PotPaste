////手机上测试用
//var FS = {
//	writeFileSync : function(file,content){
//		FILE[file] = content;
//	},
//	appendFileSync : function(file,content){
//		FILE[file] += content;
//	},
//	readFileSync : function(file){
//		return FILE[file];
//	},
//	existsSync : function(file){
//		if(FILE[file]){
//			return true;
//		}
//		else{
//			return false;
//		}
//	}
//};
//var FILE = {
//	
//};
//var require = function(fsf){
//	if(fsf === "fs"){
//		return FS;
//	}
//};
////---------
///*const { URL } = require('url')
//function getRedirectLink(link) {
//  var url = new URL(link);
//  var redirect = url.searchParams.get("url");
//  return redirect;
//}
//*/
//var fs = require('fs');
//var INF;
var excludeSpecial = function(jsonstr) {  
   //let jsonstr =  "{\"message\":null,\"respData\":null,\"rspHead\":null,\"status\":\"success\"}";
//正则表达式 匹配全部"\" 需要加 /g
let reg = /\\/g;
//使用replace方法将全部匹配正则表达式的转义符替换为空
let replaceAfter = jsonstr.replace(reg,'');

    return replaceAfter;  
 };  
 
function getWY(){  
    var s = "https:\/\/m7.music.126.net\/20200422194633\/522544ec0b33c712c1f4933fa668b416\/ymusic\/5159\/0552\/0109\/f321349aaa2819d5d0716cda3eda6d71.mp3";;  
    //console.log(s);  
  //  document.writeln(excludeSpecial(s));  
    //document.writeln(s); 
	return excludeSpecial(s);
};  
function rand(x,y){
    return Math.ceil((Math.random()*(y-x+1))+x-1);
}

  
  function fullScreen(){

var docElm = document.documentElement;
         // W3C
         if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
         }
         // FireFox
         else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
         }
         // Chrome等
         else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
         }
         // IE11
         else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
         }
  }

function getSong(dataJSON,id){
	var i;
	for(i = 0;i < dataJSON.length;i ++){
		if(dataJSON[i].id === id) break;
	}
	return dataJSON[i];
}

function getQian(dataJSON,saveJSON,a){
	//var a = ;
	var str = '';
	var i;
	for(i = 0;i < saveJSON[a].length;i ++){
		str += getSong(dataJSON,saveJSON[a][i]).name;
		str += '\n';
	}
	return str;
}

var game = new Phaser.Game(960, 576, Phaser.CANVAS, 'game_stage');

/*game.onBlur.add(function(){
	alert("error");
});*/

game.States = {};

var ranSeed = new Date().toDateString();
//var chance = new Chance(ranSeed);
var test ;

game.States.preload = function(){
	this.preload = function(){
	
//    if(fs.existsSync('inf.json')){
//		
//	}
//	else{
//		fs.writeFileSync('inf.json','[]');
//	}
//	INF = JSON.parse(fs.readFileSync('inf.json'));
	var loadText = game.add.text(game.world.centerX, game.world.centerY + 100, '', {
									 fontSize: '30px',
									 fill: 'white'
								 });
	loadText.anchor.setTo(0.5, 0.5);
	loadText.text = '铁岭高中三年十二班午间音乐系统';
	var loadText1 = game.add.text(game.world.centerX, game.world.centerY + 150, '', {
									  fontSize: '30px',
									  fill: 'white'
								  });
	loadText1.anchor.setTo(0.5, 0.5);
	loadText1.text = '程序：Fe';
	var loadText1 = game.add.text(game.world.centerX, game.world.centerY + 200, '', {
									  fontSize: '30px',
									  fill: 'white'
								  });
	loadText1.anchor.setTo(0.5, 0.5);
	loadText1.text = '本软件使用Phaser2开发';
	var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
										 fontSize: '60px',
										 fill: 'white'
									 });
	progressText.anchor.setTo(0.5, 0.5);
	game.load.onFileComplete.add(function(progress) {
								 progressText.text = progress + '%';
								 });
	game.load.json('date', 'http://pvhu.meowcat.org/date.json');							 
    game.load.json('data', 'http://pvhu.meowcat.org/data.json');
	game.load.json('save', 'http://pvhu.meowcat.org/save.json');
	
		/*
		
		*/
	
	game.load.image('space', 'assets/starfield.jpg');
    game.load.image('fire1', 'assets/fire1.png');
    game.load.image('fire2', 'assets/fire2.png');
    game.load.image('fire3', 'assets/fire3.png');
    game.load.image('smoke', 'assets/smoke-puff.png');

    game.load.spritesheet('ball', 'assets/plasmaball.png', 128, 128);

	game.load.image('menu', 'assets/menu.png');
	game.load.image('moon', 'assets/moon.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('star2', 'assets/star2.png');
	//game.load.audio('music_kungfu', 'http://m10.music.126.net/20200105084155/5985b1f02079ec2a396fec190a0f06f4/ymusic/515b/055f/055c/f13c4e04e22542fcf0ae268ea272474b.mp3');
	
	};
	this.create = function(){  
	//getWY();
	
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.forcePortrait = true;
        this.scale.refresh();
		var gui,win;
		if(typeof require !== "undefined"){
		gui = require('nw.gui');
        win = gui.Window.get();
		win.enterFullscreen();	
		}else{fullScreen();}
		
		 var bg = game.add.sprite(0, 0, 'menu');
		var mn = game.add.sprite(307 + 346/2, 115 + 346/2, 'moon');
		var dateJSON = game.cache.getJSON('date');
		var dataJSON = game.cache.getJSON('data');
		var saveJSON = game.cache.getJSON('save');
		//var testJSON = game.cache.getJSON('test');
		this.dataJSON = dataJSON;
		this.dateJSON = dateJSON;
		this.saveJSON = saveJSON;
		//this.testJSON = testJSON;
		
		//document.write(testJSON.data[0].url);
		this.timer = 0;
		mn.anchor.setTo(0.5, 0.5);
		mn.width = 346;
		mn.height = 346;
		this.mn = mn;
        var version = game.add.text(0, 80, '午间音乐', {
            fill: 'white',
            fontSize: '31px'
        });
        version.left = game.width / 2 - version.width / 2;
		var song = game.add.text(0, 0, 'music', {
            fill: 'white',
            fontSize: '31px',
			stroke:'grey',
						strokeThickness:2,
        });
        song.left = game.width / 2 - song.width / 2;
		song.top = game.height / 2 - song.height / 2;
		this.song = song;
		this.stop = false;
		this.reallyStop = false;
		game.input.onTap.add(function(pointer, doubleTap) {
            //game.state.start('level');
			//if(doubleTap){alert('');}
			if(this.stop === false){
			this.stop = true;
			this.timer = 0;
			}
			if(this.reallyStop === true){
				game.state.start('menu', true, false);
			}
        }, this);
		var rn=0;
		var has = false;
		var date=new Date();
		//alert(date.getDate());
		
		if(has === false){
			rn = rand(0,saveJSON.length - 1);
			
			test = rn;
		}
		this.rn = rn;
		
		game.state.start('menu', true, false);
	};
	this.update = function(){
		var song = this.song;
		this.mn.angle += 1;
		this.timer ++;
		if(this.timer === 5 && this.stop === false){
			this.timer = 0;
			song.text = getQian(this.dataJSON,this.saveJSON,rand(0,this.saveJSON.length - 1));
			song.left = game.width / 2 - song.width / 2;
		    song.top = game.height / 2 - song.height / 2;
		}
		if(this.stop === true){
			if(this.timer % 20 === 0 && this.timer < 100){
				song.text = getQian(this.dataJSON,this.saveJSON,rand(0,this.saveJSON.length - 1));
			song.left = game.width / 2 - song.width / 2;
		    song.top = game.height / 2 - song.height / 2;
			}
			if(this.timer === 100){
				this.timer = 101;
				song.text = getQian(this.dataJSON,this.saveJSON,this.rn);
				song.left = game.width / 2 - song.width / 2;
		        song.top = game.height / 2 - song.height / 2;
				this.reallyStop = true;
			}
		}
	};
};

game.States.menu = function() {
	this.preload = function(){
		var loadText = game.add.text(game.world.centerX, game.world.centerY + 100, '', {
									 fontSize: '30px',
									 fill: 'white'
								 });
	loadText.anchor.setTo(0.5, 0.5);
	loadText.text = '铁岭高中三年十二班午间音乐系统';
	var loadText1 = game.add.text(game.world.centerX, game.world.centerY + 150, '', {
									  fontSize: '30px',
									  fill: 'white'
								  });
	loadText1.anchor.setTo(0.5, 0.5);
	loadText1.text = '获取网易云音乐资源中。。。';
	var loadText1 = game.add.text(game.world.centerX, game.world.centerY + 200, '', {
									  fontSize: '30px',
									  fill: 'white'
								  });
	loadText1.anchor.setTo(0.5, 0.5);
	loadText1.text = '本软件使用Phaser2开发';
	var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
										 fontSize: '60px',
										 fill: 'white'
									 });
	progressText.anchor.setTo(0.5, 0.5);
	//let deadLine = false;
	game.load.onFileComplete.add(function (progress) {
          progressText.text = progress + '%';
          if (progress == 100) {
            progressText.text = '加载完毕';
            
          }
		  
        });
		
		var dateJSON = game.cache.getJSON('date');
		var dataJSON = game.cache.getJSON('data');
		var saveJSON = game.cache.getJSON('save');
		//var testJSON = game.cache.getJSON('test');
	var rn=0;
		var has = false;
		var date=new Date();
		//alert(date.getDate());
		try{
		for(rn = 0;rn < dateJSON.length;rn ++){
			if(parseInt( dateJSON[rn].split('-')[0]) === date.getMonth() + 1 && parseInt( dateJSON[rn].split('-')[1]) === date.getDate()){
				has = true;
				break;
			}
		}
		
		for(let g=0;g<saveJSON[rn].length;g++){
			if(dataJSON[saveJSON[rn][g]].wy){
				//alert("");
				game.load.json('test'+g, 'https://api.imjad.cn/cloudmusic/?type=song&id='+dataJSON[saveJSON[rn][g]].wyid);
			}
		}
		}catch(e){
			alert(e.message);
		}
	};
    this.create = function() {
		    //var aa = [1,2,3,4,5,6,7,8,9,10]
   // window.open(getWY());
        var gui,win;
		if(typeof require !== "undefined"){
		gui = require('nw.gui');
        win = gui.Window.get();
		}
		var winwin = true;
        var bg = game.add.sprite(0, 0, 'menu');
		var mn = game.add.sprite(307 + 346/2, 115 + 346/2, 'moon');
		mn.anchor.setTo(0.5, 0.5);
		mn.width = 346;
		mn.height = 346;
		this.mn = mn;
        var version = game.add.text(0, 0, '高考加油！', {
            fill: 'white',
            fontSize: '31px'
        });
        version.left = game.width / 2 - version.width / 2;
        
		var dateJSON = game.cache.getJSON('date');
		
		var dataJSON = game.cache.getJSON('data');
		var saveJSON = game.cache.getJSON('save');
		//function s(a,b){ return Math.random()>0.5 ? 1:-1;}
    //saveJSON.sort(s);
	//for(var jj = 0;jj < saveJSON.length;jj++)
 //  document.write('['+saveJSON[jj]+'],');
		var rn=0;
		var has = false;
		var date=new Date();
		//alert(date.getDate());
		for(rn = 0;rn < dateJSON.length;rn ++){
			if(parseInt( dateJSON[rn].split('-')[0]) === date.getMonth() + 1 && parseInt( dateJSON[rn].split('-')[1]) === date.getDate()){
				has = true;
				break;
			}
		}
		if(has === false){
			//rn = rand(0,saveJSON.length - 1);
			rn = test;
		}
		//alert(date.getMonth());
		//var has = false;
		var g;
		//var textArr = [];
		var to = [];
		
		for(g = 0;g < saveJSON[rn].length;g++){
			to[g] = game.add.text(0, 420 + g*50,dataJSON[saveJSON[rn][g]].name , {
            fill: 'white',
            fontSize: '31px'
        });
		to[g].left = game.width / 2 - to[g].width / 2;
		to[g].b = game.add.button(to[g].left, to[g].top, 'star', function(){
			if(dataJSON[saveJSON[rn][this.g]].url.charAt(0) !== '0'){
				if(dataJSON[saveJSON[rn][this.g]].wy){
					var testJSON = game.cache.getJSON('test'+this.g);
					window.open(excludeSpecial(testJSON.data[0].url));
				}
			    
				else window.open(dataJSON[saveJSON[rn][this.g]].url);
				//window.open(getWY());
				//document.write(excludeSpecial(this.testJSON.data[0].url));
				
				}else{
					to[this.g].fill = 'red';
				}
//				if(has){}else{
//				INF.push(rn);
//		        fs.writeFileSync('inf.json',JSON.stringify(INF));
//		        alert(JSON.parse(fs.readFileSync('inf.json'))[0]);
//				has = true;
//				}
					}, to[g].b);
					to[g].b.width = to[g].width;
					to[g].b.alpha = 0;
					to[g].b.height = to[g].height;
					to[g].b.g = g;
			//alert(dataJSON[saveJSON[rn][g]].name);
		}
		
		//<alert(dataJSON[saveJSON[rn][0]].name);
		//var music_1 = game.add.audio('music_kungfu',0.8,true);
  		//	music_1.play();       
//		var html = game.cache.getText('html');
//	    var harr = html.split('\n');
//		var i,
//		k = 1,
//		j = 0,
//		obj = [];
//		for(i = 0;i < harr.length;i ++){
//			if(harr[i] === ''){
//				k = 2;
//				continue;
//			}
//			if(k % 2 === 0){
//				obj.push({
//					id : j,
//					name : harr[i],
//					url : harr[i + 1]
//				});
//				j ++;
//				k = 1;
//			}
//		}
//		i = 0;
//		for(j = 0;j < 59;j ++){
//			if(i === 5
//			|| i === 7
//			|| i === 10
//			|| i === 17
//			|| i === 22
//			|| i === 23
//			|| i === 25
		
		
		
//			|| i === 26
//			|| i === 29
//			|| i === 31
//			|| i === 33){
//				obj.push([j]);
//				i ++;
//			}
//			else{
//				
//				obj.push([j,j+1]);
//				i ++;
//				j ++;
//			}
//		}
//		document.write(JSON.stringify(obj));
		game.physics.startSystem(Phaser.Physics.ARCADE);

   // game.add.tileSprite(0, 0, game.width, game.height, 'space');

    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);

    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );

    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);
    emitter.setScale(0.8, 0, 0.8, 0, 3000);

    emitter.start(false, 3000, 5);

    sprite = game.add.sprite(0, 300, 'star', 0);
    this.sprite = sprite;
    game.physics.arcade.enable(sprite);

    game.physics.arcade.gravity.y = 150;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;

    sprite.body.setSize(80, 80, 0, 0);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
    sprite.body.velocity.set(300, 200);

    //sprite.inputEnabled = true;


  //  sprite.animations.add('pulse');
    //sprite.play('pulse', 30, true);

    sprite.anchor.set(0.5);
	game.input.onTap.add(function(pointer, doubleTap) {
            //game.state.start('level');
if(typeof require !== "undefined"){
			if(doubleTap){
				if(winwin){win.leaveFullscreen();winwin = false}
			else if(!winwin){win.enterFullscreen();	winwin = true;}
			}
			}
	});
			
    };  
	this.update = function(){
		this.mn.angle += 1;
		this.sprite.angle += 6;
		var px = sprite.body.velocity.x;
    var py = sprite.body.velocity.y;

    px *= -1;
    py *= -1;

    emitter.minParticleSpeed.set(px, py);
    emitter.maxParticleSpeed.set(px, py);

    emitter.emitX = sprite.x;
    emitter.emitY = sprite.y;

    // emitter.forEachExists(game.world.wrap, game.world);
    game.world.wrap(sprite, 64);
		//this.start.text = game.cache.checkSoundKey('music_kungfu');
	};
};

game.state.add('preload', game.States.preload);

game.state.start('preload');
game.state.add('menu', game.States.menu);
