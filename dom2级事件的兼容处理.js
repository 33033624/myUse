function on(ele,type,fn){
    //��һ����on�����ܹ�ʶ������ϵͳ�¼������Զ����¼������һ�������ϵͳ�¼����Զ����¼���ͻ�������Ϊʲô���Զ����¼�ǰҪ��self��ԭ����
    if(/^self/.test(type)){//����¼���������self��ͷ�ģ����Զ����¼�ȥ����
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
        if(!ele["aEvent"+type]){//��һ�����Ǻ��Ĵ���2
            ele["aEvent"+type]=[];//��Ҫ��������¼�������
            ele.attachEvent("on"+type,function(){run.call(ele)});//�����󶨵��¼��ϵ���run��������run���������ַ�ʽ�󶨵�ele��type�¼������������ʽֻ��д�������Ϊʲô����������ȷ��run�İ󶨲��ظ�����Ϊ���д���ִֻ��һ�Σ�
        }
        var a=ele["aEvent"+type];
        for(var i=0;i<a.length;i++){
            if(a[i]==fn)return;	//����fn���ظ����浽������
        }
        a.push(fn);//���Ĵ��룬��fn���浽�Զ�����¼�����
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
    if(a)//ȷ���������

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

//�Զ����¼���֪ͨ���ķ���
function selfRun(selfType,e){//��һ���������Զ����¼����ͣ� �ڶ���������ϵͳ��ϵͳ���󣨿�ѡ�ģ�����Ϊ���ܰ�ϵͳ���¼������ٽ�����ȥ��

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
        if(a)//ȷ������������
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null;//��nullֵ����ԭ��fn��λ��
                    return;
                }
            }
    }
}
function processThis(fn,obj){
    return function(e){fn.call(obj,e)}
}