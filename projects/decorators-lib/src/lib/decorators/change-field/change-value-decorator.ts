// Decorator fol call method in Component after set value
// Allows you to change individual fields and work with objects
import {OnChange} from "./models/change-value.interface";
import {createFieldsObject} from "./helpers/create-fields";


export function OnChangeValue<T extends object>(method: string, skipFirst?: boolean): any {
  return (target: object, propertyKey: string, _: PropertyDescriptor): any => {
    let isConfig = false;

    let fields: T | OnChange<T> = target[propertyKey] || {} as OnChange<T>;

    return {
      get(): T | {} | undefined {
        if ('decoratorLiteralValue' in fields) {
          return fields.decoratorLiteralValue;
        }
        return fields;
      },

      set(this: object, value: T): void {
        if (!isConfig) {
          fields = createFieldsObject(() => {
            let data = fields;
            if ('decoratorLiteralValue' in fields) {
              data = fields.decoratorLiteralValue;
            }
            this[method as string].apply(this, [data]);
          }, fields);
          setValue.bind(this, fields, value, method, skipFirst)();
          isConfig = true;
          return;
        }
        setValue.bind(this, fields, value, method)();

        if (skipFirst) {
          skipFirst = false;
        }
      },
    };
  };
}

function setValue<T>(this: object, fields: OnChange<T>, value: T, method: string, skipFirst?: boolean): void {
  let isChanged = false;

  if (value !== Object(value)) {
    if (fields?.decoratorLiteralValue === value) {
      return;
    }
    fields.decoratorLiteralValue = value
    toLiteralValueDecorator(fields);

    if (!skipFirst) {
      this[method as string].apply(this, [fields.decoratorLiteralValue]);
    }
    return;
  }

  Object.keys(value).forEach(key => {
    if (fields[key] !== value[key]) {
      fields[key] = value[key]
      isChanged = true;
    }
  });

  if (fields?.decoratorLiteralValue) {
    delete fields.decoratorLiteralValue;
  }

  if (isChanged && !skipFirst) {
    this[method as string].apply(this, [fields]);
  }
}

function toLiteralValueDecorator<T>(fields: T): void {
  Object.keys(fields).forEach(key => {
    if (key !== 'decoratorLiteralValue') {
      delete fields[key];
    }
  });
}


