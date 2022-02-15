import {BiMeta, Role, ToArrayByRole} from "decorators-lib";


@BiMeta()
export class NestedMenu {
  @Role('ADMIN')
  nestedOne = 'rex'

  @Role('BOSS')
  nestedTwo = 'BOSS'

  @Role('ADMIN')
  nestedBox = 'BOX'

}

@BiMeta()
export class Menu {

  @Role('ADMIN')
  menu = {}

  @ToArrayByRole(NestedMenu, 'parentField')
  nested = {
    title: 'title',
    parentField: {}
  }

}





