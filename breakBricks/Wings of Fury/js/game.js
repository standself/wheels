class Game {
    constructor(canvas, images) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.images = images

        this.bullets_enermies = []
        this.bullets_allies = []

        this.actions = []
        this.keydowns = {}
    }
    init() {
        window.addEventListener('keydown', (e) => {
            this.keydowns[e.key] = true
        })
        window.addEventListener('keyup', (e) => {
            this.keydowns[e.key] = false
        })

        this.draw()
        this.run()
    }

    getImageByName(name) {
        return this.images[name];
    }

    draw() {
        this.scene.draw()
    }

    update() {
        this.scene.update()
    }

    addAction(type, key, callback) {
        let cbks = this.actions[key]
        if (cbks && cbks.length) {
            this.actions[key].push(callback)
        } else {
            this.actions[key] = []
            this.actions[key].push(callback)
        }
    }

    runAction() {
        for (let key in this.keydowns) {
            if (this.keydowns[key] && key in this.actions) {
                let action = this.actions[key]
                action.forEach((act) => {
                    act()
                })
            }
        }
    }

    run() {
        if (window.pause) {
            return
        }
        this.runAction()
        this.update()
        this.draw()
        setTimeout(() => {
            this.run()
        }, 1000 / window.fps);
    }

    replaceScene(scene) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.scene = scene
    }
}