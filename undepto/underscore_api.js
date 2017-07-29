;(function(win, doc) {
var _ = {}

// collections(集合，含对象和数组)
_.each(list, iteratee, [context])
_.forEach(list, iteratee, [context])
    // context是iteratee的this，iteratee(element, index/key, list) => list
_.map(list, iteratee, [context])
    // return newList
_.reduce(list, iteratee, [memo], [context])
_.reduceRight(list, iteratee, [memo], [context])
    // iteratee(memo, value, index/key, list)
_.find(list, predicate, [context])
    // 返回首个对predicate差生真值的list元素
_.filter(list, predicate, [context])
    //如果存在原生方法就用原生
_.where(list, properties)
    // 返回包含properties所列属性的所有键值对
_.findWhere(list, properties)
    // 返回第一个值
_.reject(list, predicate, [context])
    //与_.filter相反
_.every(list, predicate, [context])
_.some(list, predicate, context)
    // 只要找到第一个predicate为真的list元素就终止
_.contains(list, value)
    // list可为obj或arr
_.invoke(list, methodName, *arguments)  
    // 在list元素的methodName方法，多出的arguments将传给methodName 
_.pluck(list, propertyName)
    // 提取对象数组中的某个属性值,返回数组
_.max(list, [iteratee], [context])
    // 返回最大值；如果iteratee存在，以它作为排序依据；若list为空，返回-infinity
_.min(list, [iteratee], [context])
_.sortBy(list, iteratee, [context])
    // 返回一个排序后的list拷贝副本
_.groupBy(list, iteratee, [context])
    // 根据iteratee的返回结果对list进行分组
_.indexBy(list, iteratee, [context])
    //与groupBy类似，当list元素的键是唯一值时使用
_.countBy(list, iteratee, [context])
    //类似groupBy，计算符合和不符合iteratee的值个数
_.shuffle(list)
    // 返回list的随机化副本，Fisher-Yates shuffle
_.sample(list, [n])
    //从list中随机获取1个或n个元素
_.toArray(list)
    //把list(任何可迭代对象)转化成数组
_.size(list)
    //返回list的长度
_.partition(array, predicate)
    // 根据满足predicate与否拆分array成2个array

// Array Functions 数组函数
_.first(array, [n])
    //返回第一个元素或者n之前的所有元素
_.initial(array, [n])
    // 排除数组最后的n个元素
    // 返回最后一个元素之前的所有元素或len-n之前的所有元素（排除了n个元素）
_.last(array, [n])
    // 返回最后一个元素或这最后n个元素
_.rest(array, [index])
    // 返回第一个元素后的所有元素；第index个元素后的所有元素
_.compact(array)
    //返回一个除去所有false值的array副本
_.flatten(array, [shallow])
    //扁平化数组，默认全部扁平化；shallow表明只扁平化一次
_.without(array, *values)
    // 返回一个删除所有values后的array副本
_.union(*arrays)
    // 返回多个array的并集array
_.difference(array, *others)
    // 返回array中不在others中元素数组(伪差集)
_.intersetion(*arrays)
    // 返回arrays中共有的元素数组(交集)
_.uniq(array, [isSorted], [iteratee])
    // 去重，若array已经排序传入issortted真值加快运行；若为对象，需要传入欲对比的属性
_.zip(*arrays)
    //把arrays中同一位置的值进行合并(把行变为列数据)
_.object(list, [values])
    // 把数组转化为对象，若values存在，则把list的元素作为键，values元素作为值
_.indexOf(array, value, [isSorted|FromIndex])
    // 返回value在array中的索引，否则返回-1            
_.lastIndexOf(array, value, [fromIndex])
_.sortedIndex(list, value, [iteratee], [context])
    //查找value在list的排序位置；iteratee为排序函数；默认升序
_.range([start], stop, [step])
    // stop<start时返回长度为0，想反向的话使用-step

// 与函数相关的函数
_.bind(function, object, *arguments)
    // 把function绑定到object上，多余参数作为function的参数
_.bindAll(object, methodNames)  
_.partial(function, *arguments)
    //curry
_.memorize(function, [hashFunction])
    // 缓存某个函数的计算结果
_.delay(function, wait, *arguments)
    // 多余的参数作为function的参数传入
_.defer(function, *arguments)
    // 延迟调用function直到当前调用栈清空位置 
_.throttle(function, wait, [options])
    // 最多每个wait毫秒调用一次该函数
_.debounce(function, wait, [immediate])
    // 在最后一次调用的wait时间后调用该函数，immediate为真的话，在wait开始时就调用，且wait毫秒内不再调用
_.once(function)
    // 创建一个只能调用一次的函数    
_.after(count, function)
    //在运行了count次后才会执行function
_.before(count, function)
    //只有前count次的调用有效，count次后的结果都与第count次相同
_.wrap(function, wrapper)
    //把function作为wrapper的第一个参数封装到wrapper里面，可以让wrapper在function运行前或后执行
_.negate(predicate)
    // 返回predicate的否定版本
_.compose(*functions)
    // 返回函数集functions组合后的复合函数，一个函数执行完后的结果作为第二个函数的参数。。。

// 对象函数 object functions
_.keys(object)
_.values(object)
_.pairs(object)
    // 把对象转为[[key, value]]形式的数组
_.invert(object)
    // 返回object的副本，但key和value互换
_.functions(object)
    // 返回对象的所有方法名，且排序好
_.extend(destination, *sources)
    // 把sources的所有属性覆写到destination上，复制按顺序
_.pick(object, [*keys|iteratee])
    // 返回挑选出object中keys的属性键值对，或者由iteratee决定挑选哪个
_.omit(object, *keys)
    // 返回筛选不属于keys的object属性键值对
_.defaults(object, *defaults)
    // 用defaults对象填充object中的undefined属性
_.clone(object)
_.tap(object, interceptor)
    // 用object作为参数来调用interceptor，并返回object
_.has(object, key)
    // 等于object.hasOwnProperty(key)
_.property(key)
    // 返回一个函数，该函数返回传入对象的key属性
_.matches(attrs)
    // 返回一个断言函数，辨别传入的参数是否匹配attrs的键值对
_.isEqual(object, other)
    // 执行object和other之间的优化深度比较
_.isEmpty(object)
    // object不含任何可枚举的属性则返回true；对于str和arrLike，若length为0也为true
_.isElement(object)
    // 如果object是个dom元素返回true
_.isArray(object)
    // 如果object是一个数组返回true
_.isObject(object)
    // 如果object是个对象返回true
_.isArguments(object)
    // 如果object是一个参数对象，返回true
_.isFunction(object)
_.isString(object)
_.isNumber(object)
    // 含NaN
_.isFinite(object)
_.isBoolean(object)
_.isDate(object)
_.isRegExp(object)
_.isNaN(object)
_.isNull(object)
_.isUndefined(object)

// 工具函数 utility function
_.noConflict()
_.identity(value)
    // f(x) = x
_.constant(value)
_.noop()
    // 返回undefined，可作为默认的回调函数
_.times(n, iteratee, [context])
    // 返回调用n次iteratee(n)的返回值数组
_.random(min, [max])
    // 单个参数为_.random(0, min)
_.mixin(object)
_.iteratee(value, [context], [argCount])
_.uniqueID([prefix])
_.escape(string)
_.unescape(string)
_.result(object, property)
    // 如果object的prope是函数就调用它，否则返回它
_.now()
    // 获得当前时间的整数时间戳
_.template(templateString, [settings])

_.chain(obj) {
    // 返回一个封装的对象；该对象会返回自己，直到该对象调用value方法
    _.temp = _.temp || []
    _.temp.push(obj)
    _.temp.value = () => _.temp[_.temp.length - 1]
    return  _
}


return _
})(window, document);