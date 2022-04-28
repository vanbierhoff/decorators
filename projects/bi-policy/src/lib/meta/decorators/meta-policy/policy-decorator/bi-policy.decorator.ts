
import { ROLE_META } from "@bi-meta/policy/meta";
import { PolicyMetaInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-decorator/models/policy-meta.interface";
import { addMetaField } from "@bi-meta/policy/helpers/add-meta/add-meta-field";

export function BiPolicy<T extends object>(fn: (...args) => boolean): any {
    return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

        const rolesField: PolicyMetaInterface = {
            target,
            propertyKey,
            policyFn: fn
        };
        addMetaField<PolicyMetaInterface>(target, ROLE_META, rolesField);
    };
}
