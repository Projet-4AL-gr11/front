import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {MatTabsModule} from "@angular/material/tabs";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {PipesModules} from "../../../pipes/pipes.modules";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../../shared/shared.module";
import {CardsModule} from "../../card/cards.module";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    // DialogModule,
    CommonModule,
    SharedModule,
    CardsModule,
    MatTabsModule,
    VirtualScrollerModule,
    PipesModules,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    CardsModule,
    ProfileRoutingModule,
    FlexModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule {
}
