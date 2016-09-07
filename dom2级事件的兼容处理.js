function on(ele,type,fn){
    //第一步让on方法能够识别这是系统事件还是自定义事件，并且还不能让系统事件和自定义事件冲突。这就是为什么在自定义事件前要加self的原因了
    if(/^self/.test(type)){//如果事件类型是以self开头的，则按自定义事件去处理
        if(!ele["aSelf"+type]){
            ele["aSelf"+type]=[];
        }
        var a=ele["aSelf"+type]
        for(var i=0;i<a.length;i++){
            if(a[i]==fn)return;
        }
        a.push(fn);
    }else if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele["aEvent"+type]){//这一步算是核心代码2
            ele["aEvent"+type]=[];//先要创建这个事件池数组
            ele.attachEvent("on"+type,function(){run.call(ele)});//真正绑定到事件上的是run方法，把run方法用这种方式绑定到ele的type事件，并且这句表达式只能写在这儿。为什么？这样可以确定run的绑定不重复（因为这行代码只执行一次）
        }
        var a=ele["aEvent"+type];
        for(var i=0;i<a.length;i++){
            if(a[i]==fn)return;	//避免fn被重复保存到数组里
        }
        a.push(fn);//核心代码，把fn保存到自定义的事件池里
    }

}

function run(){

    var e=window.event;
    var type=e.type;

    if(!e.target){
        e.target=e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.preventDefault=function(){e.returnValue=false;}
        e.stopPropagation=function(){e.cancelBubble=true;}

    }

    var a=this["aEvent"+type]
    if(a)//确定数组存在

        for(var i=0;i<a.length;i++){
            if(typeof a[i] =="function"){
                a[i].call(this,e);
            }else{
                //[null,null,null,fn4,fn5,fn6,fn7];
                a.splice(i,1);
                i--;
            }
        }
}

//自定义事件“通知”的方法
function selfRun(selfType,e){//第一个参数是自定义事件类型， 第二个参数是系统的系统对象（可选的，就是为了能把系统的事件对象再接力下去）

    var a=this["aSelf"+selfType];
    if(a){
        for(var i=0;i<a.length;i++){
            a[i].call(this,e);
        }
    }

}

function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);

    }else{
        var a=ele["aEvent"+type];
        if(a)//确保这个数组存在
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null;//用null值代替原来fn的位置
                    return;
                }
            }
    }
}
function processThis(fn,obj){
    return function(e){fn.call(obj,e)}
}