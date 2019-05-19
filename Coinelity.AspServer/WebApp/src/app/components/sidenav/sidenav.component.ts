import { Component, OnInit } from '@angular/core';

import { SidenavItems } from '../../enums/SidenavItems';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  //#region  PROPERTIES

  sidenavItems = SidenavItems;

  //#endregion

  ngOnInit() {
  }

}
