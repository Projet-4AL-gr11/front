import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaderboardComponent} from "./leaderboard.component";

const routes: Routes = [
  {
    path: "leaderboard",
    children: [
      {
        path: "",
        component: LeaderboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {
}
