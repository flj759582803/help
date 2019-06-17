搭建vue项目（环境搭建）详细版

vue-cli  vue的项目手脚架（可快速创建vue项目）

1. 全局安装 vue-cli
    npm install --global vue-cli

2. 创建一个基于 webpack 模板的新项目
   vue init webpack my-project

   会出现  （可看附图）
   
   ![images](https://github.com/flj759582803/help/blob/master/image/vue.png)
   
             Project name (vue-test) 直接回车默认
	         Project description (A Vue.js project) 直接回车默认
             Author 直接回车默认   
             Vue build 默认回车
	         install vue-roeter（vue路由器）  Y
	         Use ESLint to lint your code？ N
             是否需要跟ESLint 关联你的代码（ESLint是一个QA工具，用来避免低级错误和统一代码的风格）	
	         关于代码规范，每一句代码相对于它的上一级，需要空两格；方法名与括号需要空一格，括号接{也需要空一格
	     
	        setup unit tests with karma + mocha?No(单元测试不需要) 
            setup e2e tests with Nightwatch?No(单元测试不需要)
	

3. 安装依赖，

 3.1  cd my-project 打开终端  cd（你的项目名称）
  
 3.2  npm install 安装项目依赖 

 安装 vue 路由模块vue-router和网络请求模块vue-resource –save-dev 是你开发时候依赖的东西，–save 是你发布之后还依赖的东西 
 安装 vue 路由模块vue-router和网络请求模块vue-resource
 3.3npm install vue-router vue-resource –save
 cnpm install vue-router vue-resource --save


3.4  npm run dev  启动项目
启动项目之后如果浏览器打开之后，没有加载出页面，有可能是本地的 8080 端口被占用，需要修改一下配置文件 config>index.js
    assetsPublicPath: '/',  打包之后将 '/' 改成 './'
另外还将 build 的路径前缀修改为 ' ./ '（原本为 ' / '），是因为打包之后，外部引入 js 和 css 文件时，如果路径以 ' / ' 开头，
在本地是无法找到对应文件的（服务器上没问题）。所以如果需要在本地打开打包后的文件，就得修改文件路径


3.5  npm run build  打包上线
打包完成后，会生成 dist 文件夹，如果已经修改了文件路径，可以直接打开本地文件查看

项目上线时，只需要将 dist 文件夹放到服务器就行了



升级npm（使用淘宝镜像速度快，不翻墙也可以用）
npm -g install npm@3.0.0  --registry=https://registry.npm.taobao.org



搭建vue项目（环境搭建）简洁版
1.npm install -g cnpm --registry=https://registry.npm.taobao.org     安装淘宝镜像cnpm
因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队来做这件事情，
cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。

2.cnpm install --global vue-cli    全局安装 vue-cli（项目手脚架）下一次即可

3.vue init webpack vue-demo     创建一个基于 webpack 模板的新项目（这样一步之后会在C盘用户-用户名下多一个vue-demo项目）
  

4. cd vue-demo   打开终端
   cnpm install  安装项目依赖 （这一步之后项目里会多node_modules文件夹）
	
5. cnpm install vue-router vue-resource --save  安装 vue 路由模块vue-router和网络请求模块vue-resource
  
6. npm run dev  启动项目  （会自动弹出vue的页面，或者手动输入）

7. npm run build  打包上线

 启动项目时 cd vue-demo  打开终端 npm run dev 启动项目 后会自动弹出vue的页面，或者输入localhost:8080


