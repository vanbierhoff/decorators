
import { MetadataInterface, PolicyMetaInterface } from "@bi-meta/policy/meta";
import {
    createMetaArrayInstance, createMetaInstance, deletedDontMeta, getInstance, toArrayInstance
} from "@bi-meta/policy/instance-factories/helpers";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export class InstanceMetaByPolicyFactory {

    static getInstance<T>(instance: T, fvMetaInstance?: MetadataInterface): T {
        return deletedDontMeta(getInstance(instance, InstanceMetaByPolicyFactory, fvMetaInstance));

    }

    static createInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, fvMetaInstance: MetadataInterface): T {
        return createMetaInstance(rolesMetadata, instance, InstanceMetaByPolicyFactory, fvMetaInstance, true);
    }

    static toArray<T>(instanceMeta: ArrayByPolicyInterface[], instance: T, fvMetaInstance: MetadataInterface): T {
        return toArrayInstance<T>(instanceMeta, instance, fvMetaInstance, InstanceMetaByPolicyFactory);
    }

    static createArrayInstance<T>(rolesMetadata: PolicyMetaInterface[], instance: T, fvMetaInstance: MetadataInterface): Array<T> {
        return createMetaArrayInstance(rolesMetadata, instance, InstanceMetaByPolicyFactory, fvMetaInstance, true);
    }
}

