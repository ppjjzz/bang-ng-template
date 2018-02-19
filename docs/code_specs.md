
# bang-ng-template开发规范

代码约束采用tslint来规范；配置在tslint.json，为了保证所有业务组开发采用同一套规范，不要去修改它；

另外，务必遵循以下规范：

## 命名规范

### 文件夹命名

- 采用中划线命名方式，如文件夹`select－box`;

### 文件命名

- 文件命名分不同种类，在angular的项目中有：模块|module、服务|service、组件|component、指令|directive、管道|pipe、守卫|guard、枚举|enum;

这些种类的文件的命名，必须将它的类型作为后缀，如一个组件button,那么组件文件名应该为`ant-button.component.ts`，模板文件名：`ant-button.component.html`，样式同样如此命名，如果是scss文件：`ant-button.component.scss`

注：可以使用ng脚手架提供的生成器生成文件，如在终端输入：ng g c ant-button --flat=true;它将自动在你当前执行命令的目录生成组件类型的文件集；推荐VS Code插件*Angular Files*可以直接鼠标右键生成组件或模块

### 组件和指令selector命名

- 组件采用中划线命名方式，如`com-botton`，组件的selector名称前缀，默认提供四种：app|layout|page|com;
	1. app整个应用的组件，在根模块使用；
	2. layout，用于自定义布局的组件，命名如: layout-container；
	3. page，用于路由页面 page-login；(注：一般子路由页面的selector可省略)
	4. com，用于普通的业务组件  如 com-sail-list、com-sailed;

- 指令采用驼峰命名方式，如: `ngShow`

- 如果需要增加其他种类，可以在tslint.json的directive-selector、component-selector新增规范，但是不要太多，避免五花八门的命名导致模版很难阅读；

### 命名空间

- 各组前端开发需同组员共同制定一份js变量和css类名命名空间规范，如鼠标悬浮时的应用的类名统一为`is_hover`等等。便于后期维护和避免命名冲突，使代码看起来风格统一。


## 代码规范

**推荐使用VS Code进行编码，语法多使用ES6**

### TSLint检查
- 必须启用TSLint进行代码风格规范检查，保证代码简洁和风格统一，减少出bug的几率

### Typescript类型检查
- 所有函数方法和类方法传入的参数定义时必须写明类型，便于IDE做类型检查和提示
- 所有类定义的属性如果初始化时未赋值则必须指明类型，如`private fullUrl: string;`
- IDE提示类型出错时要去找原因，少用any类型进行断言处理

### 变量声明
- 禁用var进行变量声明，改用let和const声明变量和常量，除非有需要用到变量提升的特性
- 变量必须先声明后使用，常量声明时必须赋值
- 变量命名采用驼峰命名方式，命名尽量简短且语义明确
- 对于声明后不再重新赋值的变量需改成const常量声明
- 需导出的常量命名使用大写字母，使用下划线分割，如：`export const ENVIRONMENT = environment;`

### 类公开，私有和静态的属性和方法声明
- 公开属性和方法不用特别声明，ts已默认
- 只供类内部调用的方法和属性需声明为私有如`private fullUrl: string;`，可以避免注入到组件内被调用或赋值
- 不需要实例化的类的属性和方法需声明为静态属性

### 代码注释
- 类方法和函数必须写注释，说明方法的作用，参数类型等等，如：
```ts
/**
 *  深拷贝工具
 * @param obj 深拷贝对象或数组
 */
export const deepClone = (obj: object | any[] = {}) => {
   return JSON.parse(JSON.stringify(obj));
};
```
- API请求的参数字段必须写注释说明作用和类型及是否必传
- 对关键性的步骤或者注意事项需写注释说明

### 异常处理
- 对于运行时易出错的代码块需做`try catch`的异常处理，如API请求
- 程序运行时出现异常后必须取消组件的loading状态并按需求给出相应的友好提示

## 程序规范

### 引用模块规范
- 引入第三方的模块时，angular模块放置于前面，后面依次是其他的依赖模块；本项目的其他依赖的引入放置于最后面
- Rxjs的操作符统一从`rxjs/operators`引入，如`import { tap, mergeMap, finalize, catchError } from 'rxjs/operators';`，使用时用`pipe()`操作符进行连接如`Observable.create(obs => obs.next(true)).pipe(delay(5000), switchMap(() => fn()));`
- 避免在同个文件内重复引入或重复声明同一模块
- 避免引入angular官方已经声明未来会废弃的模块，需引入官方推荐的新模块代替

### 组件类书写规范
- class名一律为大驼峰式，如`DashboardComponent`
- 三行以内的html模板写在组件文件内, 多于的需单独出html模板文件
- 类成员书写顺序
1. 组件的输入属性和输出属性如`@Iutput() tabTitle`（注：需将装饰器和被装饰的属性写在同一行）
2. 类属性成员
3. `constructor`类构造器
4. 组件生命周期方法
5. 自己定义的组件方法

- 坚持先放公共成员，再放私有成员。
- 要实现一个组件的生命周期方法必须在组件类声明相应的接口

完整示例：

```ts
/* 先引入angular内置模块 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/* 再引入内置第三方模块 */
import { Observable } from 'rxjs/Observable';
/* 最后引入自己定义的模块或服务 */
import { ApiService } from '@core/net/api.service';


@Component({
  selector: 'com-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() size: number; /* 初始化未赋值的属性需声明类型 */
  @Output() sizeChange = new EventEmitter<number>();
  countAll = 0; /* 公共成员无需声明public */
  private count: number; /* 先放公共成员再放私有成员 */
  constructor(private apiServ: ApiService) { }

  ngOnInit() {
  }
  /* 先写生命周期方法再写组件自定义的方法 */
  addAll() {
    Observable.create(obser => obser.next(true));
    this.countAll++;
  }
  private add() {
    this.size = this.size + 1;
    this.sizeChange.emit(this.size);
  }
}

```

### API调用规范
- 应用中所有API调用服务需全部放在*app/api*中同一管理和调用
- API服务只能注入到容器型组件对应的服务中然后获取数据输入到展示型组件中，使展示型组件与数据解耦
- API调用异常回调处理函数必须定义
- 对于API必传字段需定义默认值
- API获取的数据处理逻辑需定义在组件对应的服务里，组件只负责视图交互相关逻辑

### 组件通信规范
- 坚持组件的单向数据流，使组件间互相解耦，提高组件复用率
- 不允许在一个组件内部直接调用其他组件的方法或读取其他组件的内部数据
- 非父子组件间通信可以通过父模块的事件总线服务统一调度，避免出现混乱的数据流
