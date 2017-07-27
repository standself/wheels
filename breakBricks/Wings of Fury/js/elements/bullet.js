class Bullet_allies extends Element {
    constructor(game, plane) {
        super(game, 'bullet_allies')
        this.x = plane.x + plane.w / 2
        this.y = plane.y
        this.w = 5
        this.h = 8
        this.speed = 4
    }

    move() {
        this.ctx.clearRect(this.x, this.y, this.w, this.h)
        this.y -= this.speed
    }
}

class Bullet_enermies extends Element {
    constructor(game, plane) {
        super(game, 'bullet_enermies')
        this.x = plane.x + plane.w / 2
        this.y = plane.y + plane.h / 2
        this.speed = 4
        this.w = 5
        this.h = 8
    }

    move() {
        this.ctx.clearRect(this.x, this.y, this.img.width, this.img.height)
        this.y += this.speed
    }
}