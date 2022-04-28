import { MetadataInterface, PolicyMetaInterface, ROLE_META } from "@bi-meta/policy/meta";
import { InstanceFactoryInterface } from "@bi-meta/policy/instance-factories/model";
import { addInstanceByPolicy, isMetadata } from "@bi-meta/policy/instance-factories/helpers";



export function createMetaInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, instanceFactory: InstanceFactoryInterface,
                                      instancePolicy: MetadataInterface, byRole = false): T {
    rolesMetadata.forEach(role => {
        const key = role.propertyKey;

        if (isMetadata(instance[key])) {
            // create nested instance
            instance[key] = instanceFactory.createInstance(Reflect.getMetadata(ROLE_META, instance[key].constructor),
                instance[key], instancePolicy) ?? null;
            return;
        }

        if (byRole) {
            addInstanceByPolicy(role, instance, key, instancePolicy);
        }
        if (!byRole) {
            instance[key] = instance[key] ?? null;
        }
    });

    return instance;
}
