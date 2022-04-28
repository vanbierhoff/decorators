export interface ArrayByPolicyInterface {
    target: object;
    propertyKey: string;
    parentField?: string;
    instance: ConstructableInstance;
    policyFn: (...args) => boolean;
}

export type ConstructableInstance<T = any> = new (...args: any[]) => T;
