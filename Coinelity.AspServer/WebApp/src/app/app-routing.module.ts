import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TradeRoomComponent } from './components/pages/trade-room/trade-room.component';
import { SidenavItems } from './enums/SidenavItems';

const routes: Routes = [
  // { path: '', redirectTo: SidenavItems[0].action, pathMatch: 'full' },
  { path: SidenavItems[0].action.substring( 1 ), component: DashboardComponent },
  { path: SidenavItems[1].action.substring( 1 ), component: TradeRoomComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
