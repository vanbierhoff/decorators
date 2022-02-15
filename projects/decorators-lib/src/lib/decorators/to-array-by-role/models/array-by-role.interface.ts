export interface ArrayByRoleInterface {
  propertyKey: string
  parentField?: string;
  instance: Constructable
}

export type Constructable<T = any> = new (...args: any[]) => T;
