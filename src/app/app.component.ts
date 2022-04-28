import {Component, OnInit} from '@angular/core';

import { Menu, NestedMenu } from "../modules/menu/models/menu";
import { OnChangeValue } from "@bi-meta/decorators/decorators/change-field";
import { BiMeta } from "@bi-meta/policy/meta/bi-meta";
import { AuthService } from "../shared/auth/auth.service";
import { BiMetaDecorator, INSTANCE_META, TO_ARRAY_BY_ROLE } from "@bi-meta/policy/meta";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {


  constructor(protected auth: AuthService) {
  }

  title = 'decorators';

  @OnChangeValue('test', true)
  rex: number = 5;

  ngOnInit() {

    const menu = BiMeta.getInstance(new Menu(this.auth));
    const instanceByPolicy = BiMeta.getInstanceByPolicy(new Menu(this.auth));
    console.log(instanceByPolicy)

    BiMeta.isAllowed(menu, 'nested.fields[1]').then(result => console.log(result))
    BiMeta.isAllowed(menu, 'menu').then(result => console.log(result))

    this.rex = 20;
  }

  test(value: number) {
    console.log(value)
  }
}
