class Player extends Sprite{
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations,
        loop
    })
    {
        super({imageSrc, frameRate, animations, loop});
        this.position = {
            x: 300,
            y: 300
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.sides = {
            top: this.position.y,
            bottom: this.position.y + this.height,
            rightSide: this.position.x + this.width,
            leftSide: this.position.x
        };
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
    }
    Update() {
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;
        this.UpdateHitbox();
        this.CheckHorizontalCollision();   
        this.Gravity();
        this.UpdateHitbox();
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.CheckVerticalCollision();        
    }

    SwitchSprite(name){
        if(this.image == this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
    }

    UpdateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 54
        };
    }

    CheckVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const cBlock = this.collisionBlocks[i];

            if (this.hitbox.position.x <= cBlock.position.x + cBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= cBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= cBlock.position.y &&
                this.hitbox.position.y <= cBlock.position.y + cBlock.height) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitbox.position.y - this.position.y
                    this.position.y = cBlock.position.y + cBlock.height - offSet + 0.01;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = cBlock.position.y - offSet - 0.01;
                    break;
                }
            }
        }
    }

    Gravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    CheckHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const cBlock = this.collisionBlocks[i];

            if (this.hitbox.position.x <= cBlock.position.x + cBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= cBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= cBlock.position.y &&
                this.hitbox.position.y <= cBlock.position.y + cBlock.height) {
                if (this.velocity.x < 0) {
                    const offSet = this.hitbox.position.x - this.position.x;
                    this.position.x = cBlock.position.x + cBlock.width - offSet + 0.01;
                    break;
                }
                if (this.velocity.x > 0) {
                    const offSet = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = cBlock.position.x - offSet - 0.01;
                    break;
                }
            }
        }
    }
}
