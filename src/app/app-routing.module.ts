import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "", loadChildren: () => import('./components/page/home/home.module').then(m => m.HomeModule)},
  {path: "auth", loadChildren: () => import('./components/page/auth/auth.module').then(m => m.AuthModule)},
  {path: "profile", loadChildren: () => import('./components/page/profile/profile.module').then(m => m.ProfileModule)},
  {path: "code", loadChildren: () => import('./components/page/code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./components/page/social/social.module').then(m => m.SocialModule)},
  {path: "leaderboard", loadChildren: () => import('./components/page/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
  {path: "profile", loadChildren: () => import('./components/page/profile/profile.module').then(m => m.ProfileModule)},
  {path: "timeline", loadChildren: () => import('./components/page/timeline/timeline.module').then(m => m.TimelineModule)},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
