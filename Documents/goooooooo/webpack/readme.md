## purgecss-webpack-plugin 去除多余的css
配合MiniCssExtractPlugin一起在生产环境下使用
### 安裝
```bash
npm install purgecss-webpack-plugin glob -D
```

```js
const PurgecssPlugin = require('purgecss-webpack-plugin');//(第一步)
const glob = require('glob'); // 查找匹配的文件(第二步)
...
plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 创建实例 (第三步)
    new PurgecssPlugin({
      // 配置需解析檔案 (第四步)
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
        nodir: true, // 過濾資料夾結果 (第五步)
      }),
    }),
  ],

  ...
```

## image-webpack-loader 压缩图片
配合file-loader一起使用，压缩解析后图片

### 安裝
主要的套件
```bash
npm install image-webpack-loader -D
```

配套
```bash
npm install file-loader url-loader css-loader mini-css-extract-plugin html-webpack-plugin cross-env -D
```

### 使用

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name].[ext]',
          },
        },
        // 配置 image-webpack-loader (第一步)
        {
          loader: 'image-webpack-loader',
          options: {
            // 只在 production 环境启用压缩(第二步)
            disable: process.env.NODE_ENV === 'production' ? false : true,
            mozjpeg: { // JPEG 转化器
              progressive: true,
              quality: 65,
            },
            optipng: { // png 转化器
              enabled: false, // 表示不啟用這一個圖片转化器
            },
            pngquant: { // png 转化器
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {  // gif 转化器
              interlaced: false,
            },
            webp: {
              quality: 75, // 配置選項表示啟用 WebP 转化器
            },
          },
        },
      ],
    }
  ]
}
```

## 忽略第三方库配置

```js
{
  externals: {
    'jquery': '$'
  }
}
```

## Tree-shaking && Scope-Hoisting && sideEffects

Tree-shaking，是 webpack 自带的属性，只支持ES6 模块, ES6 模块语法import是静态打包。

```js
export const a = 1

export const b = 2
```

### Scope-Hoisting(作用域提升)
Scope Hoisting 是webpack内置的功能，只要配置一个插件即可，如下在webpack.config.js 代码如下配置：

```js
module.exports = {
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

```
考虑到 Scope Hoisting 以来 ES6 模块化语法，而现在很多 npm 包的第三方库还是使用 CommonJS 语法，为了充分发挥 Scope Hoisting 效果，我们可以增加以下 mainFields 配置：

```
const webpack = require('webpack');
module.exports = {    
  // ...    
  resolve: {        // 针对 npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件        
    mainFields: ['jsnext:main', 'browser', 'main']    
    },    
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};

```

假如现在有两个文件分别是 util.js 和入口文件 main.js

```js
// util.js
export default 'Hello,Webpack';
// main.js
import str from './util.js';
console.log(str);
```

以上源码用 Webpack 打包后输出中的部分代码如下：

```js

[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = ('Hello,Webpack');
  })
]
```

在开启 Scope Hoisting 后，同样的源码输出的部分代码如下：

```js
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var util = ('Hello,Webpack');
    console.log(util);
  })
]

```

### sideEffects
通过给 package.json 加入 sideEffects: false 声明该包模块是否包含 sideEffects(副作用)，从而可以为 tree-shaking 提供更大的优化空间。

比如，`import test from './test'`, 但是test在实际开发者并没有用到，如果sideEffects: true ,或者不特殊标记的话，test文件是会被打包到最终的压缩文件中的。

#### 问题
通常我们引用css 的方式是

```js
import '../index.css'
```
为了防止css被当作副作用的代码，sideEffects的配置方式如下

```js
sideEffects: ['**/*.css']  // 如有其他代码一次添加
```









## DllPlugin && DllReferencePlugin

DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。(优化开发中，不打包第三方插件)

* DllPlugin: 将第三方依赖与项目分离，将所有第三方库代码单独打成dll文件，项目每次打包只需要打包本项目代码。
* DllReferencePlugin: 找到项目中所用到的第三方依赖在dll中的位置。

### 用法
第一步：首先我们需要在项目下创建一个单独的打包dll文件的配置文件webpack.dll.config.js
第二步： 接下来需要在webpack.config中使用的manifest
第三步：package.json 中添加打包命令

## 动态加载 
import 语法可以实现动态加载，分割出不同的代码块
原理就是jsonp

## webpack-bundle-analyzer

这个插件的功能是生成代码分析报告，帮助提升代码质量和网站性能。

## optimization

```js 
module.exports = {
  //...
  optimization: {
    minimize: false, // 插件压缩 bundle
    splitChunks: {   // 剥离第三方插件
      chunks: 'async',  // async 支持异步代码分割 initial动态模块优化打包, all 把动态和非动态模块同时进行优化打包
      minSize: 20000, // 超过多少分割
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1, // 模块引用几次分离
      maxAsyncRequests: 30, // 最多几个请求
      maxInitialRequests: 30, // 首屏最多加载几个
      enforceSizeThreshold: 50000,
      cacheGroups: { // 缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

```

dll 和 splitChunks 不要一起使用，splitChunks在生产环境使用，dll在开发环境使用，提高开发环境的打包速度。


## noParse:作用主要是过滤不需要解析的文件，比如打包的时候依赖了三方库

## IgnorePlugin: webpack 种的 IgnorePlugin 在打包时忽略本地化内容，如引入了一个插件，只用到了中文语言包，打包的时候把非中文语言包排除掉

## resolve