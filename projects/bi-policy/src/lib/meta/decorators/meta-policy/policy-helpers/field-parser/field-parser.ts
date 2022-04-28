/**
 * if we  want to get a  nested field =>  instance.field.nestedField, fieldParser return instance this field and itself field
 * @param  state - The entity in which we are looking for a field
 * @param  field - name field
 * @return FieldParserInterface
 */
import { FieldParserInterface, FieldParserStateInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/models";
import { getInstanceArray } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/get-instance-array/get-instance-array";
import { TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";


export function fieldParser<T>(state: T, field: string): FieldParserInterface {
    const RegExp = /(\w{1,15})?(\d{1,2)?/ig;
    let separatorResult: string[] = [];

    if (RegExp.test(field)) {
        separatorResult = (field.match(RegExp).filter(item => !!item));
        const targetKey: string | number = separatorResult[separatorResult.length - 1];


        return {
            instanceField: getTargetField<T>(separatorResult,
                {
                    parentState: state,
                    state
                }, targetKey),
            field: separatorResult.pop()
        };
    }
    return {
        instanceField: state.constructor,
        field
    };
}

/**
 *
 * @param separatorResult - The string is split into an array of strings, each element is the level of the searched element in depth
 * @param instances: FieldParserStateInterface
 * @param targetEl - Desired end element
 * @param index - index of separatorResult
 */
export function getTargetField<T>(
    separatorResult: string[], instances: FieldParserStateInterface<T>, targetEl: string | number, index = 0): object {


    if (targetEl in instances.state && index === separatorResult.length - 1) {
        return instances.state.constructor;
    }


        if (targetEl in instances.state[separatorResult[index]]) {
            if (instances.state[separatorResult[index]].constructor === Array) {
                return getInstanceArray(instances.metaArrayParent, separatorResult).instance;
            }
            return instances.state[separatorResult[index]].constructor;
        }

    if (separatorResult[index] in instances.state) {
        // If the object (array) being checked is deep in the element tree,
        // its metadata belongs to another parent, check for the presence of meta
        const metaArrayParent = Reflect.getMetadata(TO_ARRAY_BY_ROLE, instances.state.constructor) || [instances.metaArrayParent];

       return  getTargetField(separatorResult, {
            state: instances.state[separatorResult[index]],
            parentState: instances.parentState,
            metaArrayParent
        }, targetEl, ++index);
    }
    throw new Error('Field under validation does not exist ');
}
