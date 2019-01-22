import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapping'
})
export class MappingPipe implements PipeTransform {

  transform(value: string | number | boolean, args?: any): any {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw Error('mapping只能应用于string, number, boolean');
    }
    if (typeof args !== 'object') {
      throw Error('mapping的参数应为对象或数组');
    }
    if (typeof value === 'boolean') {
      if (value) {
        return args[0];
      }
      return args[1];
    } else if (typeof value === 'number' || typeof value === 'string') {
      return args[value];
    }
    return null;
  }

}
