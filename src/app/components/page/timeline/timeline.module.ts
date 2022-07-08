import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TimelineComponent} from "./timeline.component";
import {CardsModule} from "../../card/cards.module";
import {SharedModule} from "../../shared/shared.module";
import {TimelineRoutingModule} from "./timeline-routing.module";

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    VirtualScrollerModule,
    SharedModule,
    CardsModule,
    TimelineRoutingModule
  ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule {
}
