import { INSTANCE_META, PolicyMetaInterface, ROLE_META, TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";


export function isMetadata<T>(instance: T): boolean {
    if (typeof instance === 'function' || (typeof instance === 'object')) {
        if (instance?.constructor) {
            if (Reflect.getMetadata(INSTANCE_META, instance.constructor)) {
                return true;
            }
        }
        if (Reflect.getMetadata(INSTANCE_META, instance)) {
            return true;
        }
    }
    return false;
}

export function isToArrayMetadata<T>(instance: T): boolean {
    if (typeof instance === 'function' || (typeof instance === 'object')) {
        if (instance?.constructor) {
            if (Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor)) {
                return true;
            }
        }
        if (Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance)) {
            return true;
        }
    }
    return false;
}

export function deletedDontMeta<T>(instance: T, skipCheck = false): T {
    if (skipCheck) {
        return instance;
    }
    const metaField: PolicyMetaInterface[] = Reflect.getMetadata(ROLE_META, instance.constructor || instance);
    const metaArrayField: ArrayByPolicyInterface[] = Reflect.getMetadata(TO_ARRAY_BY_ROLE, instance.constructor || instance);

    for (const key in instance) {
        if (metaField?.some(field => field.propertyKey === key)) {
            continue;
        }
        if (metaArrayField?.some(field => field.propertyKey === key)) {
            continue;
        }
        delete instance[key];
    }

    return instance;
}


