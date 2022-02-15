import {TO_ARRAY_BY_ROLE} from "../../config/meta-config/meta-config";
import {ArrayByRoleInterface, Constructable} from "./models/array-by-role.interface";
import {addMetaField} from "../../helpers";



export function ToArrayByRole<T extends object>(instance: Constructable, parentField?: string): any {
  return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

    const metadata: ArrayByRoleInterface = {
      propertyKey,
      parentField,
      instance
    };
    addMetaField<ArrayByRoleInterface>(target, TO_ARRAY_BY_ROLE, metadata);
  };
}
