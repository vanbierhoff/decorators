import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";
import { MetadataInterface, ROLE_META } from "@bi-meta/policy/meta";
import { InstanceFactoryInterface } from "@bi-meta/policy/instance-factories/model";
import { isMetadata } from "@bi-meta/policy/instance-factories/helpers";


export function toArrayInstance<T>(instanceMeta: ArrayByPolicyInterface[], instance: T,
                                   BiMetaInstance: MetadataInterface,
                                   instanceFactoryByPolicy: InstanceFactoryInterface): T {

    instanceMeta.forEach((item) => {
        for (const nestedKey in instance[item.propertyKey]) {
            if (isMetadata(instance[item.propertyKey][nestedKey])) {
                instance[item.propertyKey][nestedKey] =
                    instanceFactoryByPolicy.getInstance(instance[item.propertyKey][nestedKey], BiMetaInstance);

            }
        }
        if (isMetadata(item.instance)) {
            if (item.parentField) {
                (instance[item.propertyKey][item.parentField] as Array<T> ) = instanceFactoryByPolicy.createArrayInstance(Reflect.getMetadata(ROLE_META,
                    item.instance), new item.instance(), BiMetaInstance);
                return;
            }
            (instance[item.propertyKey] as Array <T> )  = instanceFactoryByPolicy.createArrayInstance(Reflect.getMetadata(ROLE_META,
                item.instance), new item.instance(), BiMetaInstance);

        }
    });
    return instance;
}
