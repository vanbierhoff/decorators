import {InstanceFactoryByRoles} from "../by-role-factory/instance-by-role";


export class BiMeta {

  constructor(protected auth: any) {
  }

  instanceByRole: InstanceFactoryByRoles = new InstanceFactoryByRoles();

  static getInstanceByRole<T>(instance: T, roles: string[]): T {
    // @ts-ignore
    return InstanceFactoryByRoles.getInstanceByRole(instance, roles);
  }

}
