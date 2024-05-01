window.addEventListener('keydown', (event) => {
    if (player.preventInput) return;
    switch (event.code) {
        case 'KeyW':
            if (player.velocity.y == 0) player.velocity.y = -20;
            break;
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
        case 'KeyE':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];
                if( player.hitbox.position.x <= door.position.x + door.width &&
                    player.hitbox.position.x + player.hitbox.width >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ){
                    player.preventInput = true;
                    player.SwitchSprite('enterDoor');
                    door.Play();
                    return;
                }
            }
            break;
        case 'Space':
            keys.space.pressed = true;
            break;
    }
});
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyA':
            keys.a.pressed = false;
            break;

        case 'KeyD':
            keys.d.pressed = false;
            break;
        case 'Space':
            keys.space.pressed = false;
            break;
    }
});
//Tuş atamaları için gerekli eventleri çağırdığımız yer. Yukarıdaki bastığımızda true'ya döndürerek hareketi sağlar, aşağısı bıraktığımızda hareketi sonlandırır