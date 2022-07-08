import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {CardsModule} from "../../card/cards.module";
import {GroupViewComponent} from "./group-view.component";
import {GroupViewRoutingModule} from "./group-view-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatTabsModule} from "@angular/material/tabs";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {MatListModule} from "@angular/material/list";
import {PipesModules} from "../../../pipes/pipes.modules";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    GroupViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsModule,
    MatButtonModule,
    FlexModule,
    MatTabsModule,
    VirtualScrollerModule,
    MatListModule,
    PipesModules,
    FontAwesomeModule,
    MatMenuModule,
    GroupViewRoutingModule,
  ],
  exports: [
    GroupViewComponent
  ],
})
export class GroupViewModule {
}
