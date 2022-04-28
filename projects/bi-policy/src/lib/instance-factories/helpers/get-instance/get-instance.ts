
import { InstanceFactoryInterface } from "@bi-meta/policy/instance-factories/model";
import { INSTANCE_META, MetadataInterface, PolicyMetaInterface, ROLE_META, TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";
import { isMetadata, isToArrayMetadata } from "@bi-meta/policy/instance-factories/helpers";




export function getInstance<T>(instance: any, instanceFactory: InstanceFactoryInterface, fvMetaInstance?: MetadataInterface): T {
    const createdInstance = JSON.parse(JSON.stringify(instance));
    if('__proto__' in instance) {
        createdInstance.__proto__ = instance.__proto__ ;
    }


    const rolesMetadata: PolicyMetaInterface[] = Reflect.getMetadata(ROLE_META, instance.constructor);
    const metaInstance = fvMetaInstance || Reflect.getMetadata(INSTANCE_META, instance.constructor);

    if (isToArrayMetadata(instance)) {
        instanceFactory.toArray(Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor),
            createdInstance, metaInstance);
    }
    if (isMetadata(instance)) {
        instanceFactory.createInstance<T>(rolesMetadata, createdInstance, metaInstance);
        return createdInstance;
    }
    console.error('Instance doesn\'t have meta  decorator');
}

// export function getInstance<T>(instance: T, instanceFactory: InstanceFactoryInterface, fvMetaInstance?: MetadataInterface): T {
//     const createdInstance = {} as T;
//     Object.assign(createdInstance, instance);
//     console.log(createdInstance)
//
//     const rolesMetadata: PolicyMetaInterface[] = Reflect.getMetadata(ROLE_META, instance.constructor);
//     const metaInstance = fvMetaInstance || Reflect.getMetadata(INSTANCE_META, instance.constructor);
//
//     if (isToArrayMetadata(instance)) {
//         instanceFactory.toArray(Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor),
//             createdInstance, metaInstance);
//     }
//     if (isMetadata(instance)) {
//         instanceFactory.createInstance<T>(rolesMetadata, createdInstance, metaInstance);
//         return createdInstance;
//     }
//     console.error('Instance doesn\'t have meta  decorator');
// }
