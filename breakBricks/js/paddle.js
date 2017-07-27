class Paddle {
    constructor(game) {
        this.ctx = game.ctx
        this.img = game.getImageByName('paddle')
        this.x = 100
        this.y = 350
        this.speed = 10
    }
    draw() {
        this.ctx.drawImage(this.img, this.x, this.y)
    }
    move(direct) {
        this.ctx.clearRect(this.x, this.y, this.img.width, this.img.height)
        if (direct == 'left') {
            this.x -= this.speed
        } else if (direct == 'right') {
            this.x += this.speed
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.img.width >= 480) {
            this.x = 480 - this.img.width;
        }

        this.draw()
    }
}