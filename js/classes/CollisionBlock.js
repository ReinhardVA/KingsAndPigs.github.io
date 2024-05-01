class CollisionBlock {
    constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
    }
    Draw() {
        c.fillStyle = 'transparent';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
//Her 292 sembollü bloğu ayrı bir nesne haline getiririz ve çarpışmalar için gerekli bir büyük alan elde ederiz.