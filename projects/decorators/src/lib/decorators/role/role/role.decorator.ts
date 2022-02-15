import 'reflect-metadata'
import {RoleMetaInterface} from "../models/role-meta.interface";
import {ROLE_META} from "../../../config/meta-config/meta-config";
import {toArray} from "../../../helpers";



export function Role<T extends object>(roles: Array<string> | string): any {
  return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

    const rolesField: RoleMetaInterface = {
      name: propertyKey,
      roles: toArray(roles)
    };

    // get meta
    const rolesMetadata: RoleMetaInterface[] = Reflect.getMetadata(ROLE_META, target.constructor);

    // if not meta - created
    if (!rolesMetadata) {
      const roleList: RoleMetaInterface[] = [];
      roleList.push(rolesField);
      Reflect.defineMetadata(ROLE_META, roleList, target.constructor);
      return;
    }

    // If there is data, add a new field
    if (rolesMetadata) {
      rolesMetadata.push(rolesField);
      Reflect.defineMetadata(ROLE_META, rolesMetadata, target.constructor);
      return;
    }
  };
}
