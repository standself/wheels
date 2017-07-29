;(function(win, doc) {
    var x = function(selector) {
        return []
    }
    x.prototype = x
    x.prototype.addMethod = function(name, method) {
        x.prototype[name] = method
    }
    x.addMethod('isArray', function(obj) {
        return Array.isArray(obj)
    })
    x.addMethod('isObject', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
    })
    x.addMethod('isArray', function(obj) {
        return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
    })
    x.addMethod('isArguments', function(obj) {
        return 'length' in obj && 'callee' in obj
    })
    x.addMethod('isFunction', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]'
    })
    x.addMethod('isNumber', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]'
    })
    x.addMethod('isFinite', function(obj) {
        return Number.isFinite(obj) || (Object.prototype.toString.call(obj) === '[object Number]' && obj.toString() !== 'Infinity' && obj.toString() !== '-Infinity')
    })
    x.addMethod('isBoolean', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Boolean]'
    })
    x.addMethod('isDate', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]'
    })
    x.addMethod('isRegExp', function(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]'
    })
    x.addMethod('isNaN', function(obj) {
        return Number.isNaN(obj)
    })
    x.addMethod('isNull', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Null]'
    })
    x.addMethod('isUndefined', function(obj) {
        return Object.prototype.toString.call(obj) === '[object Undefiend]'
    })
    x.addMethod('onConflict', function() {
        return x
    })
    x.addMethod('identity', function(value) {
        return value
    })
    x.addMethod('noop', function(obj) {
        return undefined
    })
    x.addMethod('times', function(n, iteratee, context) {
        let temp = [],
            ctx = context || this
        for (let i = 0; i < n; i++) {
            temp.push(iteratee.call(ctx, n))
        }
        return temp
    })

    // collection related
    x.addMethod('random', function(min, max) {
        let len = max ? (max - min) : min,
            start = max ? min : 0
        return Math.random() * len + start
    })
    x.addMethod('mixin', function(obj) {
        x = Object.assign({}, x, obj)
    })
    x.addMethod('uniqueID', function(prefix) {
        let id = Math.floor(Math.random() * 10e10)
        return prefix ? prefix + id.toString() : id.toString()
    })
    x.addMethod('escape', function(string) {
        let entitys = {
            ' ': '&nbsp',
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            "'": '&apos;',
            '"': '&quot;',
            '￠': '&cent;',
            '£': '&pound;',
            '¥': '&yen;',
            '€': '&euro;',
            '§': '&sect;',
            '©': '&copy',
            '™': '&trade;',
            '®': '&reg;',
            '×': '&times;',
            '÷': '&devide;',
        }
        let len = string.length,
            temp = ''
        for (let i = 0; i < len; i++) {
            let alpha = string[i]
            temp += alpha in entitys ? entitys[alpha] : alpha
        }
        return string
    })
    x.addMethod('result', function(object, property) {
        if (property in object) {
            return x.isFunction(object[property]) ? object[property]() : object[property]
        } else {
            return undefined
        }
    })
    x.addMethod('now', function() {
        return new Date().getTime()
    })

    x.addMethod('each', function (list, iteratee, context) {
        let ctx = context || this
        if (x.isObject(list) || x.isFunction(list)) {
            for (let key in list) {
                iteratee.call(ctx, list[key], key, list)
            }
        } else {
            list.forEach(function(item, index, list) {
                iteratee.call(ctx, item, index, list)
            })
        }
        return list
    })
    x.addMethod('forEach', function(list, iteratee, context) {
        return x.each(list, iteratee, context)
    })
    x.addMethod('map', function(list, iteratee, context) {
        let ctx = context || this,
            temp = []
        if (x.isObject(list)) {
            for (let key in list) {
                temp.push(iteratee.call(ctx, list[key], key, list))
            }
        } else {
            if ('map' in list) {
                temp = list.map(function(item, index, list) {
                    return iteratee.call(ctx, item, index, list)
                })
            } else {
                for (let i = 0; i < list.length; i++) {
                    temp.push(iteratee.call(ctx, list[i], i, list))
                }
            }
        }
        return temp
    })
    x.addMethod('reduce', function(list, iteratee, memo, context) {
        let ctx = context || this
        let isMemoed = memo && true
        if (x.isObject(list)) {
            for (let key in list) {
                if (!isMemoed) {
                    memo = list[key]
                    isMemoed = true
                    continue
                }
                memo = iteratee.call(ctx, memo, list[key], key, list) 
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                if (!isMemoed) {
                    memo = list[key]
                    isMemoed = true
                    continue
                }
                memo = iteratee.call(ctx, memo, list[i], i, list)
            }
        }
        return memo
    })
    x.addMethod('find', function(list, predicate, context) {
        let ctx = context || this,
            tempList = x.isArray(list) ? x.object(list) : list
        
        for (let key in tempList) {
            if (predicate.call(ctx, tempList[key])) {
                return tempList[key]
            }
        }
    })
    x.addMethod('filter', function(list, predicate, context) {
        let temp = {},
            ctx = context || this,
            tempList = x.isArray(list) ? x.object(list) : list
        x.each(tempList, function(value, key, tempList) {
            if (predicate(value, key, tempList)) {
                temp[key] = value
            }
        })
        return x.isArray(list) ? x.toArray(temp) : temp
    })
    x.addMethod('where', function(list, properties) {
        let temp = [],
            tempList = x.isArray(list) ? x.object(list) : list
            
        return x.filter(tempList, function(tempListItem) {
            let result = true
            x.each(properties, function(value, key, properties) {
                result = result
                    && (key in tempListItem)
                    && (value === tempListItem[key]) 
            })
            return result
        })
    })
    x.addMethod('findWhere', function(list, properties) {
        let temp = [],
            tempList = x.isArray(list) ? x.object(list) : list

        return x.find(tempList, function(tempListItem) {
            let result = true
            x.each(properties, function(value, key, properties) {
                result = result
                    && (key in tempListItem)
                    && (value === tempListItem[key]) 
            })
            return result
        })
    })
    x.addMethod('reject', function(list, predicate, context) {
        let temp = [],
            ctx = context || this,
            tempList = x.isArray(list) ? x.object(list) : list
        for (let key in tempList) {
            if (!predicate.call(ctx, tempList[key])) {
                temp.push(tempList[key])
            }
        }
        return temp
    })
    x.addMethod('every', function(list, predicate, context) {
        let ctx = context || this,
            tempList = x.isArray(list) ? x.object(list) : list,
            result = true

        x.each(tempList, function(value, key, properties) {
            result = result &&
                predicate.call(ctx, value)
        })
        return result
    })
    x.addMethod('some', function(list, predicate, context) {
        let ctx = context || this
        if (x.isArray(list)) {
            return list.some(function(item) {
                return predicate.call(ctx, item)
            })
        }
        return Boolean(x.find(list, function(value) {
            return predicate.call(ctx, value)
        }, ctx))
    })
    x.addMethod('contains', function(list, value) {
        if (x.isArray(list)) {
            return list.indexOf(value) > -1
        }
        return x.some(list, function(item, key, list) {
            return item === value
        })
    })
    x.addMethod('invoke', function(list, methodName) {
        let args = [].slice.call(arguments).slice(2)

        x.each(list, function(value, key, list) {
            value[methodName] && value[methodName](args)
        })
        return list
    })
    x.addMethod('pluck', function(list, propertyName) {
        let temp = []

        list.forEach(function(item, index, list) {
            if (item[propertyName]) {
                temp.push(item[propertyName])
            }
        })
        return temp
    })
    x.addMethod('max', function(list, iteratee, context) {
        if (!list.length) return Math.NEGATIVE_INFINITY

        let temp = []

        temp = x.sortBy(list, iteratee, context)
        log(temp)
        return temp[temp.length-1]
    })
    x.addMethod('sortBy', function(list, iteratee, context) {
        let temp = x.clone(list),
            ctx = context || this

        return iteratee ? temp.sort(iteratee.bind(ctx)) : temp.sort()
    })
    x.addMethod('groupBy', function(list, iteratee, context) {
        let groups = {}

        x.each(list, function(value, index, list) {
            let result = x.isFunction(iteratee)
                    ? iteratee.call(this, value, index, list)
                    : value[iteratee]
            if (result in groups) {
                groups[result].push(value)
            } else {
                groups[result] = [value]
            }
        }, context)
        return groups
    })
    x.addMethod('indexBy', function(list, iteratee, context) {

    })
    x.addMethod('countBy', function(list, iteratee, context) {
        let groups = {}

        x.each(list, function(value, index, list) {
            let result = x.isFunction(iteratee)
                    ? iteratee.call(this, value, index, list)
                    : value[iteratee]
            if (result in groups) {
                groups[result]++
            } else {
                groups[result] = 1
            }
        }, context)
        return groups
    })
    x.addMethod('shuffle', function(list) {
        let temp = x.clone(list)
        return temp.sort(function() {
            return Math.random() >= 0.5
        })
    })
    x.addMethod('sample', function(list, n) {
        let temp = x.shuffle(x.clone(list))
        return temp.slice(0, n ? n : 1)
    })
    x.addMethod('toArray', function(list) {
        if (list.length) {
            return [].slice.call(list)
        } else {
            let temp = []
            for (let key in list) {
                temp.push([key, list[key]])
            }
            return temp
        }
    })
    x.addMethod('size', function(list) {
        let size = 0

        if (x.isObject(list)) {
            for (let key in list) {
                size++
            }
            return size
        } else if (list.length) {
            return list.length
        }
    })
    x.addMethod('partition', function(array, predicate) {
        let temp = [],
            rest = []
        x.each(array, function(value, key, list) {
            if (predicate(value, key, list)) {
                temp.push(value)
            } else {
                rest.push(value)
            }
        })
        return [temp, rest]
    })


    // array related
    x.addMethod('object', function(list, values) {
        let temp = {}
        if (values && values.length && values.length > 0) {
            x.each(list, function(item, index, list) {
                 temp[values[index]] = item
            })
        } else {
            x.each(list, function(item, index, list) {
                temp[index] = item
            })
        }
        return temp
    })
    x.addMethod('first', function(array, n = 1) {
        if (!x.isArray(array)) {
            return []
        }
        let temp = array.slice(0, n)
        return n === 1 ? temp[0] : temp
    })
    x.addMethod('initial', function(array, n = 0) {
        return x.first(array, array.length - n)
    })
    x.addMethod('last', function(array, index = 1) {
        if (!x.isArray(array)) {
            return []
        }
        let temp = array.slice(Math.max(array.length -index, 0), array.length)
        return index === 1 ? temp[0] : temp
    })
    x.addMethod('rest', function(array, index = 1) {
        if (!x.isArray(array)) {
            return []
        }
        return array.slice(Math.min(array.length, index), array.length)
    })
    x.addMethod('compact', function(array) {
        return x.filter(array, function(value, key, index) {
            return Boolean(value)
        })
    })
    x.addMethod('flatten', function(array, shallow) {
        let temp = []
        if (!x.isArray(array)) {
            return array
        }
        x.each(array, function(value) {
            if (shallow) {
                temp = temp.concat(value)
            } else {
                temp = temp.concat(x.flatten(value))
            }
        })
        return temp
    })
    x.addMethod('without', function(array) {
        let values = x.rest(x.toArray(arguments))
        return x.filter(array, function(value) {
            return !(values.indexOf(value) > -1)
        })
    })
    x.addMethod('union', function() {
        let arrays = x.toArray(arguments),
            temp = []
        x.each(arrays, function(array) {
            x.each(array, function(item) {
                if (temp.indexOf(item) === -1) {
                    temp.push(item)
                }
            })
        })
        return temp
    })
    x.addMethod('intersection', function(a, b) {
        let temp = [],
            args = x.rest(x.toArray(arguments),2)

        x.each(a, function(item) {
            if (b.indexOf(item) > -1) {
                temp.push(item)
            }
        })
        while (args.length > 0) {
            let c = args.pop()
            temp = x.intersection(temp, c)
        }
        return temp
    })
    x.addMethod('difference', function(array) {
        let temp = [],
            others = x.rest(x.toArray(arguments), 1)

        others = x.flatten(others)

        return x.filter(array, function(item) {
            return !(others.indexOf(item) > -1)
        })
    })
    x.addMethod('uniq', function(array, isSorted, iteratee) {
        let temp = []
        if (!iteratee) {
            if (isSorted) {

            } else {
                x.each(array, function(item) {
                    if (temp.indexOf(item) === -1) {
                        temp.push(item)
                    }
                })
            }
        } else {
            x.each(array, function(item, index) {
                if (temp.indexOf(item) === -1) {
                    let result = x.some(temp, function(value) {
                        return value[iteratee] && item[iteratee] && value[iteratee] === item[iteratee]
                    })
                    if (!result) {
                        temp.push(item)
                    }
                }
            })
        }
        return temp
    })
    x.addMethod('zip', function() {
        let temp = [],
            args = x.toArray(arguments)

        x.each(args, function(arg) {
            x.each(arg, function(item, index) {
                if (temp[index]) {
                    temp[index].push(item)
                } else {
                    temp[index] = [item]
                }
            })
        })
        return temp
    })
    x.addMethod('indexOf', function(array, value, isSorted) {
        if (x.isBoolean(isSorted)) {
            log('isSorted')
        } else {
            let start = x.isNumber(isSorted) ? isSorted : 0
            return array.indexOf(value, start)
        }
    })
    x.addMethod('lastIndexOf', function(array, value, isSorted) {
        if (x.isBoolean(isSorted)) {
            log('isSorted')
        } else {
            let start = x.isNumber(isSorted) ? isSorted : 0
            return array.lastIndexOf(value, start)
        }
    })
    x.addMethod('sortedIndex', function(list, value, iteratee, context) {
        let temp = x.sortBy(list, iteratee, context)
        return x.indexOf(temp, value)
    })
    x.addMethod('range', function(start, stop, step) {
        let max = stop ? stop : start
            min = stop ? start : 0
            step = step || 1
            len = (max - min) / step,
            temp = []

        for (let i = 0; i < len; i++) {
            temp.push(min + step * i)
        }
        return temp
    })

    // function related
    x.addMethod('bind', function(fn, object) {
        let args = x.rest(x.toArray(arguments),2)
        return function() {
            fn.apply(object, arguments)
        }
    })
    x.addMethod('bindAll', function(object, methodNames) {
        x.each(methodNames, function(method) {
            // object[methodName].bind(object)
            object[method] = x.bind(object[method], object)
        })
    })
    x.addMethod('partial', function(fn) {
        let args = x.toArray(arguments).slice(1)
        return function() {
            return fn.apply(this, args.concat(x.toArray(arguments)))
        }
    })
    x.addMethod('memorize', function(fn, hashFn) {
        let temp = []
        function cache() {
            temp.push(fn.apply(this, arguments))
        }
        cache.cache = temp
        return cache
    })
    x.addMethod('delay', function(fn, wait) {
        let args = x.rest(x.toArray(arguments),2)
        setTimeout(function() {
            fn.apply(this, args)
        }, wait)
    })
    x.addMethod('defer', function(fn) {
        // let args = x.rest(x.toArray(arguments),1),
        //     tempFn = fn
        // while(fn = fn.caller) {
        //     continue
        // }
        // fn.apple
    })
    x.addMethod('throttle', function(fn, wait, obj) {
        // 在wait时间间隔内，只调用一次
        let leading = obj && obj['leading'], // 禁用首次调用
            trailling = obj && obj['trailling'], // 禁用末次调用
            timer = null
            lastCallTime = 0
            count = 0
            log('fn', fn, ' wait', wait)

        let tempFn = function() {
            let args = arguments
            if (!leading) {
                fn.apply(this, args)
                leading = true
                clearTimeout(timer)
                timer = null
                lastCallTime = x.now()
                count++
                log('leading, call:', lastCallTime, ' count:', count, ' timer: ', timer)
            }
            if (x.now() - lastCallTime >= wait) {
                clearTimeout(timer)
                timer = null
                fn.apply(this, args)
                count++
                lastCallTime = x.now()
                log('call:', lastCallTime, ' count:', count, ' timer: ', timer)

                if (trailling) {
                    if (!timer) {
                        timer = setTimeout(function() {
                            fn.apply(this, args)
                            clearTimeout(timer)
                            timer = null
                            lastCallTime = x.now()
                            count++
                            log('trailing call:', lastCallTime, ' count:', count)
                        }, wait)
                    }
                }
            }
        }
        return tempFn        
    })
    x.addMethod('debounce', function(fn, wait, immediate) {
        let timer = null

        return function() {
            let args = arguments
            if (timer) {
                clearTimeout(timer)
            }
            if (immediate) {
                fn.apply(this, args)
                immediate = false
                timer = setTimeout(function() {
                    immediate = true
                }, wait)
                return
            }

            timer = setTimeout(function() {
                fn.apply(this, args)
            }, wait)
        }
    })
    x.addMethod('throttle2', function(fn, wait) {

        var ctx, args, rtn, timeoutID; // caching
        var last = 0;

        return function throttled () {
            ctx = this;
            args = arguments;
            var delta = new Date() - last;
            if (!timeoutID)
              if (delta >= wait) call();
              else timeoutID = setTimeout(call, wait - delta);
            return rtn;
        };

        function call () {
            timeoutID = 0;
            last = +new Date();
            rtn = fn.apply(ctx, args);
            ctx = null;
            args = null;
        }
    })

    x.addMethod('once', function(fn) {
        let once = false

        return function() {
            if (once) return
            once = true
            fn.apply(this, arguments)
        }
    })
    x.addMethod('after', function(count, fn) {
        let time = 0
        return function() {
            if (time !== count) {
                time++
                return
            }
            return fn.apply(this, arguments)
        }
    })
    x.addMethod('before', function(count, fn) {
        let time = 0,
            result

        return function() {
            if (time <= count) {
                time++
                result = fn.apply(this, arguments)
            }
            return result
        }
    })
    x.addMethod('wrap', function(fn, wrapper) {
        return function() {
            let args = x.toArray(arguments)
            log(args, arguments.length)
            args.unshift(fn)
            return wrapper.apply(this, args)
        }
    })
    x.addMethod('negate', function(predicate) {
        return function() {
            return !predicate.apply(this, arguments)
        }
    })
    x.addMethod('compose', function() {
        let args = x.toArray(arguments),
            result
        return function() {
            let fn = args.shift()
            result = fn.apply(this, arguments)
            while (args.length) {
                fn = args.shift()
                result = fn.apply(this, [].concat(result))
            }
            return result
        }
    })

    // object related
    x.addMethod('clone', function(object) {
        if (x.isObject(object)) {
            return Object.assign({}, object)
        } else if (x.isArray(object)) {
            let temp = []
            for (let i = 0; i < object.length; i++) {
                temp.push(object[i])
            }
            return temp
        }
    })
    x.addMethod('keys', function(object) {
        return x.isObject(object) && Object.keys(object)
    })
    x.addMethod('values', function(object) {
        return x.isObject(object) && Object.values(object)
    })
    x.addMethod('pairs', function(object) {
        return x.toArray(object)
    })
    x.addMethod('invert', function(obj) {
        let temp = {}
        for (let key in obj) {
            temp[obj[key]] = key
        }
        return temp
    })
    x.addMethod('functions', function(obj) {
        let temp = []
        x.each(obj, function(item, key) {
            if (x.isFunction(item)) {
                temp.push(key)
            }
        })
        return temp.sort()
    })
    x.addMethod('extend', function(destination) {
        return Object.assign.apply(this, arguments)
    })
    x.addMethod('pick', function(obj, iteratee) {
        let values = x.rest(x.toArray(arguments), 1)

        if (x.isFunction(iteratee)) {
            return x.filter(obj, iteratee)
        } else {
            return x.filter(obj, function(value,key) {
                return values.indexOf(key) > -1
            })
        }
    })
    x.addMethod('omit', function(obj, iteratee) {
        let values = x.rest(x.toArray(arguments), 1)

        if (x.isFunction(iteratee)) {
            return x.filter(obj, x.negate(iteratee))
        } else {
            return x.filter(obj, function(value, key) {
                return values.indexOf(key) === -1
            })
        }
    })
    x.addMethod('defaults', function(obj) {
        let defaults = x.rest(x.toArray(arguments), 1)

        x.each(defaults, function(def) {
            x.each(def, function(value, key) {
                if (!obj[key]) {
                    obj[key] = value
                }
            })
        })
        return obj
    })
    x.addMethod('tap', function(obj, interceptor) {
        interceptor.call(this, obj)
        return obj
    })
    x.addMethod('has', function(obj, key) {
        return key in obj
    })
    x.addMethod('property', function(key) {
        return function(obj) {
            return obj[key]
        }
    })
    x.addMethod('matches', function(attrs) {

    })
    x.addMethod('isEqual', function(obj, other) {

    })
    x.addMethod('isElement', function(obj) {
        return obj instanceof HTMLElement
    })
    window.x = x
}(window, document));