import {MetadataInterface} from "./models/meta.interface";
import {INSTANCE_META} from "../../config/meta-config/meta-config";


export function BiMetadata(): any {
  return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

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
