import { getMetadataFields } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/is-allowed/get-metadata-fields";
import { checkRestrictionsPolicy } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/is-allowed/check-restrictions-policy";
import { MetaFieldsInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/models";

export function validateMetaField<T>(state: T, field: string): Promise<boolean> {
    const metaFields: MetaFieldsInterface = getMetadataFields(state, field);
    return checkRestrictionsPolicy(metaFields.metadata, metaFields.metaCollection, metaFields.metaInstance);
}
