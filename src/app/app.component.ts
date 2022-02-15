import {Component, OnInit} from '@angular/core';

import {Menu} from "../modules/menu/models/menu";
import { OnChangeValue } from "@bi-meta/decorators/decorators/change-field";
import { BiMeta } from "@bi-meta/decorators/meta/meta";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'decorators';

  @OnChangeValue('test', true)
  rex: number = 5;

  ngOnInit() {
    const menu = BiMeta.getInstanceByRole(new Menu(), ['ADMIN'])
    console.log(menu)

    this.rex = 20;
  }

  test(value: number) {
    console.log(value)
  }
}
