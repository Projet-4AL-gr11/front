import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagePostComponent} from "./page-post.component";

const routes: Routes = [
  {
    path: "post",
    children: [
      {
        path: ":id",
        component: PagePostComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePostRoutingModule { }
