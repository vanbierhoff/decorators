export function addMetaField<META>(target: object, metaKey: string, metadata: META): void {

  // getMeta
  const fieldList: META[] = Reflect.getMetadata(metaKey, target.constructor);

  // if not meta - created
  if (!fieldList) {
    const newFieldList: META[] = [];
    newFieldList.push(metadata);
    Reflect.defineMetadata(metaKey, newFieldList, target.constructor);
    return;
  }

  // If there is data, add a new field
  if (fieldList) {
    fieldList.push(metadata);
    Reflect.defineMetadata(metaKey, fieldList, target.constructor);
    return;
  }
}
