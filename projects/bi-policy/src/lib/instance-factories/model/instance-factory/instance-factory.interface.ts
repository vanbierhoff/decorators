import { MetadataInterface, PolicyMetaInterface } from "@bi-meta/policy/meta";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";


export interface InstanceFactoryInterface {
    getInstance<T>(instance: T, biMetaInstance?: MetadataInterface): T;

    createInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, biMetaInstance: MetadataInterface): T;

    toArray<T>(instanceMeta: ArrayByPolicyInterface[], instance: T, biMetaInstance: MetadataInterface): T;

    createArrayInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, biMetaInstance: MetadataInterface): Array<T>;
}
