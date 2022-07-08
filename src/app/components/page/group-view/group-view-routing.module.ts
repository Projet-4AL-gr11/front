import {RouterModule, Routes} from "@angular/router";
import {EventViewComponent} from "../event-view/event-view.component";
import {NgModule} from "@angular/core";
import {GroupViewComponent} from "./group-view.component";

const routes: Routes = [
  {
    path: "group",
    children: [
      {
        path: ":groupId",
        component: GroupViewComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupViewRoutingModule { }
