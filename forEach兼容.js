~function (pro) {
    //模拟内置的Array.prototype上foreach方法 实现数组中每一项的遍历 达到兼容所有浏览器的目的
    function myForEach(callBack,context){
        //context是用来改变回调函数中的this指向的  不传的话默认是window
        context=context||window;
        //如果当前浏览器支持foreach我们直接使用即可  不需要自己在单独处理了
        if('forEach' in Array.prototype){
            this.forEach(callBack,context);
            return;
        }
        //myForEach中的this是我们当前要遍历的那个数组  接下里我们循环数组中的每一项，每循环一次都要把回调函数执行一次  不仅执行还给回调函数传递三个参数   当前项  索引 原有数组
        for(var i= 0,len=this.length;i<len;i++){
            /* if(typeof callBack=='function'){
             callBack(this[i],i,this);//当前项  索引 原有数组
             }*/
            callBack && callBack.call(context,this[i],i,this);//不仅仅传参还要把回调函数中的this修改为context
        }


    }

    pro.myForEach=myForEach;
}(Array.prototype);
