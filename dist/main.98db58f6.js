// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x); //转化为对象

//声明hashMap并设置保底为后面读取localStorage的hashMap做准备
var hashMap = xObject || [{ logo: "Z", url: "https://zhihu.com" }, {
  logo: "B",
  url: "https://bilibili.com"
}, { logo: "J", url: "https://juejin.cn" }, { logo: "G", url: "https://github.com" }, { logo: "I", url: "https://iconfont.cn" }, { logo: "F", url: "https://figma.com" }];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //用空字符串代替https://或http://或www.并删除以/开头的内容
};
var render = function render() {
  $siteList.find("li:not(.last)").remove(); //删除以前的li，重新渲染新的hashMap，但不能删除最后一个增加按钮
  //遍历hashmap并渲染
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">" + node.logo + "</div>\n            <div class=\"link\">" + simplifyUrl(node.url) + "</div>\n            <div class=\"close\">\n             <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n             </svg>\n            </div> \n        </div>\n  </li>\n  ").insertBefore($lastLi);
    $li.on("click", function () {
      //点击时打开一个新窗口,相当于a标签
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //阻止冒泡，作用是不告诉a标签该icon被点击时触发链接
      hashMap.splice(index, 1); //从index这里删，删一个
      render();
    });
  });
};

render(); //初始界面先render
//对.addButton设置一个事件监听
$(".addButton").on("click", function () {
  var url = window.prompt("请问你要添加的网址是什么"); //用prompt这个全局方法来问用户
  if (url.indexOf("http") !== 0) {
    // alert("请输入http开头的网址");//提醒用户输入http开头的
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url }); //在hashMap里面新增用户输入的网址,并让输入网址的第一个字符大写
  render(); //新增完以后，再执行渲染hashMap的函数render
});
//在用户关闭页面之前监听，关闭页面时会把当前的hashMap存到x里面
window.onbeforeunload = function () {
  //localStorage只能存储字符串，所以先把hashMap转化为字符串,运用到的API是 JSON.stringify()
  var string = JSON.stringify(hashMap);
  //localStorage是个全局变量
  localStorage.setItem("x", string); //在本地的存储里面设置一个x，里面存放这个字符串
};

//键盘监听事件
$(document).on("keypress", function (e) {
  var key = e.key;

  console.log(key);
  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.98db58f6.map