import {RoleMetaInterface} from "../decorators/role";
import {ROLE_META, TO_ARRAY_BY_ROLE} from "../config/meta-config/meta-config";
import {isMetadata, isToArrayMetadata} from "../helpers";
import {ArrayByRoleInterface} from "../decorators/to-array-by-role";



// Creates entities taking into account the role decorator (fields that cannot be accessed will not be included in the created entity)
export class InstanceFactoryByRoles {

  constructor() {
  }

  static getInstanceByRole<T extends object, R = T>(instance: T, userRoles: string[]): any {

    const rolesMetadata: RoleMetaInterface<T>[] = Reflect.getMetadata(ROLE_META, instance.constructor);

    if (isToArrayMetadata(instance)) {
      InstanceFactoryByRoles.toArrayByRole<T>(Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor), instance, userRoles);
    }
    if (isMetadata(instance)) {
      return InstanceFactoryByRoles.createInstance<T>(rolesMetadata, instance, userRoles);
    }
    console.error('Instance doesn\'t have meta  decorator');
  }

  static createInstance<T extends object>(rolesMetadata: RoleMetaInterface<T>[], instance: T, userRoles: string[]): T {
    rolesMetadata.forEach(role => {
      const key: any = role.name;

      if (isMetadata(instance[key])) {
        instance[key] = this.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor),
          instance[key], userRoles) || null;
        return;
      }
      if (Array.isArray(rolesMetadata)) {
        // searching first coincidence of roles in arrays.
        if (role.roles.some(roleName => userRoles.some(roleUser => roleName === roleUser))) {
          instance[key] = instance[key] || null;
          return;
        }
      }
      delete instance[key];
    });

    return instance as T;
  }

  static toArrayByRole<T extends object>(instanceMeta: ArrayByRoleInterface[], instance: T, userRoles: string[]): T {
    instanceMeta.forEach(item => {
      if (isMetadata(item.instance)) {
        if (item.parentField) {
          instance[item.propertyKey][item.parentField] = this.createArrayInstance<T>(Reflect.getMetadata(ROLE_META,
            item.instance), new item.instance(), userRoles);
          return;
        }
        instance[item.propertyKey] = this.createArrayInstance<T>(Reflect.getMetadata(ROLE_META,
          item.instance), new item.instance(), userRoles);
      }
    });
    return instance;
  }

  static createArrayInstance<T>(rolesMetadata: RoleMetaInterface<T>[], instance: T, userRoles: string[]): Array<T> {
    const arrayInstance: Array<T> = [];
    rolesMetadata.forEach(role => {
      const key = role.name;
      if (isMetadata(instance[key])) {
        // create nested instance
        instance[key] = this.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor),
          instance[key], userRoles) || null;
        return;
      }
      if (Array.isArray(rolesMetadata)) {
        // searching first coincidence of roles in arrays.
        if (role.roles.some(roleName => userRoles.some(roleUser => roleName === roleUser))) {
          arrayInstance.push(instance[key] || null);
          return;
        }
      }
      delete instance[key];
    });

    return arrayInstance;
  }
}

