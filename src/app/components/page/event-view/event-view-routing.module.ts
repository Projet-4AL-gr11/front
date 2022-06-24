import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";
import {NgModule} from "@angular/core";
import {EventViewModule} from "./event-view.module";
import {EventViewComponent} from "./event-view.component";

const routes: Routes = [
  {
    path: "event",
    children: [
      {
        path: ":eventId",
        component: EventViewComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventViewRoutingModule { }
