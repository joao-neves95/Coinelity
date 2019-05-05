import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { SidenavPanelComponent } from './components/aside/sidenav-panel/sidenav-panel.component';
import { ChatComponent } from './components/aside/sidenav-panel/chat/chat.component';
import { NewsComponent } from './components/aside/sidenav-panel/news/news.component';
import { PagesComponent } from './components/pages/pages.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TradeRoomComponent } from './components/pages/trade-room/trade-room.component';
import { TradeComponent } from './components/pages/trade-room/trade/trade.component';
import { MarketsComponent } from './components/pages/trade-room/markets/markets.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { AffiliateComponent } from './components/pages/affiliate/affiliate.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HeaderComponent,
    PagesComponent,
    DashboardComponent,
    SettingsComponent,
    TradeRoomComponent,
    AffiliateComponent,
    TradeComponent,
    MarketsComponent,
    SidenavPanelComponent,
    ChatComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
