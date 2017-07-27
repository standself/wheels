class Element {
    constructor(game, name) {
        this.game = game
        this.ctx = game.ctx
        this.img = game.getImageByName(name)
        this.x = utils.randomBetween(0, game.canvas.width - 30)
        this.y = utils.randomBetween(30, game.canvas.height / 3 - 30)
        this.w = 30
        this.h = 30
        this.lifes = 1
    }

    draw() {
        if (this.lifes > 0) {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    // 碰撞后掉血
    reduce() {
        this.lifes -= 1
    }

    move() {
        // 移动，子类覆盖
    }
}