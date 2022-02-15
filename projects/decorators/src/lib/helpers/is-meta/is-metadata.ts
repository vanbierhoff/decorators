import {INSTANCE_META} from "../../config/meta-config/meta-config";


export function isMetadata<T>(instance: T): boolean {
  if (typeof instance === 'function' || (typeof instance === 'object')) {
    if (instance?.constructor) {
      if (Reflect.getMetadata(INSTANCE_META, instance.constructor)) {
        return true;
      }
    }
    if (Reflect.getMetadata(INSTANCE_META, instance)) {
      return true;
    }
  }
  return false;
}
