import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesComponent } from './components/pages/pages.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { TradeRoomComponent } from './components/pages/trade-room/trade-room.component';
import { AffiliateComponent } from './components/pages/affiliate/affiliate.component';
import { InternalFinancialAnalyticsComponent } from './components/pages/internal-financial-analytics/internal-financial-analytics.component';
import { TradeComponent } from './components/pages/trade-room/trade/trade.component';
import { MarketsComponent } from './components/pages/trade-room/markets/markets.component';
import { SidenavPanelComponent } from './components/sidenav/sidenav-panel/sidenav-panel.component';
import { ChatComponent } from './components/sidenav/sidenav-panel/chat/chat.component';
import { NewsComponent } from './components/sidenav/sidenav-panel/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    PagesComponent,
    DashboardComponent,
    SettingsComponent,
    TradeRoomComponent,
    AffiliateComponent,
    InternalFinancialAnalyticsComponent,
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
