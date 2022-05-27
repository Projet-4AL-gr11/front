import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard.service";
import {HomeComponent} from "./components/page_/home/home.component";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {LoginComponent} from "./components/page_/auth_/login/login.component";


const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "timeline", component: TimelineComponent, canActivate: [AuthGuardService]},
  {path: "home", loadChildren: () => import('./components/page_/home/home.module').then(m => m.HomeModule)},
  {path: "login", loadChildren: () => import('./components/page_/auth_/login/login.module').then(m => m.LoginModule), canActivate: [NegateAuthGuardService]},
  {path: "register", loadChildren: () => import('./components/page_/auth_/register/register.module').then(m => m.RegisterModule), canActivate: [NegateAuthGuardService]},
  {path: "code", loadChildren: () => import('./components/page_/code/code.module').then(m => m.CodeModule), canActivate: [AuthGuardService]},
  {path: "social", loadChildren: () => import('./components/page_/social/social.module').then(m => m.SocialModule),canActivate: [AuthGuardService]},
  {path: '**', redirectTo: "/"},
  {path: "profile", loadChildren: () => import('./components/page_/profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
