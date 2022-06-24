import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CodeRoutingModule} from "../code/code-routing.module";
import {TimelineComponent} from "./timeline.component";
import {CardsModule} from "../../card/cards.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    VirtualScrollerModule,
    SharedModule,
    CardsModule,
  ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule { }
