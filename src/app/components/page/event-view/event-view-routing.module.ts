import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
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
export class EventViewRoutingModule {
}
