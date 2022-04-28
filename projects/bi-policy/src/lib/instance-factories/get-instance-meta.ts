import { MetadataInterface, PolicyMetaInterface } from "@bi-meta/policy/meta";
import {
    createMetaArrayInstance, createMetaInstance, deletedDontMeta, getInstance, toArrayInstance
} from "@bi-meta/policy/instance-factories/helpers";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export class GetInstanceMetaFactory {
    static getInstance<T>(instance: T, fvMetaInstance?: MetadataInterface): T {
        return deletedDontMeta(getInstance(instance, GetInstanceMetaFactory, fvMetaInstance));
    }

    static createInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, fvMetaInstance: MetadataInterface): T {
        return createMetaInstance(rolesMetadata, instance, GetInstanceMetaFactory, fvMetaInstance);
    }

    static toArray<T>(instanceMeta: ArrayByPolicyInterface[], instance: T, fvMetaInstance: MetadataInterface): T {
        return toArrayInstance<T>(instanceMeta, instance, fvMetaInstance, GetInstanceMetaFactory);
    }

    static createArrayInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, fvMetaInstance: MetadataInterface): Array<T> {
        return createMetaArrayInstance(rolesMetadata, instance, GetInstanceMetaFactory, fvMetaInstance);
    }
}

