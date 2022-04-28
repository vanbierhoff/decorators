import { ArrayByPolicyInterface } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

export function getInstanceArray(policyList: ArrayByPolicyInterface[], separatorResults: string[]): ArrayByPolicyInterface {
    let instanceArray: ArrayByPolicyInterface;
    policyList.some( policyItem => {
        if ((policyItem?.parentField === separatorResults[separatorResults.length - 2])) {
            instanceArray = policyItem;
            return true;
        }
        return false;
    });

    return instanceArray;
}
