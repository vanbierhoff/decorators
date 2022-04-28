import { FieldParserInterface, MetaFieldsInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/models";
import { INSTANCE_META, MetadataInterface, PolicyMetaInterface, ROLE_META, TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";
import { fieldParser } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/field-parser/field-parser";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";
import { MetaCollection } from "@bi-meta/policy/models/meta-collection/meta-collection";

export function getMetadataFields<T>(state: T, field: string): MetaFieldsInterface {
    const metaInstance: MetadataInterface = Reflect.getMetadata(INSTANCE_META, state.constructor || state);

    const metadata: FieldParserInterface = fieldParser(state, field);
    const fieldMeta: PolicyMetaInterface[] & ArrayByPolicyInterface[] = Reflect.getMetadata(ROLE_META, metadata.instanceField);
    const fieldMetaArray: PolicyMetaInterface & ArrayByPolicyInterface[] = Reflect.getMetadata(TO_ARRAY_BY_ROLE, metadata.instanceField);
    const metaCollection: MetaCollection = fieldMeta || fieldMetaArray;
    if (fieldMeta && fieldMetaArray) {
        return {
            metaCollection: fieldMeta.concat(fieldMetaArray),
            metadata,
            metaInstance
        };
    }
    return {
        metaCollection,
        metadata,
        metaInstance
    };
}

