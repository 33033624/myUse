(function () {
    function listToArray(likeArray) {
        try {
            return [].slice.call(likeArray, 0);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeArray.length; i++) {
                ary.push(likeArray[i]);
            }
            return ary;
        }
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p) {
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t};
    }

    function win(attr, val) {
        if (!typeof val == 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        } else {
            return document.documentElement[attr] || document.body[attr];
        }
    }

    function getElementsByClass(classStr, context) {
        context = context || document;
        if ('getElementsByClassName' in window) {
            return context.getElementsByClassName(classStr);
        }
        var ary = [];
        var strArray = classStr.replace(/(^ +| +$)/g, '').split(/ +/g);
        var elements = context.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
            var curEle = elements[i];
            curEle.isok = true;
            var curClass = curEle.className;
            for (var k = 0; k < strArray.length; k++) {
                var cur = strArray[k];
                var reg = new RegExp('\\b' + cur + '\\b', 'g');
                if (!reg.test(curClass)) {
                    curEle.isok = false;
                    break;
                }

            }
            if (curEle.isok) {
                ary.push(curEle)
            }
        }
        return ary;
    }

    function hasClass(ele, classStr) {
        var curClassName = ele.className;
        var reg = new RegExp('\\b' + classStr + '\\b', 'g');
        return reg.test(curClassName);
    }

    function addClass(ele, classStr) {
        var curClassAry = classStr.replace(/(^ +| +$)/g, '').split(/ +/g);
        var eleClass = ele.className;
        for (var i = 0; i < curClassAry.length; i++) {
            var reg = new RegExp('\\b' + curClass + '\\b', 'g');
            if (!reg.test(eleClass)) {
                ele.className += ' ' + curClass;
            }
        }
    }

    function removeClass(ele, classStr) {
        var curClassAry = classStr.replace(/(^ +| +$)/g, '').split(/ +/g);
        var eleClass = ele.className;
        for (var i = 0; i < curClassAry.length; i++) {
            var reg = new RegExp('\\b' + curClass + '\\b', 'g');
            eleClass.replace(reg, ' ');
        }
    }


    function getCss(ele, attr) {
        if ('getComputedStyle' in window) {
            var val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = ele.currentStyle['filter'];
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/i;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg1 = /^(-)?\d+(\.\d+)?(px|em|deg|reg|pt|rem)$/;
        if (reg1.test(val)) {
            val = parseInt(val);
        }
        console.log(val + '++++');
        return val
    }



    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style[attr] = val;
            ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        else if (attr == 'float') {
            ele.style['cssFloat'] = val;
            ele.style.styleFloat = val;
            return;
        }
        else {
            var reg = /^(margin|padding|left|right|bottom|top|border|width|height)(Top|Bottom|Left|Right)?$/;
            if (reg.test(attr)) {
                val=parseFloat(val);
                ele.style[attr] = val + 'px';

            } else {

                ele.style[attr] = val;
            }
        }
    }

    function setGroupCss(ele, opations) {
        opations = opations || [];
        if (opations.toString() == '[object Object]') {
            for (var key in opations) {
                setCss(ele, key, opations[key]);
            }
        }

    }

    function css(ele, options, val) {
        if (arguments.length == 2) {
            if (options.toString() == '[object Object]') {
                setGroupCss(ele, options);
            }
            else {
               return getCss(ele, options);
            }
        }
        else {
            setCss(ele, options, val);
        }

    }

    function childs(ele, tag) {
        if ('children' in window) {
            var ary = listToArray(ele.children);
        } else {
            var ary = listToArray(ele.childNodes);
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (cur.nodeType != 1) {
                    ary.splice(i, 1);
                    i--;
                }
            }

        }
        for (var k = 0; k < ary.length; k++) {
            var cur = ary[k];
            if (cur.tagName.toLowerCase() != tag.toLowerCase()) {
                ary.splice(k, 1);
                k--;
            }
        }
        return ary;
    }

    function prev(ele) {
        if ('previousElementSibling' in window) {
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;
        while (pre) {
            if (pre.nodeType == 1) {
                return pre;
            }
            pre = pre.previousSibling;
        }
    }

    function preAll(ele) {
        var ary = [];
        var pre = prev(ele);
        while (pre) {
            ary.unshift(pre);
            pre = prev(pre);
        }
        return ary;

    }

    function next(ele) {
        if ('nextElementSibling' in ele){
            return ele.nextElementSibling;
        }
        var nex = ele.nextSibling;
        while (nex) {
            if (nex.nodeType == 1) {
                return nex;
            }
            nex = nex.nextSibling;
        }
    }

    function nextAll(ele) {
        var ary = [];
        var nex = next(ele);
        while (ele) {
            ary.push(nex);
            nex = next(nex);
        }
        return ary;
    }

    function allSibilings(ele) {
        var nexAll = nextAll(ele);
        var preAll = preAll(ele);
        return preAll.concat(nexAll);
    }

    function firstChild(ele) {
        if ('getComputedStyle' in window) {
            var ary = listToArray(ele.children);
        } else {
            var ary = ele.childNodes;
        }
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            if (cur) {
                if (cur.nodeType == 1) return cur;
            }

        }
    }

    function lastChild(ele) {
        if ('getComputedStyle' in window) {
            var ary = ele.children;
        } else {
            var ary = ele.childNodes;
        }
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (cur.nodeType == 1 && !next(cur)) {
                    return cur;
                }
            }
        }

    }

    function index(ele) {
        return preAll(ele).length;
    }

    function appChild(context, cur) {
        context.appendChild(cur);
    }

    function prepend(context, cur) {
        var ary = context.children;
        if (ary) {
            context.insertBefore(cur, ary[0])
        } else {
            context.appChild(cur);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        var nextSib = oldEle.nextSibling;
        if (nextSib) {
            insertBefore(newEle, nextSib)
        } else {
            oldEle.parentNode.appendChild(newEle);
        }


    }


    window.utils = {
        listToArray: listToArray,
        jsonParse: jsonParse,
        offset: offset,
        win: win,
        getElementsByClass: getElementsByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        childs: childs,
        prev: prev,
        preAll: preAll,
        next: next,
        nextAll: nextAll,
        allSibilings: allSibilings,
        firstChild: firstChild,
        lastChild: lastChild,
        index: index,
        appChild: appChild,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter

    }


})();
