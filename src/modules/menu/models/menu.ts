import { Role } from "@bi-meta/decorators/decorators/role";
import { ToArrayByRole } from "@bi-meta/decorators/decorators/to-array-by-role";
import { BiMetadata } from "@bi-meta/decorators/decorators/meta";


@BiMetadata()
export class NestedMenu {
  @Role('ADMIN')
  nestedOne = 'rex'

  @Role('BOSS')
  nestedTwo = 'BOSS'

  @Role('ADMIN')
  nestedBox = 'BOX'

}

@BiMetadata()
export class Menu {

  @Role('ADMIN')
  menu = {}

  @ToArrayByRole(NestedMenu, 'parentField')
  nested = {
    title: 'title',
    parentField: {}
  }

}





