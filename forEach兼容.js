~function (pro) {
    //ģ�����õ�Array.prototype��foreach���� ʵ��������ÿһ��ı��� �ﵽ���������������Ŀ��
    function myForEach(callBack,context){
        //context�������ı�ص������е�thisָ���  �����Ļ�Ĭ����window
        context=context||window;
        //�����ǰ�����֧��foreach����ֱ��ʹ�ü���  ����Ҫ�Լ��ڵ���������
        if('forEach' in Array.prototype){
            this.forEach(callBack,context);
            return;
        }
        //myForEach�е�this�����ǵ�ǰҪ�������Ǹ�����  ����������ѭ�������е�ÿһ�ÿѭ��һ�ζ�Ҫ�ѻص�����ִ��һ��  ����ִ�л����ص�����������������   ��ǰ��  ���� ԭ������
        for(var i= 0,len=this.length;i<len;i++){
            /* if(typeof callBack=='function'){
             callBack(this[i],i,this);//��ǰ��  ���� ԭ������
             }*/
            callBack && callBack.call(context,this[i],i,this);//���������λ�Ҫ�ѻص������е�this�޸�Ϊcontext
        }


    }

    pro.myForEach=myForEach;
}(Array.prototype);
