export interface FieldsOnChange<T> {
    setValue?: (object: object) => void;
    decoratorLiteralValue?: T;
}

export type OnChange<T> = FieldsOnChange<T> & T;
