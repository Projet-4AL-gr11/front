import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventViewComponent} from './event-view.component';
import {EventViewRoutingModule} from "./event-view-routing.module";
import {CardsModule} from "../../card/cards.module";
import {SharedModule} from "../../shared/shared.module";
import {NgxChronometerModule} from "ngx-chronometer";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    EventViewComponent
  ],
    imports: [
        CommonModule,
        EventViewRoutingModule,
        SharedModule,
        CardsModule,
        NgxChronometerModule,
        MatExpansionModule,
    ],
  exports: [
    EventViewComponent
  ],
})
export class EventViewModule {
}
