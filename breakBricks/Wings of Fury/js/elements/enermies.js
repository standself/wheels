class Enermy extends Element {
    constructor(game) {
        super(game, 'enermies')
        this.speed = 0.2
        this.cooldown = 500
    }
    move() {
        this.y += this.speed
        this.fire()
    }

    fire() {
        if (this.cooldown > 0) {
            this.cooldown--
            return
        }
        this.cooldown = 500
        let bullets = new Bullet_enermies(this.game, this)
        this.game.bullets_enermies.push(bullets)
    }
}

class Boss extends Element {
    constructor(game) {
        super(game, 'boss')
        this.w = 80
        this.h = 80
        this.speed = 1
        this.cooldown = 400
    }

    move() {
        
        
        this.x += Math.random() >= 0.5 ? this.speed : -this.speed
        this.y += this.speed

        if (this.x <= 0 ) {
            this.x = 0
        } else if (this.x >= this.game.canvas.width) {
            this.x = this.game.canvas.width - this.w
        }
    }

    fire() {
        if (this.cooldown > 0) {
            this.cooldown--
            return
        }
        this.cooldown = 400
        let bullets = new Bullet_enermies(this.game, this)
        this.game.bullets_enermies.push(bullets)
    }
}