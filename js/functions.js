// 函数库

/**
 * 获取元素的计算属性
 * @param Elment ele 元素
 * @param String attr css属性名
 * @param String 计算属性值
 *///ele元素不要加style，attr就加属性名如left
function getStyle(ele, attr) {
  if (window.getComputedStyle) {
    return getComputedStyle(ele)[attr];
  } else {
    return ele.currentStyle[attr];
  }
}


/**
 * 封装函数，实现选项卡效果
 * @params tabBtns NodeList 选项卡按钮的集合 
 * @params tabItems NodeList 选项卡选项的集合
 * @params activeClass  string 选中之后要添加的类名  默认值 active
 */
function tab(tabBtns, tabItems, activeClass = 'active') {
  // 遍历所有的选项卡按钮
  tabBtns.forEach(function(tabBtn, index) {
    // 给每个按钮监听 click 事件
    tabBtn.addEventListener('click', function() {
      // 排他第一步 所有的按钮以及选项去掉 active 类
      tabBtns.forEach(function(item, itemIndex) {
        item.classList.remove(activeClass); // 去掉所有按钮的 active 类
        tabItems[itemIndex].classList.remove(activeClass);  // 去掉所有选项的 active 类型
      });
      // 排他第二步 当前点击的按钮和对应的选项，添加 active 类型
      tabBtn.classList.add(activeClass);
      tabItems[index].classList.add(activeClass);
    });
  });
};
// ele为目标触发元素
// clas为切换新增类名
// ele_exclusive选项卡长度
function Public_exclusive(ele, clas, ele_exclusive) {
  $(ele).click(function() {
    $(ele).removeClass(clas);
    $(this).addClass(clas);
    $(ele_exclusive).removeClass(clas);
    var length_ = $(ele_exclusive).length;
    for (var i = 0; i < length_; i++) {
      $(ele_exclusive)[i].style.display = 'none';
    }
    $(ele_exclusive)[$(this).index()].style.display = 'block';
  })
}
function getTag(str) {
  return document.querySelector(str);
}
function getTags(str) {
  return document.querySelectorAll(str);
}