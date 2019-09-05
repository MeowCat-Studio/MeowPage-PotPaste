var game = new Phaser.Game(960, 576, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
//var camera = new Camera(game, 0, game.world.width/2, game.world.height/2, game.world.width, game.world.height);
var gourney = {
	start : false,
	logo : {}
};

var luo = [];

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}


function preload() {
    //alert('preload');
	game.load.image('load', 'assets/load.png');
	game.load.image('tips', 'assets/text.png');
	game.load.image('logo', 'assets/logo.png');  
	game.load.image('luo', 'assets/luo.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('sea', 'assets/sea.png');  
	game.load.spritesheet('shark', 'assets/shark.png', 135, 101);  
	var preloadSprite = game.add.sprite(0, 0, 'load');
    game.load.setPreloadSprite(preloadSprite);
}
 
function create() {
    //alert('create');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sea');
	gourney.text = game.add.sprite(game.world.width/2 - 279/2, 400, 'tips');
	platforms = game.add.group();
    platforms.enableBody = true;
	gourney.ground = platforms.create(0, game.world.height - 76, 'ground');
	gourney.ground.scale.setTo(2, 2);
    gourney.ground.body.immovable = true;
	player = game.add.sprite(game.world.centerX - 84/2, game.world.centerY - 101/2, 'shark');
    game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
	//game.camera.follow(player);
	gourney.logo = game.add.sprite(game.world.width/2 - 300, 0, 'logo');
	game.input.onTap.add(function(pointer, doubleTap){
		if(!gourney.start){
			start();
			return;
		}
		player.body.velocity.y -= 120;
	},this);
	
	game.time.events.loop(2400,function(){
		if(!gourney.start){
			return;
		}
		var i;
		var l;
		var m = randomNum(0, 3);
		for(i = 0;i <= m;i ++){
		l = platforms.create(game.world.width, game.world.height -82*(i + 1) - 76, 'luo');
	    l.scale.setTo(1, 1);
        l.body.immovable = true;
		luo.push(l);
		}
		for(i = 0;i <= 3 - m;i ++){
		l1 = platforms.create(game.world.width, 82*(i - 1), 'luo');
	    l1.scale.setTo(1, 1);
        l1.body.immovable = true;
		luo.push(l1);
		}
	},this);
}
 
function update() {
	var i;
    //alert('update');
	if(!gourney.start){
		return;
	}
	platforms.setAll('body.velocity.x', -150);
	for(i = 0; i < luo.length; i++){
		if(luo[i].body.x < -100){
			luo[i].kill();
		}
	}
	//player.body.x = (game.world.width - 135)/2;
	//player.body.x -= 1;
	//game.physics.arcade.collide(this.bird,this.ground, this.hitGround, null, this); //检测与地面的碰撞
    //game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this); //检测与管道的碰撞
	game.physics.arcade.collide(player, platforms, function(){
		init();
	});
	if(gourney.ground.body.x <= -game.width){
		gourney.ground.reset(0, game.world.height - 76);
	}
}

function init(){
	gourney.text = game.add.sprite(game.world.width/2 - 279/2, 400, 'tips');
	gourney.logo = game.add.sprite(game.world.width/2 - 300, 0, 'logo');
	gourney.start = false;
    player.body.gravity.y = 0;
	platforms.setAll('body.velocity.x', 0);
	player.body.velocity.y -= 0;
	gourney.ground.reset(0, game.world.height - 76);
	player.reset(game.world.centerX - 84/2, game.world.centerY - 101/2, 'shark');
	for(i = 0; i < luo.length; i++){
		//if(luo[i].body.x < -100){
			luo[i].kill();
		//}
	}
}

function start(){
	gourney.logo.kill();
	gourney.start = true;
	player.body.gravity.y = 200;
	gourney.text.kill();
}
/*
function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
*/
 
