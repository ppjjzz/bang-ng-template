import { Pipe, PipeTransform } from '@angular/core';

/**
 * 给字符加上修饰符
 * 可选值money | percent | toThousands
 * money: 在字符串前面加上$
 * percent: 在字符串后面加上%
 * toThousands: 将数字格式为每3位中间加逗号, 如100,000,000
 * 该pipe的参数必须传入一个数组
 * 当多个修饰符叠加时,toThousands必须为数组的第一位
 */

type Modify = 'money' | 'percent' | 'toThousands';

@Pipe({
  name: 'modify'
})
export class ModifyPipe implements PipeTransform {

  transform(value: string | number, args?: Modify[]): any {
    if (value === null || value === undefined) {
      return null;
    }

    let newValue = value;
    if (args && args.length) {
      args.forEach(x => {
        switch (x) {
          case 'money':
            newValue = '$' + newValue;
            break;
          case 'percent':
            newValue = newValue + '%';
            break;
          case 'toThousands':
            const arr = String(newValue).split('.');
            let str = (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            if (arr[1]) {
              str = str + '.' + arr[1];
            }
            newValue = str;
            break;
        }
      });
    }
    return newValue;
  }

}
