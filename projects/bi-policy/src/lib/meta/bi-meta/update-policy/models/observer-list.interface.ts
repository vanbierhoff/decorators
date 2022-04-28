import { Subject } from 'rxjs';

export interface ObserverListInterface<T = any> {
    instance: T;
    subject: Subject<T>;
}
