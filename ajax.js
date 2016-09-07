/*
 * create by super
 *
 * */
//createXHR创建ajax对象兼容所有浏览器

var ajax = (function(){
    function createXHR() {
        var xhr = null;
        var ary = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }
        ];
        for (var i = 0, len = ary.length; i < len; i++) {
            var curFn = ary[i];
            try {
                xhr = curFn()
            } catch (e) {
                continue;
            }
            createXHR = curFn;
            break;

        }
        return xhr;
    }

    function ajax(opations){

        var _default={
            type:'get',
            url:null,
            async:true,
            data:null,
            success:null
        };

        for(var key in opations){
            if(opations.hasOwnProperty(key)){
                _default[key]=opations[key];
            }
        }

        if(_default.type=='get'){
            _default.url.indexOf('?')===-1?_default.url+='?_=':_default.url+='&_=';
            _default.url+=Math.random();
        }

        var xhr=createXHR();
        xhr.open(_default.type,_default.url,_default.async);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                var val=xhr.responseText;
                var data='JSON' in window?JSON.parse(val):eval("("+val+')');
                //回调函数
                if(typeof  _default.success =='function'){
                    _default.success.call(xhr,data);
                }

            }
        };
        xhr.send(_default.data)
    }
    return ajax;
    });
