import { FieldParserInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/models";
import { MetaCollection } from "@bi-meta/policy/models/meta-collection/meta-collection";
import { MetadataInterface } from "@bi-meta/policy/meta";


export interface MetaFieldsInterface {
    metadata: FieldParserInterface;
    metaCollection: MetaCollection;
    metaInstance: MetadataInterface;
}
