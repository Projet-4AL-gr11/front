import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CodeRoutingModule} from "../code/code-routing.module";
import {TimelineComponent} from "./timeline.component";
import {SharedModule} from "../../../shared/shared.module";
import {PostModule} from "../../card_/post/post.module";
import {ButtonCreatePostModule} from "../../button-create-post/button-create-post.module";

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    VirtualScrollerModule,
    SharedModule,
    PostModule,
    ButtonCreatePostModule
  ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule { }
