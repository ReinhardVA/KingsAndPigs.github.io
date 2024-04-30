// variables, objects and calling functions 
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const velocityHorizontal = 5;
const frameBuffer = 4;
const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = [];

const bgLevel1 = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
});
const player = new Player({
    collisionBlocks: collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations:{
        idleRight:{
            frameRate: 11,
            frameBuffer: frameBuffer,
            loop: true,
            imageSrc:'./img/king/idle.png'
        },
        idleLeft:{
            frameRate: 11,
            frameBuffer: frameBuffer,
            loop: true,
            imageSrc:'./img/king/idleLeft.png', 
        },
        runRight:{
            frameRate: 8,
            frameBuffer: frameBuffer,
            loop: true,
            imageSrc:'./img/king/runRight.png', 
        },
        runLeft:{
            frameRate: 8,
            frameBuffer: frameBuffer,
            loop: true,
            imageSrc:'./img/king/runLeft.png', 
        },
        enterDoor:{
            frameRate: 8,
            frameBuffer: frameBuffer,
            loop: false,
            imageSrc: './img/king/enterDoor.png'
        },
        attack:{
            frameRate: 3,
            frameBuffer: 3,
            loop: false,
            imageSrc: './img/king/attack.png'
        }
    }
});

const doors = [
    new Sprite({
        position:{
            x:767,
            y:270
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 4,
        loop: false,
        autoplay: false
    })
];

const keys = {
    w:{
        pressed: false,
    },
    a:{
        pressed: false,
    },
    d:{
        pressed: false
    },
    space:{
        pressed: false
    }
}
Animate();
CreateCollisionBlocks();


//functions

function Animate(){
    //SAHNE
    bgLevel1.Draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.Draw();
    });

    doors.forEach(door => {
        door.Draw();
    });
    //OYUNCU
    MoveHorizontal();
    player.Draw();
    player.Update(canvas.height, canvas.width);
    window.requestAnimationFrame(Animate);
}

function MoveHorizontal() {
    if (player.preventInput) return;
    player.velocity.x = 0;
    if (keys.d.pressed == true) {
        player.SwitchSprite('runRight');
        player.velocity.x = velocityHorizontal
        player.lastDirection = 'right';
    }
    else if (keys.a.pressed == true) {
        player.SwitchSprite('runLeft');
        player.velocity.x = -velocityHorizontal;
        player.lastDirection = 'left';
    }
    else if (keys.space.pressed == true){
        player.SwitchSprite('attack');
    }
    else{
        if(player.lastDirection == 'left') player.SwitchSprite('idleLeft');
        else player.SwitchSprite('idleRight')

    }
}

function CreateCollisionBlocks() {
    parsedCollisions.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if(symbol == 292){
                collisionBlocks.push(new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                }))
            }
        })
    });
}