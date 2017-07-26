class Score {
    constructor(ctx) {
        this.ctx = ctx
        this.score = 0
        this.text = '当前等分：'
        this.x = 380
        this.y = 20
    }

    draw(g) {
        this.ctx.fillText(this.text + this.score, this.x, this.y)
    }

    add(collide) {
        if (collide.up || collide.down) {
            this.score += 1
        }
    }
}