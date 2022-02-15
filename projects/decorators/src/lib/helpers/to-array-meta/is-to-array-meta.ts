import {TO_ARRAY_BY_ROLE} from "../../config/meta-config/meta-config";


export function isToArrayMetadata<T>(instance: any): boolean {
  if (typeof instance === 'function' || (typeof instance === 'object')) {
    if (instance?.constructor) {
      if (Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor)) {
        return true;
      }
    }
    if (Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance)) {
      return true;
    }
  }
  return false;
}
