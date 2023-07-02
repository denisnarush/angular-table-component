import isEqual from 'lodash-es/isEqual';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getValueByPath' })
export class GetValueByPathPipe implements PipeTransform {
  transform(object: any, keys: string | string[]): null | string {
    keys = Array.isArray(keys) ? keys : keys.split('.');
    object = object[keys[0]] ?? null;
    if (object && keys.length > 1) {
      return this.transform(object, keys.slice(1));
    }
    return object == null ? null : `${object}`;
  }
}

@Pipe({ name: 'getMapValueByKey' })
export class GetMapValueByKeyPipe implements PipeTransform {
  transform(value: Map<any, any>, key: any): any {
    for (const vkey of value.keys()) {
      if (isEqual(vkey, key)) {
        return value.get(vkey);
      }
    }
  }
}
