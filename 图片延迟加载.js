
/*
 * create by super
 *
 * */
    function  imgLoad(imgs) {
        for(var i=0;i<imgs.length;i++){
            var cur=imgs[i];
            if(cur.isload){
                continue;
            }
            var t=offset(cur).top+cur.offsetHeight;
            var curScollHeight=(document.documentElement.scrollTop||document.body.scrollTop)+(document.documentElement.clientHeight||document.body.scrollHeight);
            if(t>=curScollHeight){
                (function (cur) {
                    var tempImg=new Image;
                    tempImg.src=cur.getAttribute('trueSrc');
                    tempImg.onload= function () {
                        cur.src=this.src;
                        cur.style.display='block';
                        Animate(cur,{opacity:1},50);
                        cur.isload=true;
                    }
                })(cur)

            }
        }
    }




