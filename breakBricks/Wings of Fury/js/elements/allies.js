class Allies extends Element {
    constructor(game) {
        super(game, 'allies')
        this.x = 100
        this.y = 350
        this.w = 25
        this.h = 25
        this.speed = 5
        this.cooldown = 30
        this.canfire = false
    }
    draw() {
        // ctx.drawImage(plane, 0, 0, 30, 30, 20, 20, 60, 60), 0,0,30,30是plane图片中的clip，20,20,60,60是该clip画在canvas上的位置和宽高
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    move(direct) {
        this.ctx.clearRect(this.x, this.y, this.w, this.h)
        switch (direct) {
            case 'left':
                this.x -= this.speed
                break
            case 'right':
                this.x += this.speed
                break
            case 'up':
                this.y -= this.speed
                break
            case 'down':
                this.y += this.speed
                break
        }
        

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.img.width >= 480) {
            this.x = 480 - this.img.width;
        }

        this.draw()
    }

    fire() {
        if (this.cooldown > 0) {
            this.cooldown--
            return
        }
        this.cooldown = 30
        let bullets = new Bullet_allies(this.game, this)
        this.game.bullets_allies.push(bullets)
    }
}