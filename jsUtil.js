var tool = {
    inherit:function (target,origin) {
        var temp = function () {};
        temp.prototype = origin.prototype;  
        target.prototype = new temp();
        target.prototype.constructor = target;
        //以上为圣杯模式三部曲：1.声明一个中间函数，让其原型等于被继承对象origin的原型
        //2.让继承对象target的原型等于中间函数构造出来的一个函数，目的为其可以继承对象的方法同时又能独立分开互不影响
        //3.让target原型上的constructor等于其自身
    },
    extends:function (origin) {
        var result = function () {
            //私有属性继承，传入参数执行函数时借助origin函数上的方法在此进行执行
            origin.apply(this,arguments);
            return this;
        };
        //原型方法继承
        this.inherit(result,origin);
        return result
    },
    single:function (origin) {
        var singleResult = (function(){
            var instance;
            return function () {
                if(typeof instance == 'object') {
                    return instance
                }
                origin && origin.apply(this,origin);
                instance = this;
            }
        }());
        origin && this.inherit(singleResult,origin);
        return singleResult;
    }
}



