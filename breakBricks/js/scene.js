class Scene {
    constructor(game) {
        this.game = game
    }

    update() {
        // this.game.update()
    }
    draw() {
        // this.game.draw()
    }
}

class SceneStart extends Scene {
    constructor(game) {
        super(game)
        this.game.addAction('keydown', 'b', () => {
            var scene_main = new SceneMain(game)
            this.game.replaceScene(scene_main)
        })
    }

    draw() {
        this.game.ctx.fillStyle = '#303030'
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.fillStyle = 'white'
        this.game.ctx.fillText('press B to begin', 200, 180)
    }
}

class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.game.addAction('keydown', 'a', () => {
            this.paddle.move('left')
        })
        this.game.addAction('keydown', 'd', () => {
            this.paddle.move('right')
        })

        this.ball = new Ball(game)
        this.paddle = new Paddle(game)
        this.score = new Score(game)
        this.blocks = Blocks.map((item) => {
            return new Block(game, item)
        })
    }

    draw() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.fillStyle = '#303030'
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
        this.ball.draw()
        this.paddle.draw()
        this.blocks.forEach(block => {
            block.draw()
        })
        this.score.draw()
    }
    update() {
        this.ball.move()
        if (this.ball.y > this.paddle.y) {
            let scene_end = new SceneEnd(game)
            this.game.replaceScene(scene_end)
        }
        this.blocks = this.blocks.filter((block) => {
            let collide = this.ball.collide(block)
            if (collide) {
                this.ball.bounce()
                block.reduce()
                this.score.add()
            }
            return block.lifes > 0
        })
        let collide = this.ball.collide(this.paddle)
        if (collide) {
            this.ball.bounce()
        }
    }
}

class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        game.addAction('keydown', 'r', () => {
            var scene_start = new SceneStart(game)
            game.replaceScene(scene_start)
        })
    }

    draw() {
        this.game.ctx.fillStyle = '#303030'
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.fillStyle = 'white'
        this.game.ctx.fillText('press R to back to page Start', 200, 180)
    }
}