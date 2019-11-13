function getstyle(obj, name) {
  if (obj.currentstyle) {
    return obj.currentstyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}
var timer = null;
function remove(obj, attr, itarget) {
  //obj:(html如：div) attr属性， itarget： 目标值

  clearInterval(obj.timer);

  obj.timer = setInterval(function() {
    var curr = 0; //物体自身高度
    if (attr == "opacity") {
      curr = Math.round(parseFloat(getstyle(obj, attr)) * 100); //parseFloat为适应透明度
    } else {
      curr = parseInt(getstyle(obj, attr)); //移动的宽，高度等,相当于offsetHight
    }
    var speed = (itarget - curr) / 6;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    if (curr == itarget) {
      clearInterval(obj.timer);
    } else {
      if (attr == "opacity") {
        //为适应透明度
        obj.style.filter = "alpha(opacity:" + (curr + speed) + ")";
        obj.style.opacity = (curr + speed) / 100;
      } else {
        obj.style[attr] = curr + speed + "px";
      }
    }
  }, 30);
}
