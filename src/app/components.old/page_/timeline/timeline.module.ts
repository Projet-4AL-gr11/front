import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CodeRoutingModule} from "../code/code-routing.module";
import {TimelineComponent} from "./timeline.component";
import {PostModule} from "../../card_/post/post.module";
import {ButtonCreatePostModule} from "../../button-create-post/button-create-post.module";
import {PostShareCardModule} from "../../card_/post-share-card/post-share-card.module";
import {SharedModule} from "../../../components/shared/shared.module";

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
    ButtonCreatePostModule,
    PostShareCardModule
  ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule { }
