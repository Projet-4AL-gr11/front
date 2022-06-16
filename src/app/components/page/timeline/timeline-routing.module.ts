import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TimelineComponent} from "./timeline.component";

const routes: Routes = [
  {
    path: "timeline",
    children: [
      {
        path: "",
        component: TimelineComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
