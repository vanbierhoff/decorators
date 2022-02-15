// Creates entities taking into account the role decorator (fields that cannot be accessed will not be included in the created entity)
import {RoleMetaInterface} from "../decorators/role";
import {ROLE_META} from "../config/meta-config/meta-config";
import {isMetadata} from "../helpers/is-meta/is-metadata";
import {AuthInterface} from "./models/auth.interface";
import {toArray} from "../helpers/to-array/to-array";


export class InstanceFactoryByRoles {

  constructor(protected auth: AuthInterface) {
  }

  private rolesUser: Array<string>;

  public getInstanceByRole<T, R = T>(instance: T): R {
    const rolesMetadata: RoleMetaInterface[] = Reflect.getMetadata(ROLE_META, instance.constructor);
    this.rolesUser = toArray(this.auth.roles);
    return this.createInstance(rolesMetadata, instance);
  }

  private createInstance<T, R = T>(rolesMetadata: RoleMetaInterface[], instance: T): T {
    rolesMetadata.forEach(role => {
      const key = role.name;
      if (isMetadata(instance[key])) {
        // create nested instance
        instance[key] = this.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor), instance[key]) || null;
        return;
      }
      if (Array.isArray(rolesMetadata)) {
        // searching first coincidence of roles in arrays.
        if (role.roles.some(roleName => this.rolesUser.some(roleUser => roleName === roleUser))) {
          instance[key] = instance[key] || null;
          return;
        }
        // if (some(role.roles, roleName => some(this.rolesUser, roleUser => roleName === roleUser))) {
        //   instance[key] = instance[key] || null;
        //   return;
        // }
      }
      delete instance[key];
    })
    // forEach(rolesMetadata, role => {
    //   const key = role.name;
    //   if (isMetadata(instance[key])) {
    //     // create nested instance
    //     instance[key] = this.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor), instance[key]) || null;
    //     return;
    //   }
    //   if (Array.isArray(rolesMetadata)) {
    //     // searching first coincidence of roles in arrays.
    //     if (some(role.roles, roleName => some(this.rolesUser, roleUser => roleName === roleUser))) {
    //       instance[key] = instance[key] || null;
    //       return;
    //     }
    //   }
    //   delete instance[key];
    // });

    return instance as T;
  }
}

