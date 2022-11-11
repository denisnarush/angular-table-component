import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getValueByPath' })
export class GetValueByPathPipe implements PipeTransform {
  transform(object: any, keys: string | string[]): null | string {
    keys = Array.isArray(keys) ? keys : keys.split('.');
    object = object[keys[0]];
    if (object && keys.length > 1) {
      return this.transform(object, keys.slice(1));
    }
    return object == null ? null : `${object}`;
  }
}
