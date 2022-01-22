import { OnChange } from "../models/change-value.interface";


export function createFieldsObject<T>(onChangeCallback: () => void, fields?: T): OnChange<T> {
    let target: OnChange<T> = {} as OnChange<T>;

    if (Object.keys(fields).length > 0) {
        target = fields;
    }
    Object.defineProperty(target, 'setValue', {
        value: (object: object) => {
            Object.keys(object).forEach(key => {
                target[key] = object[key];
            });
            onChangeCallback();
        },
        enumerable: false
    });
    return target;
}
