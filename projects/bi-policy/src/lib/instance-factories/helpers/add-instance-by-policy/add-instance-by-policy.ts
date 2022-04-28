import { MetadataInterface, PolicyMetaInterface } from "@bi-meta/policy/meta";

export function addInstanceByPolicy<T>(role: PolicyMetaInterface, instance: T, key: string,
    instancePolicy: MetadataInterface, arrayInstance?: Array<T>): void {
    if (role.policyFn.bind(instancePolicy, role.target, instancePolicy.biMetaInstance, role.propertyKey)()) {
        if (arrayInstance) {
            arrayInstance.push(instance[key] ?? null);
            return;
        }
        instance[key] = instance[key] ?? null;
        return;
    }
    delete instance[key];
}
