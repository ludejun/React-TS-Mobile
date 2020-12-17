## 移动端React脚手架项目

使用技术栈：
React + React-Keeper + webpack + typescript + mock + eslint + prettier + fetch

在PC端的基础上去除了Redux和Rematch，移动端对公共状态管理的需求不强烈，对加载性能要求高。并可以适当在webpack的entry中加上JS代码拆分。

**生产打包：cached包是不太会变的包，做长期缓存或者放到APP本地，react、react-dom、@babel/polyfill 不要随意升级**

兼容本地Mock和Mock Server两种mock方式。本地Mock使用根目录的mock文件夹，按照示例编写即可。MockServer通过src/config/index进行MockServer URL和白名单控制，通过yarn start:mock来进行本地Mock开发调试。

路由使用React-Keeper，添加路由跳转缓存的方法，在后退或者跳转到缓存页时使用之前的页面状态。更多方法介绍：https://github.com/lanistor/react-keeper

#### 项目命令行

- 安装项目：`yarn install`

- 启动开发环境：`yarn start`

  Runs the app in the development mode.<br />
  Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

- 启动开发环境并查看包体积分布：`yarn start:size`

- 生产打包：`yarn build`

  打包内容在release文件夹中



#### 特性

1. 最新的react框架，自由使用class或者hooks；
2. 使用最新webpack作为打包，区分开发/测试/内测/生产环境；集成热加载，提高开发测试效率；
3. 开发/生产环境集成包体积命令行，准确了解各包体积大小及组成，杜绝大依赖包引入（如禁止lodash、moment引入生产）；
4. 静态资源分常变更和不常变更类型，变更资源name上添加hash，自动更新html引入；
5. 使用eslint+prettier组合规范前端代码，统一各项目代码格式，自动修改代码到规范配置；
6. 将代码规范强制绑定git commit，提交代码前自动校验并修复代码规范，不规范代码不能提交；
7. 使用mockjs作为前端本地API mock工具，自动在开发模式下，无代码侵入代理前端代码发出的XMLHttpRequest请求;
8. 集成typescript，提高前端代码质量，在编译模式发现更多可能bug；
10. 使用fetch作为ajax库，api各环节高度配置化；
11. 丰富的路由、组件、同步action、异步action、reducer、请求处理、基础函数等示例，可以直接参考上手开发。





#### 参考文档

[react-keeper使用](https://github.com/lanistor/react-keeper)

[fetch使用](https://github.github.io/fetch/)

[MockJS示例](http://mockjs.com/examples.html)

[YApi官网](https://yapi.baidu.com/doc/index.html) [github](https://github.com/ymfe/yapi)

