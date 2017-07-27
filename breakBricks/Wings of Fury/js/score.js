class Score {
    constructor(game) {
        this.ctx = game.ctx
        this.score = 0
        this.text = '当前等分：'
        this.x = 20
        this.y = 560
    }

    draw() {
        this.ctx.font = '20 serif'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(this.text + this.score, this.x, this.y)
    }

    add() {
        this.score += 100
    }
}