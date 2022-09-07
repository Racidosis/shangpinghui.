document.addEventListener('DOMContentLoaded', function() {
  var selectedArr = new Array(goodData.goodsDetail.crumbData.length);
  var productPrice = goodData.goodsDetail.price;
  // 定义全局变量 记录搭配商品的数量//裸机的价格
  Public_exclusive('.asider .tab-title span', 'active', '.asider .tab-item');
  Public_exclusive('.tab .tab-title span', 'active', '.tab .tab-content');
  var length_ = goodData.imgsrc.length;
  // 动态创建index
  for (var i = 0; i < length_; i++) {
    var value = goodData.imgsrc[i].s;
    var li = document.createElement('li');
    li.dataset.index = i;//动态给li插入index标签
    var img = document.createElement('img');
    img.src = value;
    li.appendChild(img);
    $('.thumb .thumb-list ul').append(li)
  }
  var leftbox = $('.thumb span')[0];
  var rightbox = $('.thumb span')[1];
  var count = 0;
  var marght = parseInt(getStyle(li, 'margin-right'));
  var actualmove = marght + img.width;
  $('.thumb ul').css('width', actualmove * length_);
  rightbox.onclick = function() {
    count += 2;
    if (count > 9) { count--; $('.thumb ul').animate({ left: -actualmove * count - 15 }, 1200); return false }
    $('.thumb ul').animate({ left: -actualmove * count - 7 }, 1200)//点击第四下时，走一步

  }
  var str_ = `<span>${goodData.goodsDetail.title}</span
>
<p>
${goodData.goodsDetail.recommend}
</p>
<div class="price-area">
  <div class="price-area-tit">
    <div class="left">
      
      <span>价格</span>
      <div class="p">
        <p id="icon">￥</p><h3 id="priceValue"></h3>
        降价通知
      </div>
    </div>
    <div class="right">累计评论 670000</div>
  </div>
  <div class="price-arrow">
    <span>促销</span> <strong>加价购 </strong>
    <div class="last">
    ${goodData.goodsDetail.promoteSales.content}
    </div>
  </div>
</div>
<p class="last">
  <span>支持</span>  ${goodData.goodsDetail.support}
</p>
<p class="last"><span>配送至 </span>   ${goodData.goodsDetail.address}</p>`;
  var product_price = document.querySelector('.product-price');
  product_price.innerHTML = str_;
  leftbox.onclick = function() {
    count -= 2;
    if (count <= 0) { count = 0; $('.thumb ul').animate({ left: -actualmove * count }, 1200); return }
    if (count === 1) {
      count = 0;
    }
    $('.thumb ul').animate({ left: -actualmove * count - 10 }, 1200)//点击第四下时，走一步
  }
  $(' .zoom .small-zoom').mouseenter(function() {
    $('.shade').css('display', 'block');
    $('.zoom .big-zoom').css('display', 'block');
  })
  // 给小块加移动事件
  $(' .zoom .small-zoom').mousemove(function(event) {
    // console.log(event.offsetX, event.offsetY);//鼠标在小盒子移动的距离
    // console.log(event.pageX, event.pageY);//小盒子距离总页面左上角的距离
    var shade = document.querySelector('.shade')//遮罩盒子
    var left = parseInt(getStyle(shade, 'left'));
    var top = parseInt(getStyle(shade, 'top'));
    //left是遮罩层的的定位距离
    //clientx-offsetx-父级元素盒子距离浏览器的宽度
    var obj = this.getBoundingClientRect()
    //obj.left的距离为小盒子距离页面视口左上角的距离
    var x_ = event.clientX - obj.left - (shade.clientWidth / 2);
    var y_ = event.clientY - obj.top - ((shade.clientHeight / 2));
    //x_,y_
    if (x_ <= 0) { x_ = 0; }
    if (y_ <= 0) { y_ = 0; }
    var maxx_ = shade.parentElement.clientWidth - shade.clientWidth;//最大移动的距离
    if (x_ > maxx_) { x_ = maxx_ }
    if (y_ > maxx_) { y_ = maxx_ }//限制小盒子在大盒子的移动距离
    // 根据shade移动的距离计算出大图片移动的距离
    // 主图移动的距离x_ / 主图能移动的最大距离maxx_ = 大图移动的距离 / 大图能移动的最大距离（大图片的宽度减去大盒子的宽度）
    var big_img = document.querySelector('#big_img');
    var big_zoom = document.querySelector('.zoom .big-zoom')
    var big_maxx = x_ / maxx_ * (big_img.clientWidth - big_zoom.clientWidth)
    var big_maxy = y_ / maxx_ * (big_img.clientHeight - big_zoom.clientHeight)
    big_img.style.transform = 'translate(' + -(big_maxx) + 'px, ' + -(big_maxy) + 'px)';
    // 大图片移动，下图片移动
    shade.style.transform = 'translate(' + (x_) + 'px, ' + (y_) + 'px)';
  })
  $(' .zoom .small-zoom').mouseleave(function() {
    $('.shade').css('display', 'none'); $('.zoom .big-zoom').css('display', 'none');
  })
  var ullist = document.querySelector('.ul-goodslist');
  $('.ul-goodslist li').click(function(item) {
    if (item.target.parentElement.nodeName = "LI") {
      for (var i = 0; i < length_; i++) {
        $('.ul-goodslist li').removeClass('active')
      }
      item.target.parentElement.className = 'active';
      var index__ = item.target.parentElement.dataset.index;
      // goodData.imgsrc[index__].s
      getTag('#sma_img').src = goodData.imgsrc[index__].s;
      getTag('#big_img').src = goodData.imgsrc[index__].b;
    }
  })

  //$('.optionsbox ul').length  //ul的长度，通过ul的长度动态创建盒子，
  // 给ul绑定事件，点击ul则创建一个盒子selected-tag，盒子内容为实际触发对象为ul中的li的文本属性，并将盒子添加到selected-box中
  //点击对应索引删除对应的ul创建的盒子
  $('.optionsbox ul').click(function(ele) {
    // console.log(ele.target.nodeName);
    //点击ul创建盒子，但不追加，点击li后才追加到selected-box中   
    if (ele.target.nodeName === 'LI') {
      //目标元素的文本值 ele.target.innerHTML
      var div = document.createElement('div');
      var span = document.createElement('span')
      span.className = 'close';
      span.innerHTML = 'x';
      div.innerHTML = ele.target.innerHTML;
      div.appendChild(span);
      div.className = 'selected-tag';
      $('#selectedbox').append(div);
      span.onclick = function() {
        span.parentElement.remove();
      }
    }
  })

    ; (function() {
      // 获取相关元素
      var priceBox = document.querySelector('#priceValue');  // 显示价格的元素,降价通知前价格h3
      var optionsBox = document.querySelector('#optionsBox'); // 参数选项的包裹元素//下面选项卡包裹的整体
      var selectedBox = document.querySelector('#selectedBox');   // 选中的标签的包裹元素，选中
      shopcartNumInput = document.querySelector('#shopcartNum');  // 购物车数量输入框
      var plusBtn = document.querySelector('#plusBtn');  // 增加数量的按钮（购物车）
      var minusBtn = document.querySelector('#minusBtn');  // 减少数量的按钮（购物车）
      var checkboxItems = document.querySelectorAll('#chooseProducts input'); // 所有搭配商品的复选框
      var totalNumBox = document.querySelector('#totalNum'); // 已购的商品件数的元素
      var totalPriceBox = document.querySelector('#totalPrice'); // 显示最终总价的元素

      // console.log(selectedArr);
      // 定义全局变量 记录要购买商品的数量

      var collectionNumber = 0;
      // 记录搭配商品的总价格
      var collectionPrice = 0;
      // 设置价格数据
      // priceBox.innerHTML = productPrice;//动态获取主商品价格
      // totalPriceBox.innerHTML = '&yen;' + productPrice;


      // 根据数据，动态创建商品的选项信息
      // 遍历数据
      goodData.goodsDetail.crumbData.forEach(function(option, index) { //crumbData为optionsbox中要自动添加所有内容
        //option整个dl要添加所有属性，及其属性值
        //index为dl对应的索引号
        // 创建 dl 元素
        var dlNode = document.createElement('dl');
        // 给 dl 设置一个自定义属性
        dlNode.dataset.index = index;
        // 创建 dt 元素
        var dtNode = document.createElement('dt');
        // 设置 dt 里面的内容
        dtNode.innerHTML = option.title;//为dl的标题所对应的属性值
        // 把 dt 添加到 dl 中
        dlNode.appendChild(dtNode);
        // 通过遍历数据，每一个dl中动态 创建 dd
        option.data.forEach(function(item, index) {
          // 创建 dd 元素
          //item为data中正在遍历的属性
          //index为对应的索引号
          //给dd创建自定义的属性价格属性
          var ddNode = document.createElement('dd');
          // 如果是每一组中的第一个 dd，默认选中状态
          if (index === 0) {
            ddNode.classList.add('active');
          }
          // 设置 dd 的内容type文字属性
          //changePrice价格属性
          // item.type为data中正在遍历的属性所对应的属性值
          ddNode.innerHTML = item.type;
          // 设置自定义属性，表示该选项的价格变化
          //  item.changePrice为data中正在遍历的属性changePrice所对应的价格
          // console.log(item.changePrice);
          // console.log(index);
          // console.log(ddNode);
          ddNode.dataset.price_ = item.changePrice;
          // 把 dd 添加到 dl 中
          dlNode.appendChild(ddNode);
        });
        // 把 dl 添加到 optionsBox 中
        optionsBox.appendChild(dlNode);
        var dd = $('.product-options dd');
        dd.click(function(item, index) {
          //排他


          // console.log(selectedArr);
          // console.log(item.target.dataset.price_);
          // selectedArr.forEach(function(item) {
          //   // 对选项卡中的选中的元素进行遍历，item为对应的正在遍历的元素
          //   if (item) {//避免当前遍历项为空，则不继续执行
          //     total = item[0].dataset.price_-0;
          //     console.log(total);
          //   }
          // });

          var length_ = item.target.parentElement.querySelectorAll('dd').length;
          //动态获取dd的length，通过for循环清除类名，排他
          for (var i = 0; i < length_; i++) {
            item.target.parentElement.querySelectorAll('dd')[i].className = '';
          }
          $(this).addClass('active');
          //this.parentElement.dataset.index对应父级的索引号
          selectedArr[this.parentElement.dataset.index] = $(this);
          //每次添加前把值清空
          selectedBox.innerHTML = '';
          // selectedArr选项卡中的选中商品的参数
          selectedArr.forEach(function(dditem, ddindex) {
            // console.log(dditem);
            //dditem为每次遍历的对象
            if (dditem) {
              //动态创建div盒子
              var div = document.createElement('div');
              //给div盒子创建样式，添加类名
              div.classList.add('selected-tag');
              //添加内容
              // console.log(dditem);
              div.innerHTML = dditem[0].innerHTML;
              //创建标签span
              var span = document.createElement('span');
              span.classList.add('close');
              span.dataset.index = ddindex;
              span.innerHTML = 'x';
              div.appendChild(span);
              selectedBox.appendChild(div);
              span.onclick = function(ev) {
                ev.target.parentElement.remove();
                selectedArr[ev.target.dataset.index].removeClass('active')
                selectedArr[ev.target.dataset.index] = null;
                renderPrice();
              }
            }
          })
          renderPrice()}
        )
      });

    })();
  // 
  //定义商品价格的联动
  // 
 
  var pricedata = {
    _base: productPrice,//初始的裸机价格
    get base() {
      var total = this._base;//先将初始价格赋值给total
      selectedArr.forEach(function(item) {
        // 对选项卡中的选中的元素进行遍历，item为对应的正在遍历的元素
        if (item) {//避免当前遍历项为空，则不继续执行
          total += item[0].dataset.price_-0;
        }
      });
      total *= this.num;
      return total;
    },
    //商品的数量
    _num:1,//初始的商品数量
    get num() {
      return this._num;
    },//点击加号减号都会修改商品数量，故用set
    set num(n) {//修改时自动调用set
      if (n < 1) {
        n = 1;
      }
      this._num = n;
    },
  }
  renderPrice()//先调用一次初始化赋值（初次渲染价格）
  //后面调用的renderPrice()就是重新赋值价格
  // 每次重新赋值价格（重新渲染价格）
  function renderPrice() {
    $('#priceValue')[0].innerHTML=pricedata.base//粉色框的价格
    $('#masterProductPrice')[0].innerHTML='&yen;'+pricedata.base//选择搭配价格
    // 复选框中没有一个框被选中则，使用下面方法修改属性值

  //6,选择商品的其他信息，动态修改价格
  //6.1找到4个复选框
      // var checks = $('input[type=checkbox]');
  // console.log(checks);
  // 每次点击复选框确认其余的复选框是否为选中状态
  function acquire() {
    var arr = [];
    for (var i = 0; i < 4; i++){
      var flag = $($('input:checkbox')[i]).prop('checked');
      if (flag) {
        var num = ($('input:checkbox')[i].nextElementSibling.innerHTML);
        arr.push(num);
      }
    }
    var sum = 0;
    arr.forEach(function(item, index) {
      sum += item-0;
    })
    var char = $('#masterProductPrice').text().substr(1,);
    total = sum + parseFloat(char);
    console.log(total);
    $('#totalPrice')[0].innerHTML =bool_?total:('&yen;'+pricedata.base)//选择搭配价格
  }
  $('input[type=checkbox]').click(acquire)
    // console.log(acquire());
   //所有复选框的选中状态
    var checks_ = Array.from(document.querySelectorAll('input[type=checkbox]'));
  var bool_=checks_.some(function(el) {
    return el.checked;//some只要有一项为true，则为true
    //只有全为false才为false
  })//bool_为true代表至少有一项的复选框为选中状态
    $('#totalPrice')[0].innerHTML =  $('#masterProductPrice').text().substr(1,);
  }
  // 动态计算商品的价格
  ; (function() {
    //点击加号按钮
    $('#plusBtn').click(function() {
      pricedata.num++;//var 声明的get 、set
      $('#shopcartNum')[0].value = pricedata.num;
      renderPrice();
    })
    //点击减号按钮
    $('#minusBtn').click(function() {
      pricedata.num--;//var 声明的get 、set
      if (pricedata.num < 1) pricedata.num = 1;
      $('#shopcartNum')[0].value = pricedata.num;
      renderPrice();
    })
  })();
  //给加减按钮框的input添加失去焦点属性
  $('#shopcartNum').blur(function() {
    if (!/^\d{1,}$/.test(this.value)) {this.value=1
      ; alert('只能输入数字'); return;
    }
    pricedata.num = this.value;//失去焦点后将失去焦点前购物车的数量赋值给pricedata.num 数量属性
    renderPrice()
  })
})