import { MetaObserverItemInterface } from "@bi-meta/policy/meta/bi-meta";
import { ConstructableInstance } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";
import { from, Observable, Subject } from "rxjs";
import { INSTANCE_META } from "@bi-meta/policy/meta";

export class MetaControllerObservers {
    static observerList: MetaObserverItemInterface[] = [];

    static getSubject<T>(instance: T): Observable<null> {
        const meta = Reflect.getMetadata(INSTANCE_META, instance || instance.constructor);
        const updateSubject: Subject<null> = new Subject<null>();
        MetaControllerObservers.observerList.push({
            instance: meta,
            subscriber: updateSubject
        });
        return updateSubject;
    }

    static updateAll(): void {
        from(MetaControllerObservers.observerList).subscribe((data: MetaObserverItemInterface) => {
            data.subscriber.next(null);
        });
    }

    static update<T>(instance: ConstructableInstance): void {
        from(MetaControllerObservers.observerList).subscribe((data: MetaObserverItemInterface) => {
            if (data.instance.biMetaInstance instanceof instance) {
                data.subscriber.next(null);
            }
        });
    }

    static unsubscribe(instance: ConstructableInstance): void {
        MetaControllerObservers.observerList.some((observerItem, index) => {
            if (observerItem.instance['fvMetaInstance'] instanceof instance) {
                observerItem.subscriber.unsubscribe();
                MetaControllerObservers.observerList.splice(index, 1);
                return true;
            }
        });
    }

    static unsubscribeAll(): void {
        MetaControllerObservers.observerList.forEach((observerItem, index) => {
            observerItem.subscriber.unsubscribe();
            MetaControllerObservers.observerList.splice(index, 1);
        });
    }
}
