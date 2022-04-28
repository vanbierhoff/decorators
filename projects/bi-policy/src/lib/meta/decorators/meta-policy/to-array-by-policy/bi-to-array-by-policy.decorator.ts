import { addMetaField } from "@bi-meta/policy/helpers/add-meta/add-meta-field";
import { PolicyMetaInterface, ROLE_META, TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";
import {
    ArrayByPolicyInterface, ConstructableInstance
} from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export function BiToArrayByPolicyDecorator<T>(instance: ConstructableInstance<T> | any, fn: (...args) => boolean, parentField?: string): any {
    return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

        const metadata: ArrayByPolicyInterface = {
            target,
            propertyKey,
            parentField,
            instance: instance.constructor,
            policyFn: fn
        };

        const policyMetadata: PolicyMetaInterface = {
            target,
            propertyKey,
            policyFn: fn
        };

        addMetaField<ArrayByPolicyInterface>(target, TO_ARRAY_BY_ROLE, metadata);
        addMetaField<PolicyMetaInterface>(target, ROLE_META, policyMetadata);

    };
}
