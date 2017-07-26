class Paddle {
    constructor(cxt) {
        this.cxt = cxt
        this.x = 100
        this.y = 350
        this.img = null
        this.speed = 10
    }
    draw(g) {
        this.img = this.img || g.getImageByName('paddle')
        this.cxt.drawImage(this.img, this.x, this.y)
    }
    moveLeft(g) {
        this.cxt.clearRect(this.x, this.y, this.img.width, this.img.height)
        this.x -= this.speed
        if (this.x <= 0) {
            this.x = 0;
        }
        this.draw(g)
    }
    moveRight(g) {
        this.cxt.clearRect(this.x, this.y, this.img.width, this.img.height)
        this.x += this.speed
        if (this.x + this.img.width >= 480) {
            this.x = 480 - this.img.width;
        }
        this.draw(g)
    }
}