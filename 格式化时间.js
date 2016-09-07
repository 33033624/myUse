~function (pro) {
    //formatTime用来把指定的时间字符串按照既定的模板格式进行格式化
    function myFormatTime(template) {
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';//template是我们用来格式化时间的模板  如果不传递的话有一套默认的末班
        //这里面的this就是我要格式化的事件字符串
        //1 把我们需要格式化的时间字符串中的数字都获取到 ，并且保存在一个数组中
        var ary = this.match(/\d+/g);


        //2 到既定的模板中获取{n}和数字n并且到ary中通过n来获取到对应的内容  用获取的内容把{n}替换掉即可
        return  template.replace(/\{(\d+)\}/g, function () {
            var index = arguments[1];
            var item = ary[index];
            !item? item = '00':null;
            item.length < 2?item = '0'+ item:null;
            return item;
        });
    }

    pro.myFormatTime = myFormatTime;
}(String.prototype);
