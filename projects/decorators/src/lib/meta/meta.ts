import { AuthInterface, InstanceFactoryByRoles } from "../by-role-factory";


export class BiMeta {

  constructor(protected auth: AuthInterface) {
  }

  instanceByRole: InstanceFactoryByRoles = new InstanceFactoryByRoles(this.auth);

  public getInstanceByRole<T>(instance: T): T {
    return this.instanceByRole.getInstanceByRole(instance);
  }

}
