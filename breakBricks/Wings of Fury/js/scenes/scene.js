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
        this.game.ctx.drawImage(this.game.images.sky, 0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.font = '30px serif'
        this.game.ctx.fillStyle = 'white'
        this.game.ctx.fillText('press B to begin', 150, 180)
    }
}

class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.game.addAction('keydown', 'a', () => {
            this.allies.move('left')
        })
        this.game.addAction('keydown', 'd', () => {
            this.allies.move('right')
        })
        this.game.addAction('keydown', 's', () => {
            this.allies.move('down')
        })
        this.game.addAction('keydown', 'w', () => {
            this.allies.move('up')
        })
        this.game.addAction('keydown', 'f', () => {
            this.allies.canfire = !this.allies.canfire
        })

        this.allies = new Allies(game)
        this.score = new Score(game)
        this.enermies = []
        for (let i = 0; i < 5; i++) {
            let enermy = new Enermy(game)
            enermy.lifes = 10
            this.enermies.push(enermy)
        }
    }

    draw() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.drawImage(this.game.images.sky, 0, 0, this.game.canvas.width, this.game.canvas.height)
        this.allies.draw()
        this.enermies.forEach(enermy => {
            enermy.draw()
        })
        this.game.bullets_allies.forEach((bullet) => {
            bullet.draw()
        })
        this.game.bullets_enermies.forEach((bullet) => {
            bullet.draw()
        })
        this.score.draw()
    }
    update() {
        this.allies.fire()
        this.game.bullets_allies.forEach((bullet) => {
            this.enermies = this.enermies.filter((enermy) => {
                let beShoot = utils.collide(bullet, enermy) || utils.collide(enermy, bullet)
                if (beShoot) {
                    enermy.reduce()
                    this.score.add()
                }
                enermy.move()
                return enermy.lifes > 0
            })
            bullet.move()
        })

        this.game.bullets_enermies.forEach((bullet) => {
            if (bullet.y > this.game.canvas.height) return
            bullet.move()
        })
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
        this.game.ctx.drawImage(this.game.images.sky, 0, 0, this.game.canvas.width, this.game.canvas.height)
        this.game.ctx.font = '30px serif'
        this.game.ctx.fillStyle = 'white'
        this.game.ctx.fillText('press R to back to page Start', 200, 180)
    }
}