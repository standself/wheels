class Score {
    constructor(game) {
        this.ctx = game.ctx
        this.score = 0
        this.text = '当前等分：'
        this.x = 380
        this.y = 20
    }

    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(this.text + this.score, this.x, this.y)
    }

    add() {
        this.score += 100
    }
}