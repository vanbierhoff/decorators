import { FieldParserInterface } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/models";
import { MetadataInterface } from "@bi-meta/policy/meta";
import { MetaCollection } from "@bi-meta/policy/models/meta-collection/meta-collection";



export function checkRestrictionsPolicy<T>(metadata: FieldParserInterface,
                                           metaCollection: MetaCollection, metaInstance: MetadataInterface): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        const RegExp = /\d/ig;
        if (RegExp.test(metadata.field)) {
            res(metaCollection[+metadata.field].policyFn.bind(metaInstance,
                metaCollection[+metadata.field].target, metaInstance.biMetaInstance, metadata.field)());
        }


        metaCollection.some((biMetaInstance, index) => {
            if (biMetaInstance.propertyKey === metadata.field) {
                res(biMetaInstance.policyFn.bind(metaInstance, metaCollection[index].target, metaInstance.biMetaInstance, metadata.field)());
            }
        });
        throw new Error('state or field does not exist');
    });
}
