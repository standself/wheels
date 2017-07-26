class Block {
    constructor(ctx, block) {
        this.ctx = ctx
        this.img = null
        this.x = block.x
        this.y = block.y
        this.w = block.w
        this.h = block.h
        this.lifes = block.lifes
    }
    draw(g) {
        this.img = this.img || g.getImageByName('paddle')
        if (this.lifes > 0) {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    reduce(directions) {
        if (directions && (directions.up || directions.down)) {
            this.lifes -= 1
        }
    }
}

var Blocks = [
    { x: 380, y: 10, w: 30, h: 10, lifes: 1 },
    { x: 40, y: 40, w: 30, h: 10, lifes: 1 },
    { x: 180, y: 210, w: 100, h: 30, lifes: 3 },
    { x: 90, y: 90, w: 100, h: 20, lifes: 2 },
]