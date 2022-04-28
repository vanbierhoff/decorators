import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";


export interface FieldParserStateInterface<T> {
    parentState: T;
    state: T;
    metaArrayParent?: ArrayByPolicyInterface[];
}
