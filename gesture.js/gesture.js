(function() {
var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this ||
        {};

"object" == typeof exports && "undefined" != typeof module 
    ? module.exports = Gesture
    : "function" == typeof define && define.amd
        ? define(e)
        : root.Gesture = Gesture

    class EventCenter {
        constructor() {
            this.callbacks = {}
        }

        on(eventName, cb) {
            if (eventName in this.callbacks) {
                this.callbacks[eventName].push(cb)
            } else {
                this.callbacks[eventName] = [cb]
            }
        }
        emit(eventNames, eventObj) {
            let names = []
            if (Array.isArray(eventNames)) {
                names = eventNames
            } else {
                names = [eventNames]
            }
            names.forEach((name) => {
                let cbs = this.callbacks[name]
                cbs && cbs.forEach((cb) => {
                    cb.call(this, eventObj)
                })
            })
        }

        createEventObj(obj) {
            return obj
        }
    }

    class GestureRecognizer {
        constructor(ele, ops, EC) {
            this.ele = ele
            this.width = parseInt(getComputedStyle(this.ele, '')['width'])
            this.start = []  // for telling whether gesture is (rotate, pinch) or (press, tap, pan, swipe)
            this.end = []   // with this.start for recording position of gesture
            this.distance = ops && ops.distance || (this.width / 4)  // for telling whether gesture is swipe
            this.timeStamp = ops && ops.time || 150   // ms, for telling whether gesture is tap or press
            this.EC = EC
            this.ele.addEventListener('touchstart', (evt) => {
                this.touchstart(evt)
            })
        }

        touchmove(evt) {}
        touchstart(evt) {
            let touches = [].slice.call(evt.touches)
            log(evt.touchesList, evt.type, evt.pointerType)
            this.start = [] // reset this.start when touchstart
            touches.forEach((touch) => {
                this.start.push({
                    x: touch.screenX,
                    y: touch.screenY,
                    timeStamp: new Date().getTime(),
                })
            })
        }
        touchend(evt) {
            let touches = [].slice.call(evt.changedTouches)

            this.end = []

            touches.forEach((touch) => {
                this.end.push({
                    x: touch.screenX,
                    y: touch.screenY,
                    timeStamp: new Date().getTime(),
                })
            })
        }
        tellGesture() {}
        calcDistance(point1, point2) {
            return Math.sqrt(Math.pow(point1.x - point2.x, 2), Math.pow(point1.y - point2.y, 2))
        }
        calcAngle(point1, point2) {
            let x, y, z, cos, radina, angle
            // 直角的边长
            x = Math.abs(point1.x - point2.x)
            y = Math.abs(point1.y - point2.y)
            // 斜边长
            z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
            // 余弦
            cos = y / z
            // 弧度
            radina = Math.acos(cos)
            // 角度
            angle =  180 / (Math.PI / radina)
            return angle
        }
    }

    class Pan extends GestureRecognizer {
        constructor(ele, ops, EC) {
            super(ele, ops, EC)
            this.tellGesture()
        }
        tellGesture() {
            this.ele.addEventListener('touchmove', (evt) => {
                evt.preventDefault()
                this.touchend(evt)

                let evtObj = {},
                    distance = 0

                distance = this.end[0].x - this.start[0].x
                if (this.start.length === 1) {
                    evtObj = this.EC.createEventObj({
                        x: this.end[0].x,
                        y: this.end[0].y,
                        distance: distance, // positive value means panRight, otherwise panLeft
                        target: this.ele,
                        name: distance >= 0 ? 'panright' : 'panleft',
                    })
                    this.EC.emit('pan', evtObj)
                }
            })
        }
    }

    class Swipe extends GestureRecognizer {
        constructor(ele, ops, EC) {
            super(ele, ops, EC)
            this.tellGesture()
        }
        tellGesture() {
            this.ele.addEventListener('touchend', (evt) => {
                evt.preventDefault()
                this.touchend(evt)

                let evtObj = {},
                    distance = 0
                
                distance = this.end[0].x - this.start[0].x
                if (this.start.length === 1 && Math.abs(distance) >= this.distance) {
                    evtObj = this.EC.createEventObj({
                        x: this.end[0].x,
                        y: this.end[0].y,
                        distance: Math.abs(distance), // positive value means panRight, otherwise panLeft
                        target: this.ele,
                        name: distance >= 0 ? 'swiperight' : 'swipeleft',
                    })
                    this.EC.emit('swipe', evtObj)
                }
            })
        }
    }

    class PressTap extends GestureRecognizer {
        constructor(ele, ops, EC) {
            super(ele, ops, EC)
            this.tellGesture()
        }
        tellGesture() {
            this.ele.addEventListener('touchend', (evt) => {
                evt.preventDefault()
                this.touchend(evt)

                let evtObj = {},
                    timeStamp = 0,
                    evtName = ''

                if (this.start.length === 1) {
                    timeStamp = this.end[0].timeStamp - this.start[0].timeStamp

                    evtObj = this.EC.createEventObj({
                        x: this.end[0].x,
                        y: this.end[0].y,
                        timeStamp: timeStamp,
                        target: this.ele,
                        name: timeStamp >= this.timeStamp ? 'press' : 'tap',
                    })

                    this.EC.emit(evtObj.name, evtObj)
                }
            })
        }
    }

    class PinchZoom extends GestureRecognizer {
        constructor(ele, ops, EC) {
            super(ele, ops, EC)
            this.tellGesture()
        }
        touchmove(evt) {
            this.touchend(evt)
        }

        touchend(evt) {
            super.touchend(evt)
        }

        tellGesture(fn) {   // fn is prepared for rotate
            this.ele.addEventListener('touchmove', (evt) => {
                evt.preventDefault()
                this.touchmove(evt)

                let evtObj = {},
                    distance = 0,
                    initialDistance
                
                if (evt.touches.length <2) {
                    return
                }

                distance = this.calcDistance(this.end[0], this.end[1])
                initialDistance = this.calcDistance(this.start[0], this.start[1])

                evtObj = this.EC.createEventObj({
                    x: [this.end[0].x, this.end[1].x],
                    y: [this.end[0].y, this.end[1].y],
                    timeStamp: 0,
                    target: this.ele,
                    distance: distance / initialDistance,
                    name: 'pinch',
                })
                this.EC.emit('pinch', evtObj)

                typeof fn === 'function' && fn(evt)
            })
        }
    }

    class Rotate extends GestureRecognizer {
        constructor(ele, ops, EC) {
            super(ele, ops, EC)
            this.tellGesture()
        }

        touchmove(evt) {
            super.touchend(evt)
        }

        tellGesture() {
            this.ele.addEventListener('touchmove', (evt) => {
                evt.preventDefault()
                this.touchmove(evt)

                if (evt.touches.length < 2 || this.start.length < 2) {
                    return
                }


                let initialAngle = this.calcAngle(this.start[0], this.start[1]),
                    angle = this.calcAngle(this.end[0], this.end[1]),
                    evtObj

                write(initialAngle, angle)

                evtObj = this.EC.createEventObj({
                    x: [this.end[0].x, this.end[1].x],
                    y: [this.end[0].y, this.end[1].y],
                    timeStamp: 0,
                    target: this.ele,
                    angle: angle - initialAngle,
                    name: 'rotate',
                })
                this.EC.emit('rotate', evtObj)
            })
        }
    }

    class Gesture {
        constructor(ele, ops) {
            this.ele = ele
            this.ops = ops || {
                timeStamp: 150,
                distance: parseInt(getComputedStyle(this.ele, '')['width']) / 4,
                angle: 30,
            }
            this.EC = new EventCenter()
            this.manager = {
                callbacks: this.EC.callbacks,
                'pan': [],
                'press': [],
                'tap': [],
                'pinch': [],
                'roate': [],
                'swipe': [],
            }
            this.allGestures = {
                'pan': Pan,
                'press': PressTap,
                'tap': PressTap,
                'pinch': PinchZoom,
                'roate': Rotate,
                'swipe': Swipe,
            }
        }
        add(name, callback) {
            let gesture = this.allGestures[name]
                && new this.allGestures[name](this.ele, this.ops, this.EC)
                || function() {}

            this.EC.on(name, callback)
            this.manager[name].push(gesture)
        }
        remove(name) {
            this.EC.callbacks[name] = []
            this.manager[name] = []
        }
    }


}())
