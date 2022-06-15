import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "", loadChildren: () => import('./components/page_/home/home.module').then(m => m.HomeModule)},
  {path: "login", loadChildren: () => import('./components/page_/auth_/login/login.module').then(m => m.LoginModule)},
  {path: "register", loadChildren: () => import('./components/page_/auth_/register/register.module').then(m => m.RegisterModule)},
  {path: "profile", loadChildren: () => import('./components/page_/profile/profile.module').then(m => m.ProfileModule)},
  {path: "code", loadChildren: () => import('./components/page_/code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./components/page_/social/social.module').then(m => m.SocialModule)},
  {path: "leaderboard", loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
  {path: "profile", loadChildren: () => import('./components/page_/profile/profile.module').then(m => m.ProfileModule)},
  {path: "timeline", loadChildren: () => import('./components/page_/timeline/timeline.module').then(m => m.TimelineModule)},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
