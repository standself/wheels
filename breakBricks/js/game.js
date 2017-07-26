class Game {
    constructor(canvas, images) {
        this.canvas = canvas
        this.cxt = canvas.getContext('2d')
        this.images = {}
        this.ball = null
        this.paddle = null
        this.score = null
        this.blocks = []

        this.actions = []
        this.loaded = false

        this.loadImages(images)
    }

    loadImages(images) {
        let loaded = 0;
        let keys = Object.keys(images)
        keys.forEach((image) => {
            let img = new Image()
            img.src = images[image]
            img.onload = () => {
                loaded++
                this.images[image] = img
                if (loaded == keys.length) {
                    this.loaded = true
                }
            } 
        })
    }

    getImageByName(name) {
        return this.images[name];
    }

    draw() {
        this.ball.draw(this)
        this.paddle.draw(this)
        this.blocks.forEach(block => {
            block.draw(this)
        })
        this.score.draw(this)
    }

    update() {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
        let paddleCollide = this.collide(this.paddle, this.ball)
        this.blocks = this.blocks.filter((block) => {
            let blocksCollide = this.collide(block, this.ball)
            this.ball.bounce(blocksCollide)
            block.reduce(blocksCollide)
            score.add(blocksCollide)
            return block.lifes > 0
        })
        this.ball.bounce(paddleCollide)
        this.ball.move()
        this.ball.draw(this)
        this.paddle.draw(this)
        this.blocks.forEach(block => {
            block.draw(this)
        })
        this.score.draw(this)
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
        window.addEventListener('keydown', (e) => {
            let key = e.key
            if (key in this.actions) {
                let action = this.actions[key]
                action.forEach((act) => {
                    act()
                })
            }
        })
    }

    run() {
        this.runAction()
        var timer = setInterval(()=> {
            if (this.loaded) {
                this.draw()
                this.update()
                // clearInterval(timer)
            }
        }, 50);
    }

    collide(a, b) {
        let points = [
            [b.x, b.y],
            [b.x, b.y + b.h],
            [b.x + b.w, b.y],
            [b.x + b.w, b.y + b.h],
        ]
        let aParams = [a.x, a.y, a.img.width, a.img.height]
        let directions = {
            up: isCollsion(...points[0].concat(aParams)) || isCollsion(...points[2].concat(aParams)),
            down: isCollsion(...points[1].concat(aParams)) || isCollsion(...points[3].concat(aParams)),
        }
        return directions

        function isCollsion(bx, by, ax, ay, aw, ah) {  
            if (bx >= ax && bx <= ax + aw && by >= ay && by <= ay + ah) {  
                return true;
            }   
            return false;  
        }
    }
}