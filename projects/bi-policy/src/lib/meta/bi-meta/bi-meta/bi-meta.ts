import { InstanceMetaByPolicyFactory } from "@bi-meta/policy/instance-factories/instance-factory-by-policy";
import { GetInstanceMetaFactory } from "@bi-meta/policy/instance-factories/get-instance-meta";
import { MetaControllerObservers } from "@bi-meta/policy/meta/bi-meta";
import { ConstructableInstance } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";
import { Observable } from "rxjs";
import { validateMetaField } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/is-allowed";


export class BiMeta {

    static getInstanceByPolicy<T>(instance: T): T {
        return InstanceMetaByPolicyFactory.getInstance<T>(instance);
    }

    static getInstance<T>(instance: T): T {
        return GetInstanceMetaFactory.getInstance(instance);
    }

    static isAllowed<T>(state: T, field: string): Promise<boolean> {
        return validateMetaField(state, field);
    }

    static update<T extends object>(instance: ConstructableInstance): void {
        MetaControllerObservers.update(instance);
    }

    static updateAll(): void {
        MetaControllerObservers.updateAll();
    }

    static unsubscribe(instance: ConstructableInstance): void {
        MetaControllerObservers.unsubscribe(instance);
    }

    static unsubscribeAll(): void {
        MetaControllerObservers.unsubscribeAll();
    }

    static change<T>(instance: T): Observable<T> {
        return MetaControllerObservers.getSubject(instance);
    }
}
