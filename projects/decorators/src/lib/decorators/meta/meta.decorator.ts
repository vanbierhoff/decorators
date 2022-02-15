import {INSTANCE_META} from "../../config/meta-config/meta-config";
import {MetadataInterface} from "./models/meta.interface";


export function BiMeta(): any {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor): any => {

    const metaConfig = {};

    const metaField: MetadataInterface = {
      [propertyKey]: {}
    };

    // getMeta
    const fieldList: MetadataInterface = Reflect.getMetadata(INSTANCE_META, target);

    // if not meta - created
    if (!fieldList) {
      Reflect.defineMetadata(INSTANCE_META, metaField, target);
      return;
    }

    // If there is data, add a new field
    if (fieldList) {
      fieldList[propertyKey] = metaConfig;
      Reflect.defineMetadata(INSTANCE_META, fieldList, target);
      return;
    }
  };
}
