import { MetadataInterface } from "@bi-meta/policy/meta";
import { Subject } from "rxjs";


export interface MetaObserverItemInterface {
    instance: MetadataInterface;
    subscriber: Subject<null>;
}
