import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "home", loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  {path: "login", loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  {path: "register", loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)},
  {path: "profile", loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)},
  {path: "code", loadChildren: () => import('./components/code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./components/social/social.module').then(m => m.SocialModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
