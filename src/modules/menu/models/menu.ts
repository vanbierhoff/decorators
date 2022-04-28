import { BiMetaDecorator } from "@bi-meta/policy/meta/decorators/bi-meta/bi-meta.decorator";
import { BiPolicy } from "@bi-meta/policy/meta";

import { BiToArrayByPolicyDecorator } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/bi-to-array-by-policy.decorator";
import { PolicyInstance } from "@bi-meta/policy/models/policy-instance";
import { byRolePolicy } from "@bi-meta/policy/meta/decorators/meta-policy/policy-helpers/by-role/by-role-policy";
import { ConstructableInstance } from "@bi-meta/policy/meta/decorators/meta-policy/to-array-by-policy/models/array-by-policy.interface";

@BiMetaDecorator()
export class NestedMenu {
  @BiPolicy(byRolePolicy(['ROLES_USER']))
  nestedOne = 'rex'

  @BiPolicy(byRolePolicy(['ONLY_ADMIN']))
  nestedTwo = 'BOSS'

  @BiPolicy(byRolePolicy(['ROLES_USER_X']))
  nestedBox = 'BOX'

}

@BiMetaDecorator()
export class Menu {

  @BiPolicy(byRolePolicy(['ROLES_USER']))
  public menu = false;


  @BiToArrayByPolicyDecorator(new NestedMenu(), byRolePolicy(['ROLES_USER']), 'fields')
 public nested = {
    title: 'title',
    parentField: {},
    fields: []
  }

  constructor( protected auth: PolicyInstance) {
  }

}




