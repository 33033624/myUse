~function (pro) {
    //formatTime������ָ����ʱ���ַ������ռȶ���ģ���ʽ���и�ʽ��
    function myFormatTime(template) {
        template = template || '{0}��{1}��{2}�� {3}ʱ{4}��{5}��';//template������������ʽ��ʱ���ģ��  ��������ݵĻ���һ��Ĭ�ϵ�ĩ��
        //�������this������Ҫ��ʽ�����¼��ַ���
        //1 ��������Ҫ��ʽ����ʱ���ַ����е����ֶ���ȡ�� �����ұ�����һ��������
        var ary = this.match(/\d+/g);


        //2 ���ȶ���ģ���л�ȡ{n}������n���ҵ�ary��ͨ��n����ȡ����Ӧ������  �û�ȡ�����ݰ�{n}�滻������
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
