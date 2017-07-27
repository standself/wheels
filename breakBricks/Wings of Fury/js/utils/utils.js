const utils = {
    collide(a, b) {
        if (b.y > a.y && b.y < a.y + a.img.height) {
            if (b.x > a.x && b.x < a.x + a.img.width) {
                return true
            }
        }
        return false
    },
    dom(selector) {
        return this.querySelector(selector)
    },
    domAll(selector) {
        return this.querySelectorAll(selector)
    },
    loadImage(images, callback) {
        let loaded = 0,
            imgArr = {},
            keys = Object.keys(images)
        keys.forEach((key) => {
            let img = new Image()
            img.onload = () => {
                loaded++
                imgArr[key] = img
                if (loaded === keys.length) {
                    callback(imgArr)
                }
            }
            img.src = images[key]
        })
    },
    randomBetween(min, max) {
        let len = max - min
        let num = Math.floor(Math.random() * len + min)
        return num
    },
    loadImageByLevel(level) {
        let images = {}
        images.bullet_enermies = config.bullets.enermies
        images.bullet_allies = config.bullets.allies
        images.allies = config.allies['level_' + level]
        images.boss = config.enermies.boss['level_' + level]
        images.enermies = config.enermies.soldier['level_' + level]
        images.sky = config.skies['level_' + level]
        return images;
    },
}
