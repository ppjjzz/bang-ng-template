# NgShowDirective

## 指令作用

- 控制宿主元素的css的display属性显示和隐藏

## 指令用法

```
<p [ngShow]="true">test</p>
```
- 当传入的变量值不严格相等为true时显示元素, 为false时隐藏元素

## 注意事项

- 该指令只允许用于原生HTML元素和组件上, 不可用于如`<ng-template>`或`<ng-content>`上