## bang-ng-template项目介绍

- 结合棒谷OA研发中心开发angular项目需要,配置了一套快速建立项目的脚手架模板。

- 该模板根据前端工程化的思想,已经规划好了各功能目录并配备详细的开发规范文档,便于各组前端开发人员写出风格统一且易维护的代码

- 该模板预设了一些扩展和优化,做到开箱即用

- Angular版本 5.2.5, Angular-cli版本1.7.0

- CSS预处理器默认SCSS

- [GitHub地址](https://github.com/2070255/bang-ng-template)


## 项目目录结构

项目目录:
```
.
├── README.md            //项目README文档
├── docs                 //项目开发规范文档
│   ├── code_specs.md
│   └── index.md
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json         //项目依赖和npm脚本配置
├── protractor.conf.js
├── proxy.conf.json      //配置开发环境的反向代理
├── src
│   ├── app              //应用代码
│   ├── assets           //存放静态资源目录,如图片、字体图标
│   ├── environments     //配置环境变量相关
│   ├── favicon.ico      //网页logo
│   ├── index.html       //主页html
│   ├── main.ts          //应用入口
│   ├── ngsw-config.json //Service Worker配置文件
│   ├── polyfills.ts     //填充库
│   ├── styles           //全局样式库相关
│   ├── styles.scss      //全局样式文件入口
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json       //ts配置
└── tslint.json         //tslint配置
```

app目录:
```
.
├── api                     //应用API统一存放目录
├── app-routing.module.ts   //根路由模块
├── app.component.ts        //根组件
├── app.module.ts           //根模块
├── core                    //核心模块目录
│   ├── core.contants.ts
│   ├── core.module.ts
│   ├── core.service.ts     //核心服务
│   ├── net                 //http请求相关配置和扩展
│   ├── router              //路由预加载,路由守卫配置
│   └── readme.md
├── share                   //共享模块目录
│   ├── README.md
│   └── share.module.ts
├── utils                   //工具类相关
└── view                    //视图相关目录
    ├── layout              //布局类的容器型组件目录
    └── routes              //应用子路由组件
```
- 核心模块：核心模块封装了http请求类、拦截器，等核心服务；
- 共享模块：共享的模块，一般放一些共享的模块如指令,组件等等；
- 工具类：常用工具类抽象，如dom操作，js语言扩展，web扩展等等；
- 视图层：抽象出通用布局组件如dialog放置在layout供所有路由页面共享,routes放置各子路由页面

## 脚手架配置优化

### 路径简称

- 对常用路径做了简称处理,方便快速书写引入路径,配置项参考根目录tsconfig.json

```
"paths": {
      "@share": [ "app/share" ],
      "@share/*": [ "app/share/*" ],
      "@core": [ "app/core/" ],
      "@core/*": [ "app/core/*" ],
      "@api": [ "app/api/" ],
      "@api/*": [ "app/api/*" ],
      "@utils": [ "app/utils/" ],
      "@utils/*": [ "app/utils/*" ],
      "@env": [ "environments/" ],
      "@env/*": [ "environments/*" ]
    }
```

示例
```
// src/app/api/user.service.ts
import { ApiService } from '@core/net/api.service';
```

### 反向代理

- 本地开发环境需配置反向代理将脚手架服务器的API请求转发到后台服务器地址,配置项参考根目录proxy.conf.json


示例
```
{
    "/api": {     //配置拦截规则，该示例表示所有/api开头的请求都会被转发
      "target": "http://localhost:4200",  //转发到后台接口域名和端口
      "secure": false,
      "header": {
          "cookie": ""  //请求携带的cookie,一般为cas登录相关的token
      },
      "pathRewrite": { //转发到后台服务器后的请求路径重写
        "^/api": ""
      },
      "changeOrigin": true
    }
  }
```

### 环境变量

- 环境变量配置文件配置目录为*src/app/environments*
- 共配置了3套环境，可根据各项目组需求增减。environment为默认本地开发环境, test为测试环境, prod为生产环境

### 缓存及加载策略优化

- *index.html*做了强制不缓存处理,解决项目更新迭代时需要用户浏览器手动清缓存才能获取最新静态文件的问题
- 在任意一个路由页面加载后的5秒后浏览器自动请求剩余路由模块js,方便浏览器请求其他路由页面时读取已缓存的模块立即渲染。相关配置参考*src/app/core/router/preload-routers.service.ts*
- 打包环境为*prod*时默认注册Service Worker

## Angular项目开发规范
- [开发规范](./code_specs.md)
