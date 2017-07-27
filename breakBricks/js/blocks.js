class Block {
    constructor(game, block) {
        this.ctx = game.ctx
        this.img = game.getImageByName('block')
        this.x = block.x
        this.y = block.y
        this.w = block.w
        this.h = block.h
        this.lifes = block.lifes || 1
    }
    draw() {
        if (this.lifes > 0) {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    reduce() {
        this.lifes -= 1
    }
}