var ground, monkeyHand, reset,
    monkey, monkeyAutomatedCollider, gameState,
    monkeyAutomatedColliderMonkeyXAddNumber,
    waitageTime, score, time, PLAY, END, stones, bananas,
    singlePlayerButton, automatedPlayingButton, forest,
    timesCanStoneTouch, bananaSpawnTime, stoneSpawnTime;

var groundImage, monkeyHandImage, resetImage, monkeyImage, singlePlayerButtonImage, automatedPlayerButtonImage, bananaImage, stoneImage, monkeyJumpingImage, forestImage;

function preload() {
    groundImage = loadImage("ground.png");
    monkeyHandImage = loadImage("monkey_jump_hand.png");
    resetImage = loadImage("reset.png");
    monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    singlePlayerButtonImage = loadImage("single_player.png");
    automatedPlayerButtonImage = loadImage("automated_gaming_mode.png");
    bananaImage = loadImage("banana.png");
    stoneImage = loadImage("stone.png");
    monkeyJumpingImage = loadImage("monkey-jumping_image.png");
    forestImage = loadImage("jungle.jpg");
}

function setup() {
    createCanvas(400, 400);
    doSetup();
}

function draw() {
    doDrawWork();
}

function doDrawWork() {
    fill("red");
    textStyle(BOLD);
    background("lightgreen");
    logConsoles();
    drawSprites();
    controlGameWithGameStates();
}

function logConsoles() {
    // console.log("Monkey: " + monkey);
    console.log("Monky X: " + monkey.x);
    console.log("Monkey Y: " + monkey.x);
    // console.log("Monkey.y - " + monkey.y);
    // console.log("-------------Stones' Length---------------" + stones.length);
    if (stones.length > 0) {
        // console.log("-------------Stones' X---------------" + stones.get(0).x);
        stones.setScaleEach((monkey.scale / 3) * 4);
        if (stones.get(0).x < -30) {
            stones.destroyEach();
        }
    }
    if (bananas.length > 0) {
        // console.log("-------------Bananas' X---------------" + bananas.get(0).x);
        bananas.setScaleEach((monkey.scale / 3) * 2);
        if (bananas.get(0).x < -30) {
            bananas.destroyEach();
        }
    }

}

function controlGameWithGameStates() {
    //console.log("Game state -- "+gameState);
    if (gameState === "notStarted") {
        waitageTime += 1;
        ground.velocityX = 0;
        textSize(20);
        text('Press these buttons to start playing, control the monkey with'
            + ' the arrow keys and spacebar if you are not in '
            + 'automated gaimng mode.'
            + ' Else, if you are, enjoy watching!', 5, 290, 395);
        textSize(18);
        text("Play with", 60, 195, 180, 235);
        text("Controlling", 60, 220, 180, 235);
        textSize(14);
        text("Enter Automated ", 232.5, 205);
        text("Gaming mode", 232.5, 230);
        monkey.visible = false;
        monkey.scale = 0.075;
        timesCanStoneTouch = 2;
        monkeyHand.visible = false;
        singlePlayerButton.visible = true;
        automatedPlayingButton.visible = true;
        reset.visible = false;
        score = 0;
        time = 0;
        if (mousePressedOver(singlePlayerButton)) {
            gameState = PLAY[0];
        }

        if (mousePressedOver(automatedPlayingButton)) {
            gameState = PLAY[1];
        }
    }
    if (gameState != "notStarted") {
        textSize(23);
        text("Survival Time: " + time, 100, 50);
        text("Score: " + score, 100, 120);
        text("Times you can touch the stones: " + timesCanStoneTouch, 10, 85);
        // text("MouseX: " + mouseX, 250, 170);
        // text("MouseY:  " + mouseY, 250, 230);
        // text("Banana: " + bananaSpawnTime, 50, 170);
        // text("Stone: " + stoneSpawnTime, 50, 230);
    }
    if (gameState === PLAY[0]) {
        time += Math.round((World.frameRate / 30));
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        forest.setVelocity(-1 * ((1 + time / 70)), 0);

        if (keyDown("space") || keyDown("up")) {
            if (monkey.y > 312) {
                monkey.velocityY = -14;
            }
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
        }


        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
                monkey.scale = 0.075;
            }
        }

        if (monkey.y < 312) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }


        if (keyWentDown("space") || keyWentDown("up")) {
            monkeyHand.pointTo(190, 390);
        }


        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 0.1) {
                    monkey.scale *= 1.05;
                }
            }
        }
    }
    if (gameState === PLAY[1]) {
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;
        forest.setVelocity(-1 * ((3 + 2 * time / 50)), 0);

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        time += Math.round((World.frameRate / 30));

        if (monkey.y < 312) {
            monkey.changeAnimation("monkey", monkeyImage);
        }


        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
                monkey.scale = 0.075;
            }
        }


        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 0.1) {
                    monkey.scale *= 1.05;
                }
            }
        }


        if (stones.length > 0 && monkeyAutomatedCollider.isTouching(stones) && monkey.y > 312) {
            monkey.velocityY = -14;
        }


        if (bananas.length > 0 && monkeyAutomatedCollider.isTouching(bananas) && monkey.y > 312) {
            monkey.velocityY = -14;
        }


        if (monkey.y < 312/* || forest.velocityX === 0*/) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }
    }
    if (gameState === END) {
        monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
        monkey.rotation = -120;
        monkey.x = 100;
        monkey.y = 300;
        // monkey.y += 0.4;
        monkeyHand.x = monkey.x;
        monkeyHand.visible = true;
        monkeyHand.rotationSpeed = 0;
        forest.velocityX = 0;
        bananas.destroyEach();
        stones.destroyEach();
        stones.setVelocityXEach(-14);
        bananas.setVelocityXEach(-8);
        text("Game Over! Don't you want to play again?" +
            "                                  :D", 15, 195, 385);
        reset.visible = true;
        reset.addImage("reset", resetImage);

        if (mousePressedOver(reset)) {
            gameState = "notStarted";
            timesCanStoneTouch = 2;
            monkey.rotation = 0;
        }
    }
}

function setPropertiesOfObjects() {
    monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
    monkey.collide(ground);
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkeyAutomatedCollider.x = monkey.x
        + monkeyAutomatedColliderMonkeyXAddNumber;
    monkeyAutomatedCollider.y = monkey.y;

    if (forest.velocityX <= 0 && forest.velocityX > -23) {
        forest.velocityX = -1 * ((3 + 2 * time / 50));
    }

    stones.collide(ground);
    bananas.collide(ground);

    monkey.velocityY += 0.8;

    if (forest.x < - 100) {
        forest.x = 300;
    }


    var velocityX = (forest.velocityX * 5) / 8;

    if (stones.length > 0) {
        stones.get(0).velocityX = velocityX;
    }

    if (bananas.length > 0) {
        bananas.get(0).velocityX = velocityX;
    }

    monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
    monkey.collide(ground);
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkeyAutomatedCollider.x = monkey.x
        + monkeyAutomatedColliderMonkeyXAddNumber;
    monkeyAutomatedCollider.y = monkey.y;

    if (timesCanStoneTouch <= 0) {
        gameState = END;
    }

    stones.collide(ground);
    bananas.collide(ground);

    if (forest.x < -15) {
        forest.x = 400;
    }

    monkeyHand.scale = monkey.scale;

}

function doSetup() {
    ground = createSprite(200, 200, 800, 50);
    ground.y = (400 - (ground.height / 2));
    ground.visible = false;

    timesCanStoneTouch = 2;

    forestImage.width = 800;
    forestImage.scale = 0.5;

    forest = createSprite(200, 200);
    forest.addImage("forest", forestImage);
    forest.width = 800;
    forest.height = 400;
    forest.depth = -100;

    monkeyHand = createSprite();
    monkeyHand.addImage("monkey_hand", monkeyHandImage);
    monkeyHand.scale = 0.1;
    monkeyHand.rotation = 180;

    stoneSpawnTime = 240;
    bananaSpawnTime = 200;

    reset = createSprite(200, 275);
    reset.visible = false;

    monkey = createSprite(100, 180);
    monkey.scale = 0.075;
    monkey.addAnimation("monkey", monkeyImage);
    monkey.addImage("monkey-jumping", monkeyJumpingImage);

    monkeyAutomatedCollider = createSprite(0, 0, 65, 305);
    monkeyAutomatedCollider.visible = false;

    score = 0;
    time = 0;
    PLAY = ["Solo", "Automated"];
    END = 0;
    gameState = "notStarted";

    stones = createGroup();
    bananas = createGroup();

    singlePlayerButton = createSprite(110, 220);
    singlePlayerButton.addImage("single_player", singlePlayerButtonImage);
    singlePlayerButton.scale = 2;

    automatedPlayingButton = createSprite(290, 220);
    automatedPlayingButton.addImage("automated_gaming_mode", automatedPlayerButtonImage);
    automatedPlayingButton.scale = 2;
}
function spawnBananas() {
    // if (World.frameCount % 110 === 0) {
    if (World.frameCount % bananaSpawnTime === 0) {
        // bananas.destroyEach();
        // bananas.clear();
        var bananaY = random(190, 290);
        var banana = createSprite(450, bananaY);
        banana.addImage("banana", bananaImage);
        banana.scale = 0.05;
        bananas.add(banana);
        banana.velocityY += 0.5;
        monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
        if (bananaSpawnTime > 120) { bananaSpawnTime -= 10; }
    }
}
function spawnStones() {
    // if (World.frameCount % 180 === 0) {
    if (World.frameCount % stoneSpawnTime === 0) {
        // stones.destroyEach();
        // stones.clear();
        var stone = createSprite(500, 200);
        stone.addImage("stone", stoneImage);
        stone.scale = 0.1;
        stone.setCollider("circle", 0, 0, 105);
        stone.rotationSpeed = forest.velocityX * 5 / 3;
        stone.velocityY += 10;
        stones.add(stone);
        monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
        if (stoneSpawnTime > 170) { stoneSpawnTime -= 10; }
    }
}