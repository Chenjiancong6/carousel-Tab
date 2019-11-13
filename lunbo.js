window.onload = function() {
  function getbystyle(aparent, aclass) {
    //getbystyle()函数为：获取一个标签（如div）中class属性的值
    var aEle = aparent.getElementsByTagName("*"); //返回带有指定标签名的对象的集合
    var oreasult = [];
    for (var i = 0; i < aEle.length; i++) {
      if (aEle[i].className == aclass) {
        oreasult.push(aEle[i]);
      }
    }
    return oreasult;
  }
  var nowzindex = 2; //z-index
  var now = 0;

  var odiv = document.getElementById("playimages");
  var oprev = getbystyle(odiv, "prev")[0];
  var onext = getbystyle(odiv, "next")[0];
  var omarkleft = getbystyle(odiv, "mark_left")[0];
  var omarkright = getbystyle(odiv, "mark_right")[0];

  var smallpic = getbystyle(odiv, "small_pic")[0];
  var smallul = smallpic.getElementsByTagName("ul")[0];
  var smallli = smallpic.getElementsByTagName("li");

  var bigpic = getbystyle(odiv, "big_pic")[0];
  var bigli = bigpic.getElementsByTagName("li");

  //小图的长度(长度*宽度)
  ////这条语法一定要放在DOM元素的后面才起作用！！！！！
  smallul.style.width = smallli.length * smallli[0].offsetWidth + "px";

  ////左右按钮切换图片
  oprev.onclick = function() {
    now--;
    if (now == -1) {
      now = smallli.length - 1;
    }
    tab();
  };
  onext.onclick = function() {
    now++;
    if (now == smallli.length) {
      now = 0; ///now==0是错误的！！！！！
    }
    tab();
  };

  //左按键
  oprev.onmouseover = omarkleft.onmouseover = function() {
    remove(oprev, "opacity", 100);
  };
  oprev.onmouseout = omarkleft.onmouseout = function() {
    remove(oprev, "opacity", 0);
  };
  //右按键
  onext.onmouseover = omarkright.onmouseover = function() {
    remove(onext, "opacity", 100);
  };
  onext.onmouseout = omarkright.onmouseout = function() {
    remove(onext, "opacity", 0);
  };

  /////小图切换成大图

  for (var i = 0; i < smallli.length; i++) {
    //点击小图切换成大图
    smallli[i].index = i;
    smallli[i].onclick = function() {
      if (this.index == now) return;
      ///此时的 now为正在播放那张图片的值
      now = this.index;
      tab(); ///调用函数
    };

    //小图透明度淡入淡出
    smallli[i].onmouseover = function() {
      remove(this, "opacity", 100);
    };
    smallli[i].onmouseout = function() {
      if (this.index != now) {
        remove(this, "opacity", 60);
      }
    };
  }

  //tab()函数,切换成大图

  function tab() {
    bigli[now].style.zIndex = nowzindex++; ////zIndex一定要大写！！！！！！
    //////////zIndex一定要大写才有效！！！！！
    //now 已经在now = this.index 中改变now的值

    console.log(bigli[now].style.zIndex); //测试nowzindex的值在一直递增

    for (var i = 0; i < smallli.length; i++) {
      remove(smallli[i], "opacity", 60);
    }
    remove(smallli[now], "opacity", 100);

    ///图片翻转
    bigli[now].style.height = 0;
    remove(bigli[now], "height", 320);

    //最后一张图片和第一张图片
    if (now == 0) {
      remove(smallul, "left", 0);
    } else if (now == smallli.length - 1) {
      remove(smallul, "left", -(now - 2) * smallli[0].offsetWidth);
    } else {
      remove(smallul, "left", -(now - 1) * smallli[0].offsetWidth);
    }
  }

  //自动播放与暂停
  var timer = setInterval(onext.onclick, 2000);
  //////
  odiv.onmouseover = function() {
    clearInterval(timer);
  };
  /////////////////
  odiv.onmouseout = function() {
    timer = setInterval(onext.onclick, 2000);
  };
};
