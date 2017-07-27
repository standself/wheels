class Ball {
    constructor(game) {
        this.ctx = game.ctx
        this.x = 200
        this.y = 200
        this.img = game.getImageByName('ball')
        this.yspeed = 10
        this.xspeed = 10
        this.w = 15
        this.h = 15
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    move() {
        this.x += this.xspeed
        this.y += this.yspeed
        if (this.x < 0 || this.x > 480) {
            this.xspeed = -this.xspeed
        }
        if (this.y < 0 || this.y > 400) {
            this.yspeed = -this.yspeed
        }
    }
    bounce() {
        this.yspeed = -this.yspeed
    }

    collide(a) {
        let points = [
            [this.x, this.y],
            [this.x, this.y + this.h],
            [this.x + this.w, this.y],
            [this.x + this.w, this.y + this.h],
        ]
        
        let aParams = [a.x, a.y, a.img.width, a.img.height]
        return isCollsion(...points[0].concat(aParams))
            || isCollsion(...points[2].concat(aParams))
            || isCollsion(...points[1].concat(aParams))
            || isCollsion(...points[3].concat(aParams));

        function isCollsion(bx, by, ax, ay, aw, ah) {  
            if (bx >= ax && bx <= ax + aw && by >= ay && by <= ay + ah) {  
                return true;
            }   
            return false;  
        }
    }
}