import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";
import {NgModule} from "@angular/core";
import {PageEventModule} from "./page-event.module";
import {PageEventComponent} from "./page-event.component";

const routes: Routes = [
  {
    path: "event",
    children: [
      {
        path: ":eventId",
        component: PageEventComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEventRoutingModule { }
