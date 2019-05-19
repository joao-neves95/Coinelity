import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //#region PROPERTIES

  public isCollapsed: boolean = false;

  public isReverseArrow: boolean = false;

  public width = 200;

  //#endregion

}
