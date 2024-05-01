// variables, objects and calling functions 
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
//Üstteki kodda sahnenin olduğu kanvas tanımlandı

const velocityHorizontal = 5;
//Karakterin sağa ve sola ne kadar hızlı gideceğini tanımladık

const frameBuffer = 4;
//Assetlerin okunması için yapılmış kodlarda framebuffer sayesinde biraz daha yavaş çalışmasını sağlıyoruz, bu sayede
//daha oturaklı animasyonlar elde ediyoruz. Fazla tutarsak görüntü kasan bir hale gelir, az tutarsak animasyon çok hızlı gerçekleşir

const parsedCollisions = collisionsLevel1.parse2D();
//Haritayı bloklar halinde bölüyoruz. Her blokta çarpışma yaşanıp karakterin hareketlerini kısıtlaması ve gerçekçilik hissiyatı
//vermesi açısından önemli.
const collisionBlocks = [];
//Bölünen her bloğu bu dizide tutuyoruz.

const bgLevel1 = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
});
//Harita için bir obje oluşturup bu objeden aynı dosyadaki harita görselini okuyoruz

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
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                player.SwitchSprite('idle')
            }
        },
        attack:{
            frameRate: 3,
            frameBuffer: 3,
            loop: false,
            imageSrc: './img/king/Attack2.png'
        }
    }
});
// Gene aynı şekilde karakter için bir sınıf oluşturduk bu karakterin görselleri için, mekanikleri için vs. yazılan kodları
// bu sınıfta tutuyoruz


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
// Kapı dizisinden bir sprite objesi oluşturuyoruz. Bu obje sayesinde kağının görselini oyuna yansıtabiliriz ve animasyonları
// kullanabiliriz
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
//Tuş atamaları.
Animate();
CreateCollisionBlocks();
//Çağrılan fonksiyonlar

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
//Animate oyunun bel kemiği. Sondaki fonksiyon sayesinde her framede sürekli kendini çağırıyor bu sayede
//oyunumuzu oynayabilir hale geliyoruz
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
//Yatayda hareketlerimiz için kullanılan ve bu hareketlerdeki animasyonları çağıran fonksiyonumuz. İlgili tuşları
//basıldığında true, çekildiğinde false olarak tanımladığımızdan bas çek halinde çalışıyor ve sürekli çağrılıyor.
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
//Haritayı böldüğümüz blokları bir diziye atıyoruz. Bu Sayede haritamız aslında çizimden ziyade bir gerçekçilik katıyor.