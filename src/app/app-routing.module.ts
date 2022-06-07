import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard.service";
import {HomeComponent} from "./components/page_/home/home.component";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {LoginComponent} from "./components/page_/auth_/login/login.component";


const routes: Routes = [
  {path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: "register", loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: "profile", loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: "code", loadChildren: () => import('./code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./social/social.module').then(m => m.SocialModule)},
  {path: "leaderboard", loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
  {path: "", component: LoginComponent},
  {path: "profile", loadChildren: () => import('./components/page_/profile/profile.module').then(m => m.ProfileModule)},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
