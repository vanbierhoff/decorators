import 'reflect-metadata'
import { INSTANCE_META } from "@bi-meta/policy/meta";
import { MetadataInterface } from "@bi-meta/policy/meta/decorators/bi-meta/models/bi-meta.interface";
import { ConstructableInstance } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export function BiMetaDecorator(): any {
    return (target: ConstructableInstance , propertyKey: string, _descriptor: PropertyDescriptor): any => {

        return class extends target {
            constructor(...args: any[]) {
                super(...args);
                const metaConfig = {};

                const metaField: MetadataInterface = {
                    biMetaInstance: this,
                    [propertyKey]: {}
                };
                // getMeta
                const fieldList: MetadataInterface = Reflect.getMetadata(INSTANCE_META, target);

                // if not meta - created
                if (!fieldList) {
                    Reflect.defineMetadata(INSTANCE_META, metaField, target);
                    // return;
                }

                // If there is data, add a new field
                if (fieldList) {
                    fieldList[propertyKey] = metaConfig;
                    Reflect.defineMetadata(INSTANCE_META, fieldList, target);
                    // return;
                }
            }
        };
    };
}
