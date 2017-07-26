class Ball {
    constructor(cxt) {
        this.cxt = cxt
        this.x = 200
        this.y = 200
        this.img = null
        this.yspeed = 10
        this.xspeed = 10
        this.w = 15
        this.h = 15
    }

    draw(g) {
        this.img = this.img || g.getImageByName('ball')
        this.cxt.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    move() {
        this.x += this.xspeed
        this.y += this.yspeed
        if (this.x < 0 || this.x > 480) {
            this.xspeed = -this.xspeed
        }
        if (this.y < 0 || this.y > 400) {
            this.yspeed = -this.yspeed
        }
    }
    bounce(directions) {
        var x = directions && directions.down || false,
            y = directions && directions.up || false
        if (x || y) {
            this.yspeed = -this.yspeed
        }
    }
}