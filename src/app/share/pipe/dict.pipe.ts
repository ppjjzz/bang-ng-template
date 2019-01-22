import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dict'
})
export class DictPipe implements PipeTransform {

  transform(value: string | number, args?: {dict: any[], key: string | number, value: any}): any {
    for (const i of args.dict) {
      if (i[args.key] === value) {
        return i[args.value];
      }
    }
    return null;
  }

}
