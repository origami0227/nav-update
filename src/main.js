const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //转化为对象
const $input = $(".input");

//声明hashMap并设置保底为后面读取localStorage的hashMap做准备
const hashMap = xObject || [
  { logo: "Z", url: "https://zhihu.com" },
  {
    logo: "B",
    url: "https://bilibili.com",
  },
  { logo: "J", url: "https://juejin.cn" },
  { logo: "G", url: "https://github.com" },
  { logo: "I", url: "https://iconfont.cn" },
  { logo: "F", url: "https://figma.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //用空字符串代替https://或http://或www.并删除以/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove(); //删除以前的li，重新渲染新的hashMap，但不能删除最后一个增加按钮
  //遍历hashmap并渲染
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
             <svg class="icon">
              <use xlink:href="#icon-close"></use>
             </svg>
            </div> 
        </div>
  </li>
  `).insertBefore($lastLi);
    $li.on("click", () => {
      //点击时打开一个新窗口,相当于a标签
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡，作用是不告诉a标签该icon被点击时触发链接
      hashMap.splice(index, 1); //从index这里删，删一个
      render();
    });
  });
};

render(); //初始界面先render
//对.addButton设置一个事件监听
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么"); //用prompt这个全局方法来问用户
  if (url.indexOf("http") !== 0) {
    // alert("请输入http开头的网址");//提醒用户输入http开头的
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url }); //在hashMap里面新增用户输入的网址,并让输入网址的第一个字符大写
  render(); //新增完以后，再执行渲染hashMap的函数render
});
//在用户关闭页面之前监听，关闭页面时会把当前的hashMap存到x里面
window.onbeforeunload = () => {
  //localStorage只能存储字符串，所以先把hashMap转化为字符串,运用到的API是 JSON.stringify()
  const string = JSON.stringify(hashMap);
  //localStorage是个全局变量
  localStorage.setItem("x", string); //在本地的存储里面设置一个x，里面存放这个字符串
};

//键盘监听事件
$(document).on("keypress", (e) => {
  const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
$input.on("keypress", (e) => {
  console.log("运行"); //键盘事件在输入框中输入也会导致跳转，所以需要加入一个阻止冒泡的操作
  e.stopPropagation();
});
