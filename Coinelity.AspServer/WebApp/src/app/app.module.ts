import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavPanelComponent } from './components/sidenav/sidenav-panel/sidenav-panel.component';
import { ChatComponent } from './components/sidenav/sidenav-panel/chat/chat.component';
import { NewsComponent } from './components/sidenav/sidenav-panel/news/news.component';
import { PagesComponent } from './components/pages/pages.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TradeRoomComponent } from './components/pages/trade-room/trade-room.component';
import { MarketsComponent } from './components/pages/trade-room/markets/markets.component';
import { TradeComponent } from './components/pages/trade-room/trade/trade.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { AffiliateComponent } from './components/pages/affiliate/affiliate.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavPanelComponent,
    ChatComponent,
    NewsComponent,
    HeaderComponent,
    PagesComponent,
    DashboardComponent,
    TradeRoomComponent,
    MarketsComponent,
    TradeComponent,
    SettingsComponent,
    AffiliateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
