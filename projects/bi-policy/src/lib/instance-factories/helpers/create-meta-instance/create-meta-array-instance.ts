import { MetadataInterface, PolicyMetaInterface, ROLE_META } from "@bi-meta/policy/meta";
import { InstanceFactoryInterface } from "@bi-meta/policy/instance-factories/model";
import { addInstanceByPolicy, isMetadata } from "@bi-meta/policy/instance-factories/helpers";


export function createMetaArrayInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T,
                                           instanceFactory: InstanceFactoryInterface,
                                           instancePolicy: MetadataInterface, byRole: boolean = false): Array<T> {
    const arrayInstance: Array<T> = [];
    rolesMetadata.forEach(role => {
        const key = role.propertyKey;

        if (isMetadata(instance[key])) {
            // create nested instance
            instance[key] = instanceFactory.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor),
                instance[key], instancePolicy) ?? null;
            return;
        }

        if (byRole) {
            // searching first coincidence of roles in arrays.
            addInstanceByPolicy(role, instance, key, instancePolicy, arrayInstance);
        }

        if (!byRole) {
            if (arrayInstance) {
                arrayInstance.push(instance[key] ?? null);
                return;
            }
        }
    });

    return arrayInstance;
}
