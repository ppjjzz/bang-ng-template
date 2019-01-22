# MappingPipe

## 管道作用

- 处理原始数据到视图上的映射

## 指令用法

```
{{ 1 | mapping: ['未支付', '已支付']}}
{{ true | mapping: ['是', '否'] }}
{{ global | mapping: {global: '全球', city: '城市'} }}
```
- 视图会映射为对应的值

## 注意事项

- mapping只能应用于string, number, boolean
- mapping的参数应为对象或数组