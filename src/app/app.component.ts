import {Component, OnInit} from '@angular/core';
import {BiMeta} from "../../projects/decorators-lib/src/lib/meta/meta";
import {Menu} from "../modules/menu/models/menu";
import {OnChangeValue} from "decorators-lib";


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
