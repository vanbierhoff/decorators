import { PolicyMetaInterface } from "@bi-meta/policy/meta";
import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export type MetaCollection = PolicyMetaInterface[] & ArrayByPolicyInterface[] |
    ArrayByPolicyInterface[] | PolicyMetaInterface[];
